'use strict';
/* Huda portfolio server: serves the website, the Admin Panel and its API.
   No installs needed: only built-in Node.js modules. Start with:  node server.js */
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const ROOT = __dirname, PORT = process.env.PORT || 3000;
const DATA = path.join(ROOT, 'data'), UP = path.join(ROOT, 'uploads'), PRIV = path.join(ROOT, 'private');
const CONTENT = path.join(DATA, 'content.json'), AUTH = path.join(PRIV, 'auth.json');
[DATA, UP, PRIV].forEach(d => fs.mkdirSync(d, { recursive: true }));
const THEMES = ['charcoal-orange', 'midnight-blue', 'slate-purple', 'emerald-dark'];
const DEFAULT_USER = 'admin', DEFAULT_PASS = 'Admin@123';

/* ---------- passwords ---------- */
const hashPw = (pw, salt = crypto.randomBytes(16).toString('hex')) => ({ salt, hash: crypto.scryptSync(pw, salt, 64).toString('hex') });
const samePw = (pw, rec) => { const a = Buffer.from(crypto.scryptSync(pw, rec.salt, 64).toString('hex')), b = Buffer.from(rec.hash); return a.length === b.length && crypto.timingSafeEqual(a, b); };
const writeAtomic = (file, text) => { fs.writeFileSync(file + '.tmp', text); fs.renameSync(file + '.tmp', file); };
function loadAuth() {
  try { return JSON.parse(fs.readFileSync(AUTH, 'utf8')); }
  catch (e) { const a = { username: DEFAULT_USER, ...hashPw(DEFAULT_PASS), defaultPassword: true }; writeAtomic(AUTH, JSON.stringify(a)); return a; }
}
let auth = loadAuth();

/* ---------- sessions and login limits ---------- */
const sessions = new Map(), fails = new Map();
const SESSION_MS = 8 * 3600e3;
const ipOf = req => String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
const cookies = req => Object.fromEntries(String(req.headers.cookie || '').split(';').map(c => c.trim().split('=')).filter(c => c[0]).map(c => [c[0], c.slice(1).join('=')]));
function getSession(req) {
  const s = sessions.get(cookies(req).sid);
  if (!s) return null;
  if (s.exp < Date.now()) { sessions.delete(cookies(req).sid); return null; }
  return s;
}
const isHttps = req => req.socket.encrypted || req.headers['x-forwarded-proto'] === 'https';

