// Hash router and app start
function route(){const h=location.hash.slice(1)||'home',v={home,report,track,dashboard,about,login,authority,admin}[h]||home;$('#pop').innerHTML='';nav();$('#app').innerHTML=v()+'<footer>CivicTrack demo. Sample data only. Simulated analysis engine, not real AI. Not connected to any government service.</footer>';scrollTo(0,0);document.querySelectorAll('[data-v]').forEach(count);if(h=='report'){D=D||null;const m=$('#map');m&&bindMap()}}
load();window.addEventListener('hashchange',()=>{sel=null;route()});route();
