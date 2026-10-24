/* Shared navigation + footer for every page. Content comes from js/content.js */
(function(){
const S=window.SITE,$=s=>document.querySelector(s);
const e=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const here=location.pathname.split('/').pop()||'index.html';
$('#logo').href='index.html#home';
$('#logo').innerHTML=`${e(S.name)}<b>.</b>`;
$('#menu').innerHTML=S.nav.map(n=>{const cur=here!=='index.html'&&n[1]===here;return `<a href="${e(n[1])}"${cur?' class="on" aria-current="page"':''}>${e(n[0])}</a>`}).join('');
$('#burger').onclick=function(){const o=$('#menu').classList.toggle('open');this.setAttribute('aria-expanded',o)};
$('#menu').onclick=()=>{$('#menu').classList.remove('open');$('#burger').setAttribute('aria-expanded',false)};
const mail=`mailto:${e(S.email)}`;
$('#footer').innerHTML=`<div class="fg"><div><h3>${e(S.name)}, ${e(S.title)}</h3><p>${e(S.brand)}</p></div><div><h3>Quick links</h3>${S.nav.map(n=>`<a href="${e(n[1])}">${e(n[0])}</a>`).join('')}</div><div><h3>Contact</h3><a href="${mail}">${e(S.email)}</a>${S.emailIsPlaceholder?'<p>Placeholder email, to be replaced.</p>':''}${S.socials.map(s=>`<a href="${e(s.url)}" rel="noopener" target="_blank">${e(s.label)}</a>`).join('')}</div></div><div class="copy">\u00A9 ${new Date().getFullYear()} ${e(S.name)}. All rights reserved.</div>`;
})();
