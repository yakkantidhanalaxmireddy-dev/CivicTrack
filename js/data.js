// Constants, seeded demo data, local storage persistence, rules-based analysis, duplicate check, notifications
const CATS={'Roads and Transportation':'Road Maintenance Department','Water Supply':'Water Supply Department','Sanitation and Waste Management':'Sanitation Department','Electricity and Streetlights':'Electricity Department','Pollution and Environment':'Environmental Department','Drainage and Sewage':'Drainage Department','Other Infrastructure Issues':'Municipal Works Department'};
const CK=Object.keys(CATS),SEV=['Low','Medium','High','Critical'],SC={Critical:'#d64545',High:'#ef8a17',Medium:'#e5b800',Low:'#2e9e5b',Resolved:'#13a89e'},ST=['Submitted','Under Review','Assigned','In Progress','Resolved','Rejected'];
const OFF=['A. Rao','S. Khan','P. Reddy','M. Iyer'],DL={Critical:2,High:5,Medium:10,Low:20},DAY=864e5;
const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let S,F={},D=null,sel=null,trk='',rec=null,files={photo:[],video:[],audio:[]};
function seed(){let r=7,rn=n=>(r=(r*9301+49297)%233280)/233280*n|0;const T=['Large pothole on main road','Pipeline leaking near market','Garbage pile not cleared','Streetlight not working','Factory smoke in residential area','Drain overflow after rain','Broken footpath near bus stop'],L=['Madhapur','Kukatpally','Secunderabad','Charminar','Gachibowli','Banjara Hills','LB Nagar','Uppal'];
const c=[];for(let i=0;i<32;i++){const k=i%7,sv=rn(4),st=ST[rn(5)],t=Date.now()-rn(40)*DAY;c.push({id:'CT-'+(1001+i),title:T[k],desc:'Reported by residents of '+L[i%8]+'. '+T[k]+' causing daily inconvenience.',cat:CK[k],lat:17.32+rn(16)/100,lng:78.32+rn(20)/100,loc:L[i%8]+', Hyderabad',sev:SEV[sv],safety:rn(10),people:20+rn(400),dept:CATS[CK[k]],status:st,created:t,officer:st=='Submitted'||st=='Under Review'?'':OFF[rn(4)],comments:[],photos:[],after:[],owner:i%5?'x':'citizen@demo',resAt:st=='Resolved'?t+rn(12)*DAY+DAY:0})}return c}
function load(){try{S=JSON.parse(localStorage.getItem('ct2'))}catch(e){}if(!S)S={c:seed(),users:[{e:'citizen@demo',p:'demo123',r:'citizen',n:'Demo Citizen'},{e:'authority@demo',p:'demo123',r:'authority',n:'Demo Authority'},{e:'admin@demo',p:'demo123',r:'admin',n:'Demo Admin'}],notifs:[{r:'citizen',m:'Welcome to CivicTrack demo mode.',read:0}],me:null,log:['Demo data seeded']}}
function save(){try{localStorage.setItem('ct2',JSON.stringify(S))}catch(e){}}
const days=c=>((c.resAt||Date.now())-c.created)/DAY,open=c=>c.status!='Resolved'&&c.status!='Rejected',esc2=c=>open(c)&&days(c)>DL[c.sev];
const score=c=>Math.min(100,{Critical:40,High:30,Medium:18,Low:8}[c.sev]+c.safety*3+Math.min(c.people/50,1)*20+(open(c)?Math.min(days(c)*2,10):0))|0;
const pill=(t,col)=>`<span class="pill" style="background:${col||SC[t]||'#5b6b82'}">${t}</span>`,sevc=c=>c.status=='Resolved'?'Resolved':c.sev;
function analyze(t,cat){const x=t.toLowerCase(),has=a=>a.some(w=>x.includes(w));let sv=1,sf=3,pp=40,why=[];
if(has(['school','hospital','child']))sf+=4,pp+=150,sv++,why.push('near a school or hospital');if(has(['accident','injur','open manhole','live wire','spark','electrocut','collapse']))sf+=3,sv+=2,why.push('immediate injury risk keywords');
if(has(['main road','highway','market','junction','bus']))pp+=100,why.push('high-footfall location');if(has(['flood','overflow','sewage','burst','toxic','smoke']))sv++,sf+=1,why.push('spread or health risk');if(has(['small','minor','slight']))sv--;
sv=Math.max(0,Math.min(3,sv));const c={sev:SEV[sv],safety:Math.min(10,sf),people:pp,cat,dept:CATS[cat],reason:why.length?'Flagged: '+why.join(', ')+'.':'No high-risk keywords found; defaulting to routine priority.'};c.score=score({...c,status:'Submitted',created:Date.now()});return c}
function dup(a){return S.c.filter(c=>c.cat==a.cat&&open(c)&&Math.abs(c.lat-a.lat)<.01&&Math.abs(c.lng-a.lng)<.01)}
function note(r,m){S.notifs.unshift({r,m,read:0})}
const me=()=>S.me,role=()=>S.me?.r;
