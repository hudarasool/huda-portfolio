/* Loads saved content from the Admin Panel (data/content.json) and applies the colour theme.
   Runs first, in <head>, so there is no flash of the wrong colours. */
(function(){
var T={
 'charcoal-orange':{name:'Charcoal Orange',bg:'#111214',bg2:'#191B20',pr:'#FF6A24',sc:'#2788FF',tx:'#F5F5F5',mu:'#A7A9B0',bd:'#2a2d34',on:'#111214'},
 'midnight-blue':{name:'Midnight Blue',bg:'#0A1124',bg2:'#111B36',pr:'#3D8BFF',sc:'#22D3EE',tx:'#F2F6FF',mu:'#9FB0CC',bd:'#1F2C4D',on:'#06101F'},
 'slate-purple':{name:'Slate Purple',bg:'#15131D',bg2:'#1E1B2B',pr:'#A78BFA',sc:'#FF7AB6',tx:'#F6F3FF',mu:'#AEA9C4',bd:'#2E2A40',on:'#150F26'},
 'emerald-dark':{name:'Emerald Dark',bg:'#0C1512',bg2:'#13201B',pr:'#2DD4A0',sc:'#F5B544',tx:'#F1F8F5',mu:'#A0B3AA',bd:'#213229',on:'#06150F'}
};
function rgb(h){return [1,3,5].map(function(i){return parseInt(h.slice(i,i+2),16)}).join(',')}
function apply(id){var t=T[id]||T['charcoal-orange'],s=document.documentElement.style,m={'--bg':t.bg,'--bg2':t.bg2,'--or':t.pr,'--bl':t.sc,'--tx':t.tx,'--mu':t.mu,'--bd':t.bd,'--onpr':t.on,'--bg-rgb':rgb(t.bg),'--bg2-rgb':rgb(t.bg2),'--or-rgb':rgb(t.pr),'--bl-rgb':rgb(t.sc)};for(var k in m)s.setProperty(k,m[k])}
window.SITE_THEMES=T;window.applyTheme=apply;
try{var x=new XMLHttpRequest();x.open('GET',new URL('../data/content.json',document.currentScript.src).href+'?t='+Date.now(),false);x.send();if(x.status===200)window.__DATA=JSON.parse(x.responseText)}catch(e){}
apply(window.__DATA&&window.__DATA.theme);
})();
