(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var API='../api/',csrf='',DATA=null,dirty=false,cur='dash',uid=0,defaultPw=false;
var clone=function(o){return JSON.parse(JSON.stringify(o))};
var get=function(o,p){return p.split('.').reduce(function(a,k){return a==null?a:a[k]},o)};
var set=function(o,p,v){var k=p.split('.'),l=k.pop(),t=k.reduce(function(a,x){if(a[x]==null)a[x]={};return a[x]},o);t[l]=v};
var unset=function(o,p){var k=p.split('.'),l=k.pop(),t=k.reduce(function(a,x){return a==null?a:a[x]},o);if(t)delete t[l]};
function h(tag,a){var el=document.createElement(tag);a=a||{};for(var k in a){var v=a[k];if(k==='class')el.className=v;else if(k.indexOf('on')===0)el.addEventListener(k.slice(2),v);else if(v!==false&&v!=null)el.setAttribute(k,v===true?'':v)}
 [].slice.call(arguments,2).forEach(function(c){(Array.isArray(c)?c:[c]).forEach(function(x){if(x!=null)el.append(x.nodeType?x:document.createTextNode(x))})});return el}
function api(path,opt){opt=opt||{};var hd=Object.assign({},opt.headers||{});if(opt.method&&opt.method!=='GET')hd['X-CSRF']=csrf;
 return fetch(API+path,Object.assign({credentials:'same-origin'},opt,{headers:hd})).then(function(r){return r.json().catch(function(){return {}}).then(function(j){if(!r.ok)throw new Error(j.error||'Request failed ('+r.status+')');return j})})}
function toast(msg,bad){var t=$('#toast');t.textContent=msg;t.className='toast show'+(bad?' bad':'');clearTimeout(toast.t);toast.t=setTimeout(function(){t.className='toast'},bad?6000:3500)}
function mark(){dirty=true;bar()}
function bar(){$('.bar').classList.toggle('dirty',dirty);$('#state').textContent=dirty?'You have unsaved changes':'All changes saved';$('#save').disabled=!dirty}
window.addEventListener('beforeunload',function(e){if(dirty){e.preventDefault();e.returnValue=''}});

/* ---------- field helpers ---------- */
var T=function(p,l,help){return {t:'text',p:p,l:l,help:help}};
var A=function(p,l,help){return {t:'area',p:p,l:l,help:help}};
var N=function(p,l,help){return {t:'num',p:p,l:l,help:help}};
var C=function(p,l,help){return {t:'check',p:p,l:l,help:help}};
var S=function(p,l,o,help){return {t:'sel',p:p,l:l,o:o,help:help}};
var LN=function(p,l,help){return {t:'lines',p:p,l:l,help:help}};
var CSV=function(p,l,help){return {t:'csv',p:p,l:l,help:help}};
var I=function(p,l,help,empty){return {t:'img',p:p,l:l,help:help,empty:empty}};
var H=function(l,help){return {t:'h',l:l,help:help}};
var L=function(p,l,item,title,add,extra){return Object.assign({t:'list',p:p,l:l,item:item,title:title,add:add},extra||{})};
var ICONS=['flow','agent','plug','gear','sync','data','users'];

function fieldEl(obj,d){
 if(d.t==='h')return h('h3',{class:'fh'},d.l,d.help?h('small',{},d.help):null);
 if(d.t==='list')return listEl(obj,d);
 if(d.t==='img')return imgEl(obj,d);
 var id='f'+(++uid),v=get(obj,d.p),ctl,upd=function(x){set(obj,d.p,x);mark()};
 if(d.t==='text'||d.t==='num'){ctl=h('input',{id:id,type:d.t==='num'?'number':'text',step:d.t==='num'?'any':null});ctl.value=v==null?'':v;
  ctl.addEventListener('input',function(){if(d.t==='num'){if(ctl.value===''){unset(obj,d.p);mark()}else upd(Number(ctl.value))}else upd(ctl.value)})}
 else if(d.t==='area'){ctl=h('textarea',{id:id,rows:4});ctl.value=v==null?'':v;ctl.addEventListener('input',function(){upd(ctl.value)})}
 else if(d.t==='lines'){ctl=h('textarea',{id:id,rows:5});ctl.value=(v||[]).join('\n');ctl.addEventListener('input',function(){upd(ctl.value.split('\n').map(function(s){return s.trim()}).filter(Boolean))})}
 else if(d.t==='csv'){ctl=h('input',{id:id,type:'text'});ctl.value=(v||[]).join(', ');ctl.addEventListener('input',function(){upd(ctl.value.split(',').map(function(s){return s.trim()}).filter(Boolean))})}
 else if(d.t==='sel'){ctl=h('select',{id:id});(typeof d.o==='function'?d.o():d.o).forEach(function(o){var val=Array.isArray(o)?o[0]:o,lab=Array.isArray(o)?o[1]:o;ctl.append(h('option',{value:val,selected:val===v},lab))});ctl.addEventListener('change',function(){upd(ctl.value)})}
 else if(d.t==='check'){ctl=h('input',{id:id,type:'checkbox',checked:!!v});ctl.addEventListener('change',function(){upd(ctl.checked)});
  return h('div',{class:'fld chk'},h('label',{for:id},ctl,d.l),d.help?h('small',{class:'help'},d.help):null)}
 return h('div',{class:'fld'},h('label',{for:id},d.l),ctl,d.help?h('small',{class:'help'},d.help):null)}

function fieldsEl(obj,defs){var f=document.createDocumentFragment();defs.forEach(function(d){f.append(fieldEl(obj,d))});return f}

function listEl(obj,d){
 var wrap=h('div',{class:'list'}),arr=function(){var a=get(obj,d.p);if(!Array.isArray(a)){a=[];set(obj,d.p,a)}return a};
 function draw(openIdx){wrap.innerHTML='';var a=arr();
  a.forEach(function(it,i){
   var name=h('span',{},d.title(it)||'(untitled)'),det=h('details',{class:'item',open:i===openIdx}),body=h('div',{class:'ibody'});
   var ctl=h('div',{class:'ictl'},
    h('button',{type:'button',class:'btn ghost sm',disabled:i===0,'aria-label':'Move up',onclick:function(){var t=a[i];a[i]=a[i-1];a[i-1]=t;mark();draw(i-1)}},'↑ Move up'),
    h('button',{type:'button',class:'btn ghost sm',disabled:i===a.length-1,'aria-label':'Move down',onclick:function(){var t=a[i];a[i]=a[i+1];a[i+1]=t;mark();draw(i+1)}},'↓ Move down'),
    h('button',{type:'button',class:'btn ghost sm danger',onclick:function(){
      if(d.beforeRemove&&d.beforeRemove(i,a)===false)return;
      if(!confirm('Remove "'+(d.title(it)||'this item')+'"? It disappears from the website when you click Save changes.'))return;
      a.splice(i,1);mark();draw()}},'✕ Remove'));
   body.append(ctl,fieldsEl(it,d.item));body.addEventListener('input',function(){name.textContent=d.title(it)||'(untitled)'});
   det.append(h('summary',{},name),body);wrap.append(det)});
  if(!a.length)wrap.append(h('p',{class:'help'},'Nothing here yet.'));
  wrap.append(h('button',{type:'button',class:'btn',onclick:function(){var a=arr();a.push(d.add());mark();draw(a.length-1)}},'+ Add '+d.l.toLowerCase().replace(/s$/,'')))}
 draw();return h('div',{class:'fld',style:'max-width:none'},h('label',{},d.l),d.help?h('small',{class:'help'},d.help):null,wrap)}

function imgEl(obj,d){
 var prev=h('div',{class:'prev'}),file=h('input',{type:'file',accept:'image/jpeg,image/png,image/gif,image/webp'}),st=h('small',{class:'help'},d.help||'');
 function draw(){var v=get(obj,d.p)||'';prev.innerHTML='';prev.append(v?h('img',{src:/^https?:/.test(v)?v:'../'+v,alt:''}):h('span',{},d.empty||'No picture set'))}
 file.addEventListener('change',function(){var f=file.files[0];if(!f)return;
  if(f.size>5*1024*1024){st.textContent='That picture is larger than 5 MB. Please choose a smaller one.';file.value='';return}
  st.textContent='Uploading…';
  api('upload',{method:'POST',headers:{'Content-Type':f.type||'application/octet-stream'},body:f}).then(function(r){set(obj,d.p,r.path);mark();draw();st.textContent='Uploaded. Click "Save changes" to publish it.'}).catch(function(e){st.textContent=e.message}).then(function(){file.value=''})});
 draw();
 return h('div',{class:'fld'},h('label',{},d.l),h('div',{class:'imgf'},prev,h('div',{class:'imgs'},
  h('button',{type:'button',class:'btn sm',onclick:function(){file.click()}},'Upload / change picture'),
  h('button',{type:'button',class:'btn ghost sm',onclick:function(){set(obj,d.p,'');mark();draw();st.textContent='Picture removed. Click "Save changes" to publish.'}},'Remove picture'),file)),st)}

/* ---------- sections ---------- */
var catOpts=function(){return DATA.portfolio.categories.map(function(c){return [c.id,c.label]})};
var rid=function(p){return p+Date.now().toString(36)+Math.floor(Math.random()*1e3).toString(36)};
var SECTIONS=[
 {id:'dash',title:'Dashboard'},
 {id:'home',title:'Home page',desc:'Everything shown on the Home page: hero, highlights, section headings, process, tools, testimonials and closing message.',fields:function(){return [
  H('Hero (top of the page)'),T('name','Your name'),T('title','Professional title'),T('hero.headline','Main headline'),A('hero.text','Introduction text'),
  I('heroImage','Profile photo / hero picture','Shown beside the headline. Remove it to use the built-in illustration.','Using the built-in illustration'),T('heroAlt','Picture description (for screen readers)'),
  H('Highlights (numbers and labels)','Add a number only if it is real, such as your months of experience.'),
  L('stats','Highlights',[N('value','Number (optional)','It counts up on the page. Leave empty for a text-only highlight.'),T('label','Word after the number (e.g. Months)'),T('text','Text to show when there is no number'),T('desc','Small description')],function(o){return o.desc||o.text||o.label},function(){return {text:'New highlight',desc:'Describe it'}}),
  H('Section headings and intro lines'),T('sections.services.title','Services section: title'),A('sections.services.text','Services section: intro'),T('sections.projects.title','Featured projects: title'),A('sections.projects.text','Featured projects: intro'),T('sections.process.title','Process section: title'),T('sections.tools.title','Tools section: title'),T('toolsNote','Tools section: intro'),T('sections.trust.title','"How I work" section: title'),A('sections.trust.text','"How I work" section: intro'),
  H('My process steps'),L('process','Process steps',[T('title','Step title'),A('text','Step description')],function(o){return o.title},function(){return {title:'New step',text:''}}),
  H('Tools and technologies','Only list tools you really use or are learning. The same list appears on the About page.'),
  L('tools','Tool groups',[T('group','Group name'),CSV('items','Tools (separate with commas)')],function(o){return o.group},function(){return {group:'New group',items:[]}}),
  H('Working principles','Shown in the trust section while there are no testimonials.'),
  L('principles','Principles',[T('title','Title'),A('text','Text')],function(o){return o.title},function(){return {title:'New principle',text:''}}),
  H('Testimonials','Add ONLY real feedback you have permission to show. When you add one, it replaces the principles.'),
  L('testimonials','Testimonials',[T('name','Person\'s name'),T('role','Role'),T('org','Organization'),A('text','Their feedback')],function(o){return o.name},function(){return {name:'',role:'',org:'',text:''}}),
  H('Closing message and footer'),T('cta.title','Closing heading'),A('cta.text','Closing text'),A('brand','Footer statement')]}},
 {id:'services',title:'Services',desc:'Add, remove, reorder and price your services. They appear on the Services page and as a preview on the Home page.',fields:function(){return [
  H('Your services','Price: type it exactly as it should appear, for example $50. Leave it empty to show "Custom Quote".'),
  L('services','Services',[S('icon','Icon',ICONS),T('title','Service name'),A('text','Description'),T('price','Starting price (empty = Custom Quote)','Shown as: Starting at [price] [per...]'),T('unit','Price is per… (e.g. per workflow)')],function(o){return o.title},function(){return {icon:'flow',title:'New service',text:'',price:'',unit:'per project'}}),
  H('Services page text'),T('servicesPage.eyebrow','Small label above the heading'),T('servicesPage.heading.0','Heading line 1'),T('servicesPage.heading.1','Heading line 2 (gradient)'),A('servicesPage.intro','Introduction'),
  T('servicesPage.approach.title','Approach section title'),L('servicesPage.approach.steps','Approach steps',[T('title','Step title'),A('text','Step description')],function(o){return o.title},function(){return {title:'New step',text:''}}),
  T('servicesPage.cta.title','Call-to-action heading'),A('servicesPage.cta.text','Call-to-action text'),T('servicesPage.cta.button','Button text')]}},
 {id:'portfolio',title:'Portfolio',desc:'Add or remove projects and categories, change thumbnails and edit the Portfolio page text. The first 6 projects also appear in the Home page "Featured" section.',fields:function(){return [
  H('Page text'),T('portfolio.eyebrow','Small label above the heading'),T('portfolio.headline.0','Heading line 1'),T('portfolio.headline.1','Heading line 2 (gradient)'),A('portfolio.intro','Introduction'),
  H('Categories (filter buttons)'),
  L('portfolio.categories','Categories',[T('label','Category name')],function(o){return o.label},function(){return {id:rid('c'),label:'New category'}},{beforeRemove:function(i,a){
    if(a.length<2){alert('You need at least one category.');return false}
    var id=a[i].id,to=a[i===0?1:0],items=DATA.portfolio.items,n=items.filter(function(x){return x.cat===id}).length;
    if(n&&!confirm(n+' project(s) use this category. They will move to "'+to.label+'". Continue?'))return false;
    items.forEach(function(x){if(x.cat===id)x.cat=to.id})}}),
  H('Projects','Use the arrows to reorder. The top 6 are shown on the Home page.'),
  L('portfolio.items','Projects',[T('title','Project title'),S('cat','Category',catOpts),A('short','Short description (one line)'),A('full','Full description'),LN('steps','Workflow steps (one per line)'),CSV('tools','Tools used (commas) - leave empty until confirmed'),T('benefit','Expected benefit'),I('thumb','Thumbnail picture','Leave empty to use the generated placeholder.','Using the generated placeholder'),C('demo','This is a demo concept, not real client work')],function(o){return o.title},function(){return {id:rid('p'),cat:DATA.portfolio.categories[0].id,title:'New project',short:'',full:'',steps:[],tools:[],benefit:'',thumb:'',demo:true}})]}},
 {id:'about',title:'About page',desc:'Your story, photo, skills, goals and mission.',fields:function(){return [
  H('Heading and introduction'),T('about.heading.0','Heading (first word)'),T('about.heading.1','Heading (gradient word)'),A('about.intro.0','Introduction paragraph 1'),A('about.intro.1','Introduction paragraph 2'),I('about.photo','Your photo (optional)','Shown on the About page when set.','No photo set'),T('about.photoAlt','Photo description (for screen readers)'),
  H('Learning journey'),T('about.journeyTitle','Section title'),A('about.journeyNote','Note under the title'),
  L('about.journey','Milestones',[T('when','When'),A('text','What happened'),C('confirmed','This is real and confirmed (otherwise it shows a "Placeholder" tag)')],function(o){return o.when+': '+o.text},function(){return {when:'',text:'',confirmed:true}}),
  H('Skills'),T('about.skillsTitle','Section title'),{t:'h',l:'',help:'The skills list is the "Tools and technologies" list. Edit it under Home page.'},
  H('Goals and mission'),T('about.goalsTitle','Goals section title'),LN('about.goals','Learning goals (one per line)'),T('about.missionTitle','Mission section title'),A('about.mission','Mission statement')]}},
 {id:'awards',title:'Awards & achievements',desc:'Add real awards and achievements. They appear on the About page. The section stays hidden while the list is empty.',fields:function(){return [
  H('Your awards and achievements','Only add things that are true and that you can prove.'),T('about.awardsTitle','Section title on the About page'),
  L('awards','Awards and achievements',[T('title','Title'),T('org','Awarded by / organization'),T('year','Year'),A('text','Short description')],function(o){return o.title},function(){return {title:'',org:'',year:'',text:''}})]}},
 {id:'contact',title:'Contact & social links',desc:'Your email, WhatsApp number, social media links and the Contact page text.',fields:function(){return [
  H('Contact details'),T('email','Your contact email','Used on the Contact page, the footer and for the contact form.'),T('contact.whatsappNumber','WhatsApp number','Include the country code, e.g. +92 300 0000000. Visitors can tap it to open WhatsApp. Leave empty to show the text below instead.'),T('contact.whatsapp','Text shown when no WhatsApp number is set'),
  H('Social media links','Links must start with https://'),L('socials','Social links',[T('label','Name'),S('icon','Icon',['linkedin','instagram','facebook','x']),T('url','Link (https://...)')],function(o){return o.label},function(){return {label:'Instagram',icon:'instagram',url:'https://'}}),
  H('Contact page text'),T('contact.heading.0','Heading (first words)'),T('contact.heading.1','Heading (gradient words)'),A('contact.lead','Introduction'),A('contact.formIntro','Line above the form'),LN('contact.budgets','Budget choices in the form (one per line)'),LN('contact.extraTypes','Extra project types in the form (one per line)')]}},
 {id:'images',title:'All images',desc:'Every picture on the website in one place.'},
 {id:'theme',title:'Colour theme',desc:'Choose the colours for the whole website. The change is saved and goes live straight away.'},
 {id:'account',title:'Password & account',desc:'Change your username and password.'}
];

function view(id){
 if(dirty&&id!==cur&&!confirm('You have unsaved changes. Leave this section? (Your edits stay on screen until you reload, but are not published until you click Save changes.)')){return}
 cur=id;var s=SECTIONS.filter(function(x){return x.id===id})[0],m=$('#main');m.innerHTML='';
 [].forEach.call($('#side').children,function(b){if(b.dataset.id===id)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
 if(defaultPw&&id!=='account')m.append(h('div',{class:'banner'},h('strong',{},'You are still using the default password (Admin@123).'),h('span',{},'Please change it before your website goes live.'),h('button',{class:'btn pri sm',onclick:function(){view('account')}},'Change password now')));
 if(id==='dash')dash(m);else{m.append(h('h2',{},s.title),h('p',{class:'lead'},s.desc||''));
  if(id==='images')images(m);else if(id==='theme')themes(m);else if(id==='account')account(m);else m.append(fieldsEl(DATA,s.fields()))}
 m.focus({preventScroll:true});window.scrollTo(0,0)}

function dash(m){
 var n=function(a){return (a||[]).length};
 var cards=[['home','Home page','Hero, highlights, process, tools, testimonials.',''],['services','Services','Add, remove and price your services.',n(DATA.services)+' services'],['portfolio','Portfolio','Projects, categories and thumbnails.',n(DATA.portfolio.items)+' projects'],['about','About page','Your story, photo, skills and mission.',''],['awards','Awards & achievements','Add or remove awards.',n(DATA.awards)+' awards'],['contact','Contact & social links','Email, WhatsApp and social media.',DATA.email],['images','All images','Profile photo and every thumbnail.',''],['theme','Colour theme','Switch the colours of the whole site.',(window.SITE_THEMES[DATA.theme]||window.SITE_THEMES['charcoal-orange']).name],['account','Password & account','Change your login.','']];
 m.append(h('h2',{},'Welcome back'),h('p',{class:'lead'},'Choose what you would like to edit. Changes go live on your website the moment you click "Save changes".'),
  h('div',{class:'dgrid'},cards.map(function(c){return h('div',{class:'dcard'},h('h3',{},c[1]),h('p',{},c[2]),c[3]?h('p',{class:'n'},c[3]):null,h('button',{class:'btn sm',onclick:function(){view(c[0])}},'Open'))})))}

function images(m){
 m.append(fieldEl(DATA,I('heroImage','Home page: profile photo / hero picture','','Using the built-in illustration')),fieldEl(DATA,I('about.photo','About page: your photo','','No photo set')));
 m.append(h('h3',{class:'fh'},'Project thumbnails','Used in the Portfolio page. The first 6 also appear in the Home page Featured section.'));
 DATA.portfolio.items.forEach(function(p,i){m.append(fieldEl(p,I('thumb',(i<6?'[Home + Portfolio] ':'[Portfolio] ')+p.title,'','Using the generated placeholder')))})}

function themes(m){
 var g=h('div',{class:'themes'}),T=window.SITE_THEMES;
 function draw(){g.innerHTML='';Object.keys(T).forEach(function(id){var t=T[id],on=(DATA.theme||'charcoal-orange')===id;
  g.append(h('div',{class:'tcard'+(on?' on':'')},h('h3',{},t.name),h('div',{class:'sw'},[t.bg,t.bg2,t.pr,t.sc,t.tx].map(function(c){return h('i',{style:'background:'+c})})),
   on?h('span',{class:'n',style:'color:var(--or);font-weight:700'},'✓ Active on your website'):h('button',{class:'btn pri sm',onclick:function(){
     var prev=DATA.theme;DATA.theme=id;window.applyTheme(id);
     persist().then(function(){toast(t.name+' is now live on every page.');draw()}).catch(function(e){DATA.theme=prev;window.applyTheme(prev);toast(e.message,true);draw()})}},'Use this theme')))})}
 draw();m.append(g)}

function account(m){
 var f=h('form',{class:'acct'},h('label',{},'Current password',h('input',{type:'password',id:'ap0',autocomplete:'current-password',required:true})),
  h('label',{},'Username',h('input',{type:'text',id:'au',autocomplete:'username',value:window.__user||'admin',required:true})),
  h('label',{},'New password (at least 8 characters)',h('input',{type:'password',id:'ap1',autocomplete:'new-password',required:true})),
  h('label',{},'Repeat new password',h('input',{type:'password',id:'ap2',autocomplete:'new-password',required:true})),
  h('p',{class:'err',id:'aerr',role:'alert'}),h('button',{class:'btn pri',type:'submit'},'Change password'));
 f.addEventListener('submit',function(e){e.preventDefault();var er=$('#aerr');er.textContent='';
  if($('#ap1').value!==$('#ap2').value){er.textContent='The two new passwords do not match.';return}
  api('password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({current:$('#ap0').value,username:$('#au').value,password:$('#ap1').value})})
   .then(function(r){defaultPw=false;window.__user=r.username;toast('Password changed. Use the new details next time you sign in.');view('account')}).catch(function(x){er.textContent=x.message})});
 m.append(f)}

/* ---------- save ---------- */
function persist(){var d=clone(DATA);d.emailIsPlaceholder=!/@/.test(d.email||'');(d.stats||[]).forEach(function(s){if(s.value===''||s.value==null)delete s.value});
 return api('content',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)}).then(function(){dirty=false;bar()})}
$('#save').addEventListener('click',function(){var b=this;b.disabled=true;persist().then(function(){toast('Saved! Your live website now shows these changes.')}).catch(function(e){toast(e.message,true);b.disabled=false})});

/* ---------- login / start ---------- */
function start(info){csrf=info.csrf;defaultPw=!!info.defaultPassword;window.__user=info.username;DATA=clone(window.SITE);
 ['portfolio','servicesPage','about','contact','hero','sections','cta'].forEach(function(k){if(!DATA[k])DATA[k]={}});if(!DATA.portfolio.categories)DATA.portfolio.categories=[];if(!DATA.portfolio.items)DATA.portfolio.items=[];
 if(!DATA.theme)DATA.theme='charcoal-orange';
 $('#boot').hidden=true;$('#login').hidden=true;$('#app').hidden=false;
 var side=$('#side');side.innerHTML='';SECTIONS.forEach(function(s){side.append(h('button',{type:'button','data-id':s.id,onclick:function(){view(s.id)}},s.title))});
 dirty=false;bar();view('dash')}
$('#lf').addEventListener('submit',function(e){e.preventDefault();$('#lerr').textContent='';
 api('login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:$('#lu').value.trim(),password:$('#lp').value})}).then(function(r){$('#lp').value='';start(r)}).catch(function(x){$('#lerr').textContent=x.message})});
$('#logout').addEventListener('click',function(){if(dirty&&!confirm('You have unsaved changes that will be lost. Sign out anyway?'))return;dirty=false;api('logout',{method:'POST'}).then(function(){location.reload()})});
api('session').then(function(r){if(r.loggedIn)start(r);else{$('#boot').hidden=true;$('#login').hidden=false;$('#lu').focus()}}).catch(function(){$('#boot').textContent='Cannot reach the server. The Admin Panel needs the website to be running with server.js (see HOW-TO-GO-LIVE.txt).'});
})();