/* ---------- helpers ---------- */
const json = (res, code, obj, extra = {}) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra }); res.end(JSON.stringify(obj)); };
function readBody(req, max) {
  return new Promise((resolve, reject) => {
    const chunks = []; let n = 0, big = false;
    req.on('data', d => { n += d.length; if (n > max) { big = true; chunks.length = 0; return; } if (!big) chunks.push(d); });
    req.on('end', () => big ? reject(Object.assign(new Error('That file or request is too large.'), { code: 413 })) : resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}
const okPath = p => p === '' || /^(uploads\/[\w.\-]+|assets\/[\w.\-\/]+|https?:\/\/\S+)$/.test(p);
const okUrl = u => /^(https?:\/\/|mailto:)\S+$/i.test(u);
function validate(c) {
  if (!c || typeof c !== 'object' || Array.isArray(c)) return 'Content must be an object.';
  if (c.heroImage != null && !okPath(String(c.heroImage))) return 'The profile photo path is not valid.';
  if (c.about && c.about.photo != null && !okPath(String(c.about.photo))) return 'The About photo path is not valid.';
  for (const p of (c.portfolio && c.portfolio.items) || []) if (p.thumb && !okPath(String(p.thumb))) return 'A project thumbnail path is not valid.';
  for (const s of c.socials || []) if (!okUrl(String(s.url || ''))) return 'Social links must start with https:// (check: ' + (s.label || 'a link') + ').';
  if (c.theme && !THEMES.includes(c.theme)) return 'Unknown colour theme.';
  if (c.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(c.email))) return 'That email address does not look valid.';
  return null;
}
function sniff(b) {
  if (b.length < 12) return null;
  if (b[0] === 0xFF && b[1] === 0xD8 && b[2] === 0xFF) return 'jpg';
  if (b.slice(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'))) return 'png';
  if (b.slice(0, 4).toString() === 'GIF8') return 'gif';
  if (b.slice(0, 4).toString() === 'RIFF' && b.slice(8, 12).toString() === 'WEBP') return 'webp';
  return null;
}

/* ---------- API ---------- */
async function api(req, res, url) {
  const route = url.pathname.replace(/^\/api\//, '');
  const sess = getSession(req);
  if (route === 'session' && req.method === 'GET')
    return json(res, 200, sess ? { loggedIn: true, csrf: sess.csrf, username: auth.username, defaultPassword: !!auth.defaultPassword } : { loggedIn: false });
  if (route === 'login' && req.method === 'POST') {
    const ip = ipOf(req), f = fails.get(ip) || { n: 0, until: 0 };
    if (f.until > Date.now()) return json(res, 429, { error: 'Too many failed attempts. Please wait 5 minutes and try again.' });
    let b; try { b = JSON.parse((await readBody(req, 10e3)).toString() || '{}'); } catch (e) { return json(res, 400, { error: 'Bad request.' }); }
    const userOk = crypto.timingSafeEqual(crypto.createHash('sha256').update(String(b.username || '')).digest(), crypto.createHash('sha256').update(auth.username).digest());
    const passOk = samePw(String(b.password || ''), auth);
    if (!(userOk && passOk)) {
      f.n++; if (f.n >= 5) { f.until = Date.now() + 300e3; f.n = 0; } fails.set(ip, f);
      return json(res, 401, { error: 'Incorrect username or password.' });
    }
    fails.delete(ip);
    const sid = crypto.randomBytes(32).toString('hex'), csrf = crypto.randomBytes(24).toString('hex');
    sessions.set(sid, { csrf, exp: Date.now() + SESSION_MS });
    return json(res, 200, { ok: true, csrf, username: auth.username, defaultPassword: !!auth.defaultPassword },
      { 'Set-Cookie': `sid=${sid}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_MS / 1000}${isHttps(req) ? '; Secure' : ''}` });
  }
  /* everything below needs a login */
  if (!sess) return json(res, 401, { error: 'Please sign in.' });
  if (route === 'logout' && req.method === 'POST') { sessions.delete(cookies(req).sid); return json(res, 200, { ok: true }, { 'Set-Cookie': 'sid=; HttpOnly; Path=/; Max-Age=0' }); }
  if (req.method !== 'GET') {
    const o = req.headers.origin;
    if (req.headers['x-csrf'] !== sess.csrf || (o && new URL(o).host !== req.headers.host)) return json(res, 403, { error: 'Security check failed. Please reload the page and sign in again.' });
  }
  if (route === 'content' && req.method === 'PUT') {
    let c; try { c = JSON.parse((await readBody(req, 2e6)).toString()); } catch (e) { return json(res, e.code || 400, { error: e.code === 413 ? e.message : 'Bad content.' }); }
    const bad = validate(c); if (bad) return json(res, 400, { error: bad });
    if (fs.existsSync(CONTENT)) fs.copyFileSync(CONTENT, path.join(DATA, 'content.backup.json'));
    writeAtomic(CONTENT, JSON.stringify(c, null, 1));
    return json(res, 200, { ok: true });
  }
  if (route === 'upload' && req.method === 'POST') {
    let buf; try { buf = await readBody(req, 5 * 1024 * 1024); } catch (e) { return json(res, 413, { error: 'That image is larger than 5 MB.' }); }
    const ext = sniff(buf);
    if (!ext) return json(res, 400, { error: 'Only JPG, PNG, GIF or WebP pictures can be uploaded.' });
    const name = crypto.randomBytes(8).toString('hex') + '.' + ext;
    fs.writeFileSync(path.join(UP, name), buf);
    return json(res, 200, { path: 'uploads/' + name });
  }
  if (route === 'password' && req.method === 'POST') {
    let b; try { b = JSON.parse((await readBody(req, 10e3)).toString() || '{}'); } catch (e) { return json(res, 400, { error: 'Bad request.' }); }
    if (!samePw(String(b.current || ''), auth)) return json(res, 400, { error: 'Your current password is not correct.' });
    const np = String(b.password || ''), nu = String(b.username || auth.username).trim();
    if (np.length < 8) return json(res, 400, { error: 'The new password must be at least 8 characters long.' });
    if (np === DEFAULT_PASS) return json(res, 400, { error: 'Please choose a password different from the default one.' });
    if (!/^[\w.\-]{3,32}$/.test(nu)) return json(res, 400, { error: 'The username must be 3 to 32 letters, numbers, dots, dashes or underscores.' });
    auth = { username: nu, ...hashPw(np), defaultPassword: false }; writeAtomic(AUTH, JSON.stringify(auth));
    for (const k of [...sessions.keys()]) if (k !== cookies(req).sid) sessions.delete(k);
    return json(res, 200, { ok: true, username: nu });
  }
  return json(res, 404, { error: 'Not found.' });
}

/* ---------- static files ---------- */
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.ico': 'image/x-icon' };
function serve(req, res, url) {
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end(); }
  let p; try { p = decodeURIComponent(url.pathname); } catch (e) { res.writeHead(400); return res.end(); }
  if (p === '/admin') { res.writeHead(301, { Location: '/admin/' }); return res.end(); }
  if (p === '/') p = '/index.html'; if (p.endsWith('/')) p += 'index.html';
  const full = path.normalize(path.join(ROOT, p));
  const rel = path.relative(ROOT, full).split(path.sep);
  const allowed = (rel.length === 1 && /^[\w-]+\.html$/.test(rel[0])) || (rel.length > 1 && ['css', 'js', 'assets', 'data', 'uploads', 'admin'].includes(rel[0]));
  if (!full.startsWith(ROOT + path.sep) || !allowed || /backup|\.tmp$|^\./.test(rel[rel.length - 1]) ) { res.writeHead(404); return res.end('Not found'); }
  fs.stat(full, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('Not found'); }
    const ext = path.extname(full).toLowerCase();
    const h = { 'Content-Type': MIME[ext] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'same-origin',
      'Cache-Control': rel[0] === 'uploads' ? 'public, max-age=31536000, immutable' : 'no-cache' };
    if (rel[0] === 'admin') { h['X-Frame-Options'] = 'DENY'; h['Cache-Control'] = 'no-store'; }
    if (rel[0] === 'data') h['Cache-Control'] = 'no-store';
    res.writeHead(200, h);
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(full).pipe(res);
  });
}

http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://x');
    if (url.pathname.startsWith('/api/')) return await api(req, res, url);
    serve(req, res, url);
  } catch (e) { console.error(e); if (!res.headersSent) json(res, 500, { error: 'Something went wrong on the server.' }); }
}).listen(PORT, () => {
  console.log(`Website:      http://localhost:${PORT}/`);
  console.log(`Admin Panel:  http://localhost:${PORT}/admin/`);
  if (auth.defaultPassword) console.log('Default login: admin / Admin@123  (change it after your first sign-in!)');
});
