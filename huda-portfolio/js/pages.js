/* Services, About and Contact pages. Content comes from js/content.js */
(function(){
const S=window.SITE,$=s=>document.querySelector(s),pg=document.body.dataset.page;
const e=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const grad=(a,b)=>`${e(a)} <span class="grad">${e(b)}</span>`;
const ph=(h,l)=>`<section class="phead wrap"><div class="pin"><h1>${h}</h1><p class="lead">${e(l)}</p></div></section>`;
const sh=(t,p)=>`<div class="sh rv"><h2>${e(t)}</h2>${p?`<p>${e(p)}</p>`:''}</div>`;
const R={
services(){const P=S.servicesPage;
return `<section class="phead wrap"><div class="pin"><p class="eyebrow">${e(P.eyebrow)}</p><h1>${e(P.heading[0])}<br><span class="grad">${e(P.heading[1])}</span></h1><p class="lead">${e(P.intro)}</p></div></section>`+
 `<section class="wrap pgrid" id="services"><div class="grid2">${S.services.map((s,i)=>`<article class="card svc rv ${i%2?'g-bl':'g-or'}" style="--i:${i}">${window.siteIcon(s.icon)}<h3>${e(s.title)}</h3><p>${e(s.text)}</p><p class="price">${s.price?`Starting at ${e(s.price)} ${e(s.unit)}`:'Custom Quote'}</p></article>`).join('')}</div></section>`+
 `<section class="wrap sec" id="approach">${sh(P.approach.title)}<div class="steps">${P.approach.steps.map((x,i)=>`<div class="step rv" style="--i:${i}"><div class="num">${i+1}</div><h3>${e(x.title)}</h3><p>${e(x.text)}</p></div>`).join('')}</div></section>`+
 `<section class="wrap sec" id="cta"><div class="cta rv"><h2>${e(P.cta.title)}</h2><p>${e(P.cta.text)}</p><div class="btns"><a class="btn pri" href="contact.html">${e(P.cta.button)}</a></div></div></section>`},
about(){const A=S.about;return ph(grad(A.heading[0],A.heading[1]),A.intro[0])+
 `<section class="wrap" style="padding-bottom:20px"><p class="lead rv">${e(A.intro[1])}</p>${A.photo?`<div class="frame aph rv"><img src="${e(A.photo)}" alt="${e(A.photoAlt||'')}" loading="lazy"></div>`:''}</section>`+
 `<section class="wrap sec">${sh(A.journeyTitle,A.journeyNote)}<ol class="tl">${A.journey.map((m,i)=>`<li class="rv${m.confirmed?'':' ph'}" style="--i:${i}"><strong>${e(m.when)}</strong>${m.confirmed?'':' <span class="chip">Placeholder</span>'}<p>${e(m.text)}</p></li>`).join('')}</ol></section>`+
 `<section class="wrap sec">${sh(A.skillsTitle,S.toolsNote)}<div class="tg">${S.tools.map((g,i)=>`<div class="card rv" style="--i:${i}"><h3>${e(g.group)}</h3>${g.items.map(t=>`<span class="badge">${e(t)}</span>`).join('')}</div>`).join('')}</div></section>`+
 (S.awards&&S.awards.length?`<section class="wrap sec">${sh(A.awardsTitle)}<div class="grid2">${S.awards.map((w,i)=>`<article class="card rv" style="--i:${i}"><h3 style="margin-top:0">${e(w.title)}</h3><p><small>${[w.org,w.year].filter(Boolean).map(e).join(' · ')}</small></p><p>${e(w.text)}</p></article>`).join('')}</div></section>`:'')+
 `<section class="wrap sec">${sh(A.goalsTitle)}<ul class="ben rv">${A.goals.map(g=>`<li>${e(g)}</li>`).join('')}</ul></section>`+
 `<section class="wrap sec"><div class="cta rv"><h2>${e(A.missionTitle)}</h2><p>${e(A.mission)}</p><div class="btns"><a class="btn pri" href="contact.html">Let's Work Together</a><a class="btn sec2" href="portfolio.html">Explore My Projects</a></div></div></section>`},
contact(){const C=S.contact,types=S.services.map(s=>s.title).concat(C.extraTypes||[]);
const ico={linkedin:'<path fill="currentColor" stroke="none" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM10 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.7 2.6 4.7 6V21h-4v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/>',facebook:'<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8a1 1 0 0 1 1-1z"/>',x:'<path d="M4 4l16 16M20 4L4 20"/>',instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>'};
const opt=(arr,ph)=>`<option value="" ${ph?'':'hidden '}disabled selected>${e(ph||'Select')}</option>`+arr.map(t=>`<option>${e(t)}</option>`).join('');
return ph(grad(C.heading[0],C.heading[1]),C.lead)+
 `<section class="wrap pgrid"><div class="cgrid"><div class="cside">`+
 `<div class="card rv"><h3 style="margin-top:0">Email</h3><p><a class="clink" href="mailto:${e(S.email)}">${e(S.email)}</a></p></div>`+
 `<div class="card rv" style="--i:1"><h3 style="margin-top:0">WhatsApp</h3>${C.whatsappNumber?`<p><a class="clink" href="https://wa.me/${String(C.whatsappNumber).replace(/\D/g,'')}" target="_blank" rel="noopener noreferrer">${e(C.whatsappNumber)}</a></p>`:`<p>${e(C.whatsapp)}</p>`}</div>`+
 `<div class="card rv" style="--i:2"><h3 style="margin-top:0">Find me online</h3>${S.socials.length?`<div class="soc">${S.socials.map(s=>`<a class="sbtn" href="${e(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${e(s.label)} (opens in a new tab)" title="${e(s.label)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ico[s.icon]||ico.linkedin}</svg></a>`).join('')}</div>`:'<p>Profile links will appear here once added.</p>'}</div></div>`+
 `<form class="card rv" id="cf" style="--i:3" novalidate><h3 style="margin-top:0">Send a message</h3><p class="finv">${e(C.formIntro)}</p>`+
 `<div class="frow"><div class="fld"><label for="cn">Name</label><input id="cn" required autocomplete="name"></div><div class="fld"><label for="ce">Email</label><input id="ce" type="email" required autocomplete="email"></div></div>`+
 `<div class="frow"><div class="fld"><label for="ct">Project type</label><select id="ct" required>${opt(types,'Select a project type')}</select></div><div class="fld"><label for="cb">Budget</label><select id="cb">${opt(C.budgets,'Optional')}</select></div></div>`+
 `<div class="fld"><label for="cm">Message</label><textarea id="cm" rows="6" required></textarea></div>`+
 `<button class="btn pri sendbtn" type="submit">Send message</button><p class="note" id="st" role="status" aria-live="polite">This opens your email app with your message filled in. Nothing is stored on this site.</p></form></div></section>`}
};
$('#main').innerHTML=R[pg]();
const f=$('#cf');
if(f)f.addEventListener('submit',ev=>{ev.preventDefault();
 const g=i=>$(i).value.trim(),bad=[...f.querySelectorAll('[required]')].filter(x=>!x.value.trim()||(x.type==='email'&&!x.checkValidity()));
 f.querySelectorAll('.bad').forEach(x=>x.classList.remove('bad'));
 if(bad.length){bad.forEach(x=>x.classList.add('bad'));bad[0].focus();$('#st').textContent='Please complete the highlighted fields with a valid email address.';return}
 const sub=`Automation enquiry: ${g('#ct')} from ${g('#cn')}`,body=`Name: ${g('#cn')}\nEmail: ${g('#ce')}\nProject type: ${g('#ct')}\nBudget: ${g('#cb')||'Not specified'}\n\n${g('#cm')}`;
 const q=`subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
 $('#st').innerHTML=`Opening your email app. If nothing opens, <a class="clink" id="gm" target="_blank" rel="noopener noreferrer" href="https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(S.email)}&su=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}">send it with Gmail</a> or write to ${e(S.email)}.`;
 location.href=`mailto:${S.email}?${q}`});
f&&f.addEventListener('input',ev=>ev.target.classList.remove('bad'));
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');setTimeout(()=>x.target.classList.add('done'),1500);io.unobserve(x.target)}}),{threshold:.1});
document.querySelectorAll('.rv').forEach(n=>io.observe(n));
})();
