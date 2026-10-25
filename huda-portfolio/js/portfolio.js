
(function(){
const D=window.SITE.portfolio,$=s=>document.querySelector(s),RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const e=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const label=Object.fromEntries(D.categories.map(c=>[c.id,c.label]));

// header
$('#phead').innerHTML=`<div class="pin"><p class="eyebrow">${e(D.eyebrow)}</p><h1>${e(D.headline[0])} <span class="grad">${e(D.headline[1])}</span></h1><p class="lead">${e(D.intro)}</p></div>`;

const {projArt:art,projThumb:thumb}=window;
const fb=r=>window.projFb(r,D.items);

// filters + grid
$('#filters').innerHTML=[{id:'all',label:'All Projects'}].concat(D.categories).map(c=>`<button class="fbtn" data-f="${e(c.id)}" aria-pressed="false">${e(c.label)}</button>`).join('');

const grid=$('#grid');
grid.innerHTML=D.items.map((p,i)=>`<button class="card proj rv" data-id="${e(p.id)}" data-cat="${e(p.cat)}" aria-haspopup="dialog"><div class="pv">${thumb(p,i)}</div><div class="pb"><small>${e(label[p.cat])}</small><h3>${e(p.title)}</h3><p>${e(p.short)}</p>${p.demo?'<span class="chip demo">Demo concept</span>':''}</div></button>`).join('');

fb(grid);

const cards=[...grid.children];
let cur='all',tmr=null;

const setHash=id=>history.replaceState(null,'',id==='all'?location.pathname+location.search:'#'+id);

function apply(id,instant){
  cur=id;
  document.querySelectorAll('.fbtn').forEach(b=>b.setAttribute('aria-pressed',b.dataset.f===id));
  const run=()=>{
    let n=0;
    cards.forEach(c=>{
      const s=id==='all'||c.dataset.cat===id;
      c.hidden=!s;
      if(s){c.classList.remove('out');c.style.setProperty('--i',n++)}
    });
    $('#count').textContent=`Showing ${n} demo concept${n===1?'':'s'}${id==='all'?'':' in '+label[id]}`;
  };
  clearTimeout(tmr);
  if(instant||RM){run();return}
  cards.forEach(c=>{if(!c.hidden)c.classList.add('out')});
  tmr=setTimeout(run,190);
}

$('#filters').addEventListener('click',ev=>{
  const b=ev.target.closest('[data-f]');
  if(!b||b.dataset.f===cur)return;
  apply(b.dataset.f);
  setHash(b.dataset.f);
});

// lightbox
const dlg=$('#dlg');
let last=null;

function open(id){
  const i=D.items.findIndex(p=>p.id===id);
  if(i<0)return;

  const p=D.items[i];
  last=document.activeElement;

  // Build GitHub links for the four workflow JSON files
  const workflowGitHub=p.workflow
    ?'https://github.com/hudarasool/huda-portfolio/blob/c32b717835ba9efd3291276247a5a45302141ffa/huda-portfolio/'+p.workflow
    :'';

  const workflowRaw=p.workflow
    ?'https://raw.githubusercontent.com/hudarasool/huda-portfolio/c32b717835ba9efd3291276247a5a45302141ffa/huda-portfolio/'+p.workflow
    :'';

  dlg.innerHTML=`
    <button class="x" data-close aria-label="Close project details">\u2715</button>
    <small style="color:var(--bl);font-weight:600">${e(label[p.cat])}</small>
    <h3 id="dlgT">${e(p.title)}</h3>
    ${p.demo?'<span class="chip demo">Demo concept, not client work</span>':''}
    <div class="lbv">${thumb(p,i)}</div>

    <h4>Purpose</h4>
    <p>${e(p.short)}</p>

    <h4>Project details</h4>
    <p>${e(p.full)}</p>

    ${p.steps&&p.steps.length?`<h4>Workflow overview</h4><ol>${p.steps.map(s=>`<li>${e(s)}</li>`).join('')}</ol>`:''}

    <h4>Expected benefit</h4>
    <p>${e(p.benefit||'To be confirmed')}</p>

    <h4>Tools used</h4>
    <p>${p.tools&&p.tools.length?e(p.tools.join(', ')):'To be confirmed. This is a concept, so no tools are claimed yet.'}</p>

    ${p.workflow?`
      <h4>Workflow Resources</h4>
      <p class="btns">
        <a class="btn" href="${e(workflowGitHub)}" target="_blank" rel="noopener noreferrer">
          View JSON on GitHub ↗
        </a>
        <a class="btn pri" href="${e(workflowRaw)}" target="_blank" rel="noopener noreferrer" download>
          Download Workflow JSON ↓
        </a>
      </p>
      <p class="note">
        Demo workflow example. Review the JSON, configure your own credentials,
        and test safely before enabling live actions.
      </p>
    `:''}
  `;

  fb(dlg);
  dlg.classList.remove('closing');
  if(!dlg.open)dlg.showModal();
  document.body.classList.add('lock');
  history.replaceState(null,'','#p-'+id);
}

function close(){
  if(!dlg.open||dlg.classList.contains('closing'))return;
  dlg.classList.add('closing');
  const f=()=>{dlg.close();dlg.classList.remove('closing')};
  RM?f():setTimeout(f,200);
}

grid.addEventListener('click',ev=>{
  const c=ev.target.closest('[data-id]');
  if(c)open(c.dataset.id);
});

dlg.addEventListener('click',ev=>{
  if(ev.target===dlg||ev.target.closest('[data-close]'))close();
});

dlg.addEventListener('cancel',ev=>{
  ev.preventDefault();
  close();
});

dlg.addEventListener('close',()=>{
  document.body.classList.remove('lock');
  setHash(cur);
  if(last&&last.focus)last.focus();
});

// hash routing: #workflow | #agents | #integrations | #p-<project-id>
function fromHash(){
  const h=location.hash.slice(1),p=D.items.find(x=>'p-'+x.id===h);
  if(p){
    apply(p.cat,true);
    open(p.id);
  }else{
    if(dlg.open)dlg.close();
    apply(label[h]?h:'all',true);
  }
}

addEventListener('hashchange',fromHash);
fromHash();

// scroll reveal (once)
const io=new IntersectionObserver(es=>es.forEach(x=>{
  if(x.isIntersecting){
    x.target.classList.add('in');
    setTimeout(()=>x.target.classList.add('done'),1500);
    io.unobserve(x.target);
  }
}),{threshold:.1});

cards.forEach(c=>io.observe(c));
})();
