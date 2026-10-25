const STORAGE_KEY='reuel_commissions_data_v2';
const defaults={open:true,projects:[
{name:'Lobby Industrial',cat:'build',label:'Build',icon:'▦',desc:'Mapa/lobby desenvolvido no Roblox Studio.'},
{name:'Atmosfera Azul',cat:'luz',label:'Iluminação',icon:'✦',desc:'Iluminação cinematográfica e ambientação.'},
{name:'Identidade de Jogo',cat:'arte',label:'Arte',icon:'R',desc:'Logo, ícone e identidade visual.'}
],requests:[]};
function load(){try{return {...defaults,...JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}}catch{return structuredClone(defaults)}}
const data=load();
const grid=document.querySelector('#portfolioGrid');
const status=document.querySelector('#commissionStatus');
const requestButton=document.querySelector('#requestButton');
function render(filter='todos'){grid.innerHTML='';data.projects.filter(p=>filter==='todos'||p.cat===filter).forEach(p=>{grid.insertAdjacentHTML('beforeend',`<article class="project"><div class="cover">${p.icon||'◆'}</div><div class="info"><span class="tag">${p.label}</span><h3>${p.name}</h3><p>${p.desc}</p></div></article>`)});if(!grid.children.length)grid.innerHTML='<p class="hint">Nenhum projeto nesta categoria ainda.</p>'}
function statusUI(){status.className='status '+(data.open?'':'closed');status.innerHTML=`<i></i> Comissões ${data.open?'abertas':'fechadas'}`;requestButton.disabled=!data.open;requestButton.textContent=data.open?'Solicitar comissão':'Comissões fechadas'}
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelector('.filters .active').classList.remove('active');b.classList.add('active');render(b.dataset.filter)});
document.querySelector('#loginBtn').onclick=()=>alert('O login Google será ativado ao conectar o Firebase. Nunca digite sua senha Google dentro deste site.');
document.querySelector('#form').onsubmit=e=>{e.preventDefault();if(!data.open)return;document.querySelector('#formMsg').textContent='Conecte o Firebase para aceitar e salvar pedidos reais com conta Google.'};
render();statusUI();
