const STORAGE_KEY='reuel_commissions_data_v2';
const defaults={open:true,projects:[],requests:[]};
function load(){try{return {...defaults,...JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}}catch{return structuredClone(defaults)}}
let data=load();
const save=()=>localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
const $=s=>document.querySelector(s);
function showAdmin(){ $('#adminLogin').classList.add('hidden');$('#adminApp').classList.remove('hidden');refresh() }
$('#adminLoginBtn').onclick=()=>{if(!window.REUEL_FIREBASE_CONFIG){$('#loginHelp').innerHTML='Firebase ainda não conectado. Para testar o painel neste computador, <button id="demoAdmin" class="text-btn">abrir modo local</button>.';setTimeout(()=>$('#demoAdmin').onclick=showAdmin);return} alert('Firebase configurado: implemente o SDK Google Auth usando a configuração fornecida.')};
$('#logoutBtn').onclick=()=>location.reload();
document.querySelectorAll('.nav').forEach(b=>b.onclick=()=>{document.querySelector('.nav.active').classList.remove('active');b.classList.add('active');document.querySelectorAll('.admin-page').forEach(p=>p.classList.add('hidden'));$('#page-'+b.dataset.page).classList.remove('hidden');refresh()});
function refresh(){data=load();$('#dashStatus').textContent=data.open?'Abertas':'Fechadas';$('#dashProjects').textContent=data.projects.length;$('#dashRequests').textContent=data.requests.length;$('#openToggle').checked=data.open;$('#statusTitle').textContent='Comissões '+(data.open?'abertas':'fechadas');$('#statusDesc').textContent=data.open?'Clientes podem solicitar novos trabalhos.':'Novos pedidos ficam bloqueados no site.';renderProjects();renderRequests()}
$('#openToggle').onchange=e=>{data.open=e.target.checked;save();refresh();$('#saveNote').textContent='Status atualizado neste navegador. Com Firebase, a alteração será publicada para todos.'};
function renderProjects(){const el=$('#projectList');el.innerHTML='';data.projects.forEach((p,i)=>el.insertAdjacentHTML('beforeend',`<article><div><span class="tag">${p.label}</span><h3>${p.name}</h3><p>${p.desc}</p></div><div class="item-actions"><button onclick="editProject(${i})">Editar</button><button class="danger" onclick="removeProject(${i})">Excluir</button></div></article>`));if(!data.projects.length)el.innerHTML='<p class="hint">Nenhum projeto cadastrado.</p>'}
window.editProject=i=>{const p=data.projects[i];$('#editIndex').value=i;$('#pName').value=p.name;$('#pCat').value=p.cat;$('#pDesc').value=p.desc;$('#pIcon').value=p.icon||'';$('#editorTitle').textContent='Editar projeto';$('#projectForm').classList.remove('hidden')};
window.removeProject=i=>{if(confirm('Excluir este projeto?')){data.projects.splice(i,1);save();refresh()}};
$('#newProject').onclick=()=>{$('#projectForm').reset();$('#editIndex').value='';$('#editorTitle').textContent='Novo projeto';$('#projectForm').classList.remove('hidden')};
$('#cancelEdit').onclick=()=>$('#projectForm').classList.add('hidden');
$('#projectForm').onsubmit=e=>{e.preventDefault();const cat=$('#pCat').value;const labels={build:'Build',luz:'Iluminação',arte:'Arte',marketing:'Marketing'};const p={name:$('#pName').value.trim(),cat,label:labels[cat],desc:$('#pDesc').value.trim(),icon:$('#pIcon').value.trim()||'◆'};const idx=$('#editIndex').value;if(idx==='')data.projects.push(p);else data.projects[Number(idx)]=p;save();$('#projectForm').classList.add('hidden');refresh()};
function renderRequests(){const el=$('#requestList');el.innerHTML='';data.requests.forEach(r=>el.insertAdjacentHTML('beforeend',`<article><div><h3>${r.service||'Comissão'}</h3><p>${r.description||''}</p><small>${r.email||''}</small></div></article>`));if(!data.requests.length)el.innerHTML='<p class="hint">Nenhum pedido ainda. Pedidos reais aparecerão aqui após conectar o Firebase.</p>'}
