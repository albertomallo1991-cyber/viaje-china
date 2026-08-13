import { firebaseConfig, TRIP_PATH } from './firebase-config.js';

/* =========================================================
   DATA — extraído del Excel ViajeChina_1_.xlsx
   ========================================================= */
const PEOPLE = ["Mallo","Lichu","Albertito","Nacho"];

const FLIGHTS = [
  {id:"f1", date:"2026-08-18", label:"Ida · Tramo 1", from:"Madrid", fromT:"15:30", to:"Cairo", toT:"21:20", cost:null},
  {id:"f2", date:"2026-08-18", label:"Ida · Tramo 2", from:"Cairo", fromT:"01:05", to:"Beijing", toT:"15:20", cost:556.75},
  {id:"f3", date:"2026-08-31", label:"Vuelta · Tramo 1", from:"Shanghái", fromT:"00:05", to:"Dubái", toT:"04:45", cost:null},
  {id:"f4", date:"2026-08-31", label:"Vuelta · Tramo 2", from:"Dubái", fromT:"07:45", to:"Madrid", toT:"13:30", cost:535},
];
const FLIGHTS_PP_TOTAL = 1091.75;

const DAYS = [
{ id:"d19", date:"2026-08-19", dow:"Miércoles", city:"Pekín",
  hotel:{id:"d19-hotel", name:"Yitel (Beijing Tiananmen · Wangfujing Subway Station)", address:"1st Floor, Gongmei Building, No. 200 Wangfujing Street, Distrito de Dongcheng, Pekín, China", nights:3, defBookedBy:null, defCost:null},
  groups:[
    {id:"d19-g1", title:"Templos, Hutongs y Cultura Local", duration:"7,5 a 8,5 horas", items:[
      {id:"d19-a1", title:"Templo de Lama (Yonghe)", duration:"1.5 a 2 horas", star:true},
      {id:"d19-a2", title:"Callejuelas de Yonghe Street y Hutongs de Gulou", duration:"2 horas"},
      {id:"d19-a3", title:"Torres del Tambor y de la Campana + Nanluoguxiang", duration:"2 a 2.5 horas"},
      {id:"d19-a4", title:"Cena en Gui Street (Ghost Street)", duration:"2 horas", star:true},
    ]}
  ]},
{ id:"d20", date:"2026-08-20", dow:"Jueves", city:"Pekín",
  groups:[
    {id:"d20-g1", title:"La Gran Muralla (Mutianyu)", duration:"7 a 8 horas", star:true, costItem:{id:"d20-a1", defBookedBy:"Mallo", defCost:68.64}, items:[
      {id:"d20-a2", title:"Tramo de Mutianyu (transporte)", duration:"1.5 a 2 horas"},
    ]}
  ]},
{ id:"d21", date:"2026-08-21", dow:"Viernes", city:"Pekín",
  groups:[
    {id:"d21-g1", title:"El Eje Imperial (todo a pie, de sur a norte)", duration:"6,5 a 8,5 horas", items:[
      {id:"d21-a1", title:"Qianmen / Dashilar", duration:"1.5 a 2 horas"},
      {id:"d21-a2", title:"Plaza de Tiananmen", duration:"45 min a 1 hora", star:true, defBookedBy:"Mallo", defCost:188.76},
      {id:"d21-a3", title:"La Ciudad Prohibida", duration:"3 a 4 horas", star:true, defBookedBy:"Mallo", defCost:null},
      {id:"d21-a4", title:"Parque Jingshan (Colina del Carbón)", duration:"1 a 1.5 horas"},
    ]}
  ]},
{ id:"d22", date:"2026-08-22", dow:"Sábado", city:"Pekín → Xi'an",
  transport:{id:"d22-t1", route:"Beijing Xi (Oeste) → Xi'an Bei (Norte)", detail:"Salida 12:55 · Llegada 17:08 · Duración 4h 13min", defBookedBy:"Mallo", defCost:347.92},
  hotel:{id:"d22-hotel", name:"Jiaya Hotel (Jiaotong University · Xingqing Campus Park South Road Subway Station)", address:"No. 139, North Entrance of Gongyuan South Road, Xincheng, Xi'an, Shaanxi, China", nights:2, defBookedBy:null, defCost:null},
  groups:[
    {id:"d22-g1", title:"Toma de contacto en Xi'an", duration:null, items:[
      {id:"d22-a1", title:"Paseo por el Centro Histórico (Torres de la Campana y el Tambor)", duration:"1 a 2 horas"},
      {id:"d22-a2", title:"Ruta gastronómica en el Barrio Musulmán", duration:"2 a 3 horas"},
    ]}
  ]},
{ id:"d23", date:"2026-08-23", dow:"Domingo", city:"Xi'an",
  groups:[
    {id:"d23-g1", title:"Guerreros de Terracota y alrededores", duration:null, items:[
      {id:"d23-a1", title:"Guerreros de Terracota", duration:"4 a 5 horas (incl. trayectos)", star:true, link:"https://www.civitatis.com/es/xian/entrada-museo-guerreros-terracota/", defBookedBy:"Mallo", defCost:83.8},
      {id:"d23-a2", title:"Gran Pagoda de la Oca Salvaje", duration:"2 horas", star:true, note:"Sacar entrada allí (6 € aprox.)"},
      {id:"d23-a3", title:"Show de Fuentes y Avenida Dinastía Tang", duration:"2 horas"},
    ]}
  ]},
{ id:"d24", date:"2026-08-24", dow:"Lunes", city:"Xi'an → Hangzhou",
  transport:{id:"d24-t1", route:"Xi'an Bei (Norte) → Hangzhou Oeste", detail:"Salida 8:18 · Llegada 14:49 · Duración 6h 31min", defBookedBy:"Mallo", defCost:421.44},
  hotel:{id:"d24-hotel", name:"Atour Hotel — West Lake Cultural Plaza", address:"Shangtang Road, Hangzhou", link:"https://www.hotelsinhangzhou.net/en/property/atour-west-lake-cultural-plaza-shangtang-road.html", nights:2, defBookedBy:"Mallo", defCost:159.26},
  groups:[
    {id:"d24-g1", title:"Llegada a Hangzhou", duration:null, items:[
      {id:"d24-a1", title:"Llegada a Hangzhou y toma de contacto", duration:null},
      {id:"d24-a2", title:"Paseo nocturno por la Calle Peatonal Hefang", duration:null},
    ]}
  ]},
{ id:"d25", date:"2026-08-25", dow:"Martes", city:"Hangzhou",
  groups:[
    {id:"d25-g1", title:"Naturaleza y Templos Históricos", duration:"7,5 a 9 horas", note:"Llevar calzado cómodo", items:[
      {id:"d25-a1", title:"Lago del Oeste (West Lake) en barca o bici", duration:"3 a 4 horas", star:true, note:"Comprar entrada combinada allí"},
      {id:"d25-a2", title:"Templo Lingyin y Cuevas de Feilai Feng", duration:"2.5 a 3 horas", star:true, note:"Ideal ir en taxi o Didi"},
      {id:"d25-a3", title:"Terrazas de té en el pueblo de Longjing", duration:"2 horas"},
    ]}
  ]},
{ id:"d26", date:"2026-08-26", dow:"Miércoles", city:"Hangzhou → Suzhou",
  transport:{id:"d26-t1", route:"Hangzhou Este → Suzhou", detail:"Salida 8:09 · Llegada 10:03 · Duración 1h 54min", defBookedBy:"Mallo", defCost:76.28},
  hotel:{id:"d26-hotel", name:"Ibis Suzhou", address:"Suzhou", nights:1, defBookedBy:"Mallo", defCost:78.48},
  groups:[
    {id:"d26-g1", title:"Un día entero en Suzhou (la Venecia de Oriente)", duration:"6,5 a 8 horas", note:"Reservar online con 2 días de antelación", items:[
      {id:"d26-a1", title:"Jardín del Humilde Administrador", duration:"2.5 a 3 horas", star:true, note:"Pasear a pie o en barca tradicional"},
      {id:"d26-a2", title:"Calle Histórica Pingjiang y canales tradicionales", duration:"2 a 3 horas", note:"Sacar entrada en taquilla"},
      {id:"d26-a3", title:"Colina del Tigre (Pagoda inclinada Yunyan)", duration:"2 horas"},
    ]}
  ]},
{ id:"d27", date:"2026-08-27", dow:"Jueves", city:"Suzhou → Shanghái",
  transport:{id:"d27-t1", route:"Suzhou → Shanghái", detail:"Salida 17:08 · Llegada 17:50 · Duración 42min", note:"Entrada barata en taquilla", defBookedBy:"Mallo", defCost:30.36},
  hotel:{id:"d27-hotel", name:"Tonight Homestay West", address:"Baoshan, Shanghái", link:"https://www.agoda.com/guisu-homestay-baoshan-branch/hotel/shanghai-cn.html", nights:3, defBookedBy:"Mallo", defCost:373.62},
  groups:[
    {id:"d27-g1", title:"Llegada a la Megalópolis y Tradición", duration:"6 a 7,5 horas", note:"Entrada barata en taquilla", items:[
      {id:"d27-a1", title:"Jardín Yuyuan y Bazar de la zona antigua", duration:"2 a 2.5 horas", star:true, note:"Gratuito"},
      {id:"d27-a2", title:"Calle comercial peatonal Nanjing Road", duration:"2 horas", note:"Gratuito (las luces se encienden a las 19h)"},
      {id:"d27-a3", title:"El Bund al atardecer (encendido de luces)", duration:"2 horas", star:true},
    ]}
  ]},
{ id:"d28", date:"2026-08-28", dow:"Viernes", city:"Shanghái",
  groups:[
    {id:"d28-g1", title:"El Shanghái del Siglo XXI y Concesión Francesa", duration:"6,5 a 8 horas", note:"Comprar ticket en web oficial o Trip.com", items:[
      {id:"d28-a1", title:"Subida a la Torre de Shanghái (Pudong)", duration:"2 a 2.5 horas", star:true, note:"Gratuito"},
      {id:"d28-a2", title:"Paseo por la Antigua Concesión Francesa", duration:"2.5 a 3 horas", note:"Zona de compras y arte, gratuito"},
      {id:"d28-a3", title:"Callejones de Tianzifang", duration:"2 horas"},
    ]}
  ]},
{ id:"d29", date:"2026-08-29", dow:"Sábado", city:"Shanghái",
  groups:[
    {id:"d29-g1", title:"Cultura, Templos y Vistas desde el Río", duration:"5,5 a 7 horas", note:"Sacar entrada en taquilla", items:[
      {id:"d29-a1", title:"Templo del Buda de Jade", duration:"1.5 a 2 horas"},
      {id:"d29-a2", title:"Tarde libre de compras o visitas culturales", duration:"2 a 3 horas"},
      {id:"d29-a3", title:"Crucero nocturno por el río Huangpu", duration:"2 horas", star:true, note:"Se puede reservar en el mismo embarcadero"},
    ]}
  ]},
{ id:"d30", date:"2026-08-30", dow:"Domingo", city:"Shanghái → España",
  groups:[
    {id:"d30-g1", title:"Fin del viaje y traslado al aeropuerto", duration:"—", items:[]}
  ]},
{ id:"d31", date:"2026-08-31", dow:"Lunes", city:"Llegada a España",
  groups:[
    {id:"d31-g1", title:"Vuelo de vuelta: Shanghái ✈ Dubái ✈ Madrid", duration:"Ver pestaña Vuelos", items:[]}
  ]},
];

const TRAVEL_TIPS = [
  "Instalar una VPN antes de salir de casa: Google, WhatsApp, Instagram y Maps no funcionan en China sin ella.",
  "Alipay o WeChat Pay son la forma de pago habitual en casi todas partes — se pueden vincular a una tarjeta extranjera desde la propia app.",
  "Didi (el Uber chino) funciona bien para moverse; tener la dirección de destino escrita en chino ayuda mucho con los taxis normales.",
  "Llevar el pasaporte siempre encima: hace falta para check-in en hoteles y para pasar el control de seguridad de los trenes de alta velocidad.",
  "En agosto hace calor y humedad en las cinco ciudades — ropa ligera, agua y protector solar, y dejar las visitas al aire libre para primera/última hora.",
  "Una eSIM o SIM local (se compra fácil en el aeropuerto) evita depender del wifi para el traductor, los mapas o Didi.",
  "Fuera de las zonas turísticas poca gente habla inglés — un traductor con cámara (o el propio WeChat) resuelve casi cualquier apuro.",
];

const CITY_GUIDE = [
  { name:"Pekín",
    history:"Capital de China durante la mayor parte de las dinastías Yuan, Ming y Qing — más de 700 años como centro del poder imperial. La Ciudad Prohibida fue el palacio del emperador durante casi 500 años, cerrado a cualquiera que no formara parte de la corte (de ahí el nombre).",
    facts:[
      "Pekín (北京) significa literalmente \"capital del norte\".",
      "El tramo de Gran Muralla que se visita en Mutianyu forma parte de un sistema de murallas que, sumando todos sus tramos históricos, supera los 21.000 km.",
      "Los hutongs son los antiguos callejones que rodean patios tradicionales (siheyuan); muchos han desaparecido con la modernización, pero los de Nanluoguxiang y Gulou se conservan.",
    ],
    tips:[
      "La Ciudad Prohibida limita el aforo diario y las entradas se agotan con antelación — comprarlas online unos días antes.",
      "El tramo de Mutianyu es bastante más tranquilo que Badaling para visitar la Gran Muralla.",
    ]},
  { name:"Xi'an",
    history:"Bajo el nombre de Chang'an fue capital de China durante 13 dinastías y el punto de partida de la Ruta de la Seda — una de las ciudades más grandes y cosmopolitas del mundo antiguo.",
    facts:[
      "Los Guerreros de Terracota se descubrieron por accidente en 1974, cuando unos agricultores cavaban un pozo.",
      "Se calculan más de 8.000 figuras en el ejército de terracota, cada una con rasgos faciales distintos.",
      "La muralla urbana de la dinastía Ming se conserva casi completa — unos 14 km que se pueden recorrer en bici por encima.",
    ],
    tips:[
      "Reservar la entrada a los Guerreros de Terracota con antelación y llegar pronto evita las peores aglomeraciones.",
      "El Barrio Musulmán es la mejor zona para probar comida callejera (fideos biang biang, cordero a la brasa).",
    ]},
  { name:"Hangzhou",
    history:"Capital de la dinastía Song del Sur y una de las ciudades más prósperas del mundo medieval. Marco Polo la describió como \"la ciudad más bella y suntuosa del mundo\".",
    facts:[
      "El Lago del Oeste es Patrimonio de la Humanidad por la UNESCO desde 2011.",
      "Es la cuna del té Longjing (\"Pozo del Dragón\"), cultivado en las colinas junto al lago desde hace más de mil años.",
      "Hoy es también la sede de Alibaba — tradición milenaria y tecnología punta conviven en la misma ciudad.",
    ],
    tips:[
      "Pasear o alquilar una bici alrededor del lago al atardecer es de lo más recomendable.",
      "En las terrazas de Longjing se puede comprar té directamente a los productores locales.",
    ]},
  { name:"Suzhou",
    history:"Con más de 2.500 años de historia, Suzhou es famosa desde la dinastía Song por sus jardines privados y su producción de seda.",
    facts:[
      "Sus jardines clásicos, como el Jardín del Humilde Administrador, son Patrimonio de la Humanidad por la UNESCO.",
      "Se la conoce como \"la Venecia de Oriente\" por su red de canales, algunos con más de mil años de antigüedad.",
      "Ha sido durante siglos uno de los principales centros de producción de seda de China.",
    ],
    tips:[
      "Los jardines más populares limitan las entradas — comprarlas con un par de días de antelación si es posible.",
      "Pasear por la Calle Pingjiang junto al canal es la forma más tranquila de ver la ciudad antigua.",
    ]},
  { name:"Shanghái",
    history:"Una pequeña ciudad portuaria hasta el siglo XIX, cuando pasó a ser puerto de tratado tras las Guerras del Opio. Las concesiones extranjeras (francesa, británica, americana) que se instalaron entonces marcaron para siempre su arquitectura.",
    facts:[
      "El Bund reúne edificios art déco y neoclásicos construidos por bancos y compañías extranjeras entre 1920 y 1930.",
      "Al otro lado del río, Pudong eran en su mayoría campos hasta los años 90; hoy es uno de los distritos financieros más futuristas del mundo.",
      "Es la ciudad más poblada de China, con más de 24 millones de habitantes.",
    ],
    tips:[
      "El Bund es especialmente bonito al atardecer, cuando se encienden las luces de Pudong.",
      "El metro es rápido, barato y fácil de usar pagando con Alipay o WeChat Pay.",
    ]},
];

/* =========================================================
   FIREBASE — datos compartidos en tiempo real
   ========================================================= */
const FIREBASE_READY = firebaseConfig.apiKey !== "TU_API_KEY_AQUI";
let db = null;
let tripRef = null;

// EDITS shape kept in sync with Firebase: { fields:{[id]:{bookedBy,cost,done,note}}, removed:{[id]:true}, custom:{[groupId]:{[customId]:{id,title,duration}}}, expenses:{[expenseId]:{id,date,concept,detail,amount,paidBy}} }
let EDITS = { fields:{}, removed:{}, custom:{}, expenses:{} };
let WHOAMI = localStorage.getItem('china-trip-whoami') || "";
let pendingRemoteRender = false;
let connected = FIREBASE_READY;

// Firebase modules are only fetched from the CDN when a real project is
// configured, so the app works offline/without a backend during setup.
let fbSet = null, fbRef = null;

async function initFirebase(){
  if(!FIREBASE_READY){
    try{ EDITS = { fields:{}, removed:{}, custom:{}, expenses:{}, ...JSON.parse(localStorage.getItem('china-trip-edits-local') || '{}') }; }
    catch(e){ EDITS = { fields:{}, removed:{}, custom:{}, expenses:{} }; }
    renderStorageBanner();
    renderConnStatus();
    renderCurrentTab();
    return;
  }
  try{
    const [{ initializeApp }, { getDatabase, ref, onValue, set }] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js'),
    ]);
    fbSet = set; fbRef = ref;
    const app = initializeApp(firebaseConfig);
    db = getDatabase(app);
    tripRef = ref(db, TRIP_PATH);

    onValue(ref(db, '.info/connected'), (snap)=>{
      connected = !!snap.val();
      renderConnStatus();
    });

    onValue(tripRef, (snap)=>{
      const val = snap.val();
      EDITS = { fields:{}, removed:{}, custom:{}, expenses:{}, ...(val||{}) };
      if(isEditingNow()){ pendingRemoteRender = true; }
      else { renderCurrentTab(); }
    });
  }catch(e){
    connected = false;
    db = null;
    showToast("No se pudo conectar con Firebase — revisa firebase-config.js");
    renderConnStatus();
  }
}

function isEditingNow(){
  const active = document.activeElement;
  return active && (active.tagName === 'INPUT' || active.tagName === 'SELECT');
}

document.addEventListener('focusout', ()=>{
  if(pendingRemoteRender){ pendingRemoteRender = false; renderCurrentTab(); }
});

async function writePath(path, value){
  if(FIREBASE_READY && db && fbSet && fbRef){
    try{
      await fbSet(fbRef(db, `${TRIP_PATH}/${path}`), value);
      showToast("Guardado ✓ — visible para todos");
    }catch(e){
      showToast("No se pudo guardar — comprueba tu conexión");
    }
  } else {
    // local-only fallback, keep EDITS consistent with the path we just wrote
    localStorage.setItem('china-trip-edits-local', JSON.stringify(EDITS));
    showToast("Guardado solo en este dispositivo (Firebase sin configurar)");
  }
}

function fieldVal(id, field, def){
  const rec = EDITS.fields && EDITS.fields[id];
  if(rec && rec[field] !== undefined && rec[field] !== "") return rec[field];
  return def === undefined ? "" : def;
}
function setField(id, field, value){
  EDITS.fields = EDITS.fields || {};
  EDITS.fields[id] = EDITS.fields[id] || {};
  EDITS.fields[id][field] = value;
  writePath(`fields/${id}/${field}`, value);
}

function isRemoved(id){
  return !!(EDITS.removed && EDITS.removed[id]);
}
function removeActivity(id){
  EDITS.removed = EDITS.removed || {};
  EDITS.removed[id] = true;
  writePath(`removed/${id}`, true);
  renderCurrentTab();
}
function getCustomItems(groupId){
  const rec = (EDITS.custom && EDITS.custom[groupId]) || {};
  return Object.keys(rec).map(k=>rec[k]);
}
function addCustomActivity(groupId, title, duration){
  if(!title || !title.trim()) return;
  const id = groupId + '-c' + Date.now();
  const item = { id, title:title.trim(), duration:(duration||"").trim() };
  EDITS.custom = EDITS.custom || {};
  EDITS.custom[groupId] = EDITS.custom[groupId] || {};
  EDITS.custom[groupId][id] = item;
  writePath(`custom/${groupId}/${id}`, item);
  openAddForms.delete(groupId);
  renderCurrentTab();
}
function visibleItems(g){
  const defaults = (g.items||[]).filter(it=>!isRemoved(it.id));
  const customs = getCustomItems(g.id).filter(it=>!isRemoved(it.id));
  return defaults.concat(customs);
}

/* ---------- GASTOS (registro libre de gastos, estilo Splitwise) ---------- */
// Cada gasto tiene un único pagador ("paidBy") y una lista de a quién se le
// carga ("chargedTo"), que puede ser 1, varias o todas las personas. El
// importe se reparte a partes iguales entre los de "chargedTo". Esto sirve
// tanto para gastos compartidos normales (chargedTo = todos, o un subgrupo)
// como para liquidaciones directas entre dos personas (chargedTo = 1 sola
// persona), sin necesidad de un tipo de movimiento distinto.
let expenseChargeSelection = new Set(PEOPLE);

function getExpenses(){
  const rec = EDITS.expenses || {};
  return Object.keys(rec).map(k=>rec[k]).sort((a,b)=>{
    if(a.date !== b.date) return (b.date||"").localeCompare(a.date||"");
    return (b.id||"").localeCompare(a.id||"");
  });
}
function addExpense(date, concept, detail, amount, paidBy, chargedTo, isSettlement){
  if(!concept || !concept.trim()) return;
  const amt = parseFloat(amount);
  if(!amt || amt <= 0) return;
  const charged = (chargedTo && chargedTo.length) ? chargedTo.filter(p=>PEOPLE.includes(p)) : PEOPLE.slice();
  const id = 'exp-' + Date.now() + '-' + Math.random().toString(36).slice(2,7);
  const item = { id, date: date || new Date().toISOString().slice(0,10), concept: concept.trim(), detail: (detail||"").trim(), amount: amt, paidBy: paidBy || "", chargedTo: charged, isSettlement: !!isSettlement };
  EDITS.expenses = EDITS.expenses || {};
  EDITS.expenses[id] = item;
  writePath(`expenses/${id}`, item);
  expenseChargeSelection = new Set(PEOPLE);
  renderCurrentTab();
}
function removeExpense(id){
  if(EDITS.expenses) delete EDITS.expenses[id];
  writePath(`expenses/${id}`, null);
  renderCurrentTab();
}

/* ---------- LEDGER (saldos entre los 4, estilo Splitwise) ---------- */
// Cada partida del itinerario se reparte siempre entre los 4 (comportamiento
// de siempre). Cada gasto suelto NO marcado como liquidación se reparte
// entre quien esté en su "chargedTo" y cuenta como coste real del viaje.
//
// Una liquidación (isSettlement=true, p.ej. "Albertito paga 500€ a Mallo")
// NO es un coste del viaje: no infla el total ni la parte de nadie, solo
// mueve saldo directamente de quien paga a quien cobra. Así, el importe
// "pagado" que se muestra por persona converge a ser el mismo para los 4
// una vez todo está liquidado, en vez de quedarse con el dinero que cada
// uno adelantó en bruto (que no baja aunque le hayan devuelto el dinero).
function buildLedger(){
  const realPaid = {}, totalOwed = {}, settleSent = {}, settleReceived = {};
  PEOPLE.forEach(p=>{ realPaid[p]=0; totalOwed[p]=0; settleSent[p]=0; settleReceived[p]=0; });
  let grandTotal = 0, unassignedPaid = 0;

  collectAllCostItems().forEach(it=>{
    const payer = fieldVal(it.id,'bookedBy', it.defBookedBy||"");
    const cost = parseFloat(fieldVal(it.id,'cost', it.defCost)) || 0;
    if(cost<=0) return;
    grandTotal += cost;
    if(payer && realPaid[payer]!==undefined) realPaid[payer] += cost;
    else unassignedPaid += cost;
    const share = cost / PEOPLE.length;
    PEOPLE.forEach(p=> totalOwed[p] += share);
  });

  const expenses = getExpenses();
  expenses.forEach(e=>{
    const amt = parseFloat(e.amount) || 0;
    if(amt<=0) return;
    const charged = (e.chargedTo && e.chargedTo.length) ? e.chargedTo.filter(p=>PEOPLE.includes(p)) : PEOPLE.slice();
    const share = amt / (charged.length || 1);
    if(e.isSettlement){
      if(e.paidBy && settleSent[e.paidBy]!==undefined) settleSent[e.paidBy] += amt;
      charged.forEach(p=>{ if(settleReceived[p]!==undefined) settleReceived[p] += share; });
    } else {
      grandTotal += amt;
      if(e.paidBy && realPaid[e.paidBy]!==undefined) realPaid[e.paidBy] += amt;
      else unassignedPaid += amt;
      charged.forEach(p=>{ if(totalOwed[p]!==undefined) totalOwed[p] += share; });
    }
  });

  const totalPaid = {}, balance = {};
  PEOPLE.forEach(p=>{
    totalPaid[p] = realPaid[p] + settleSent[p] - settleReceived[p];
    balance[p] = totalPaid[p] - totalOwed[p];
  });

  return { totalPaid, totalOwed, balance, grandTotal, unassignedPaid, expenses };
}

// Reduce los saldos netos a un número mínimo de pagos sugeridos (quién paga
// a quién y cuánto), emparejando siempre al mayor deudor con el mayor acreedor.
function simplifyDebts(balance){
  const creditors = [], debtors = [];
  PEOPLE.forEach(p=>{
    const b = balance[p];
    if(b > 0.005) creditors.push({name:p, amt:b});
    else if(b < -0.005) debtors.push({name:p, amt:-b});
  });
  creditors.sort((a,b)=>b.amt-a.amt);
  debtors.sort((a,b)=>b.amt-a.amt);
  const transactions = [];
  let i=0, j=0;
  while(i<debtors.length && j<creditors.length){
    const pay = Math.min(debtors[i].amt, creditors[j].amt);
    if(pay > 0.005) transactions.push({from:debtors[i].name, to:creditors[j].name, amount:pay});
    debtors[i].amt -= pay;
    creditors[j].amt -= pay;
    if(debtors[i].amt < 0.005) i++;
    if(creditors[j].amt < 0.005) j++;
  }
  return transactions;
}

function isMine(id, defBookedBy){
  if(!WHOAMI) return false;
  const bookedBy = fieldVal(id,'bookedBy', defBookedBy||"");
  return bookedBy === WHOAMI;
}

function saveWhoAmI(name){
  WHOAMI = name;
  localStorage.setItem('china-trip-whoami', name);
  renderWhoButtons();
  renderCurrentTab();
}

function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=>t.classList.remove('show'), 1800);
}

/* =========================================================
   RENDER HELPERS
   ========================================================= */
function whoOptions(selected){
  let html = `<option value="">Sin asignar</option>`;
  PEOPLE.forEach(p=>{
    html += `<option value="${p}" ${p===selected?'selected':''}>${p}</option>`;
  });
  return html;
}

function editRow(id, defBookedBy, defCost, defNote){
  const bookedBy = fieldVal(id,'bookedBy', defBookedBy||"");
  const cost = fieldVal(id,'cost', defCost!==undefined&&defCost!==null?defCost:"");
  const done = fieldVal(id,'done', bookedBy ? true : false);
  const note = fieldVal(id,'note', defNote||"");
  const sealClass = bookedBy ? "seal" : "seal empty";
  const sealText = bookedBy ? bookedBy.slice(0,2).toUpperCase() : "?";
  return `
  <div class="edit-row" data-row="${id}">
    <div class="${sealClass}" title="${escapeHtml(bookedBy ? bookedBy+' se encarga' : 'Sin asignar')}">${sealText}</div>
    <select data-id="${id}" data-field="bookedBy">${whoOptions(bookedBy)}</select>
    <input class="cost-input" type="number" step="0.01" placeholder="€ coste" data-id="${id}" data-field="cost" value="${cost}">
    <label class="chk"><input type="checkbox" data-id="${id}" data-field="done" ${done?'checked':''}> Reservado</label>
    <input class="note-input" type="text" placeholder="Nota / enlace…" data-id="${id}" data-field="note" value="${escapeHtml(note)}">
  </div>`;
}

function escapeHtml(s){
  return (s||"").toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

/* ---------- CUSTOM / REMOVED ACTIVITIES ---------- */
const openAddForms = new Set();

function dayNum(dateStr){ return dateStr.split('-')[2]; }

/* ---------- TAB: RESUMEN ---------- */
function renderResumen(){
  let html = `<h2 class="section-title">Resumen del viaje</h2>
  <p class="section-sub">13 días recorriendo cinco ciudades. Toca "¿Quién eres?" arriba para ver resaltado lo que te toca a ti.</p>`;

  html += `<div class="card"><div style="padding:16px 18px;">
    <div class="block-title" style="margin-bottom:10px;">Ruta</div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-family:'IBM Plex Mono',monospace;font-size:13px;">
      <span class="badge">Pekín</span> → <span class="badge">Xi'an</span> → <span class="badge">Hangzhou</span> → <span class="badge">Suzhou</span> → <span class="badge">Shanghái</span>
    </div>
  </div></div>`;

  html += `<div class="card"><div style="padding:16px 18px;">
    <div class="block-title" style="margin-bottom:8px;">Cómo funciona este panel</div>
    <p style="font-size:13.5px;color:var(--ink-soft);margin:0 0 6px;">Cada actividad, hotel y trayecto tiene una fila editable: quién se encarga de reservarlo, el coste, si ya está reservado y una nota libre. Cualquiera de los 4 puede editar — se guarda automáticamente y lo ven los demás.</p>
    <p style="font-size:13.5px;color:var(--ink-soft);margin:0;">🌟 marca los planes imprescindibles del día.</p>
  </div></div>`;
  document.getElementById('tabContent').innerHTML = html;
}

/* ---------- TAB: VUELOS ---------- */
function renderVuelos(){
  let html = `<h2 class="section-title">Vuelos internacionales</h2>
  <p class="section-sub">Coste medio por persona (billete completo ida y vuelta): <b class="mono">${FLIGHTS_PP_TOTAL.toFixed(2)} €</b></p>`;

  const byDate = {};
  FLIGHTS.forEach(f=>{ (byDate[f.date] = byDate[f.date]||[]).push(f); });

  Object.keys(byDate).forEach(date=>{
    const d = new Date(date+"T00:00:00");
    const dateLabel = d.toLocaleDateString('es-ES',{weekday:'long', day:'numeric', month:'long'});
    html += `<div class="card"><div class="flight-card">
      <div class="flight-date">${dateLabel}</div>`;
    byDate[date].forEach(f=>{
      html += `<div class="flight-route" style="margin-bottom:10px;">
        <span class="flight-city">${f.from}</span>
        <span class="flight-time">${f.fromT}</span>
        <span class="flight-arrow">✈</span>
        <span class="flight-city">${f.to}</span>
        <span class="flight-time">${f.toT}</span>
      </div>`;
      html += editRow(f.id, null, f.cost);
      html += `<div style="height:10px;"></div>`;
    });
    html += `</div></div>`;
  });
  document.getElementById('tabContent').innerHTML = html;
}

/* ---------- TAB: ITINERARIO ---------- */
function renderItinerario(){
  let html = `<h2 class="section-title">Itinerario día a día</h2>
  <p class="section-sub">18 – 31 de agosto de 2026</p>`;

  DAYS.forEach(day=>{
    let bodyHtml = `<div class="city-line"><h3>${day.city}</h3><span class="badge">${day.dow}</span></div>`;

    if(day.hotel){
      const h = day.hotel;
      bodyHtml += `<div class="block">
        <div class="block-head"><span class="block-icon">🛏️</span><span class="block-title">${h.name}</span><span class="block-dur">${h.nights} noche${h.nights>1?'s':''}</span></div>
        ${h.address ? `<div class="block-address">${h.address}</div>` : ''}
        ${h.link ? `<div class="block-address"><a href="${h.link}" target="_blank" rel="noopener">Ver alojamiento ↗</a></div>` : ''}
        ${editRow(h.id, h.defBookedBy, h.defCost)}
      </div>`;
    }
    if(day.transport){
      const t = day.transport;
      bodyHtml += `<div class="block">
        <div class="block-head"><span class="block-icon">🚄</span><span class="block-title">${t.route}</span></div>
        <div class="block-note" style="font-style:normal;">${t.detail}</div>
        ${t.note ? `<div class="block-note">${t.note}</div>` : ''}
        ${editRow(t.id, t.defBookedBy, t.defCost)}
      </div>`;
    }
    (day.groups||[]).forEach(g=>{
      bodyHtml += `<div class="block">
        <div class="block-head">
          ${g.star ? '<span class="star block-icon">🌟</span>' : '<span class="block-icon">📍</span>'}
          <span class="block-title">${g.title}</span>
          ${g.duration ? `<span class="block-dur">${g.duration}</span>` : ''}
        </div>
        ${g.note ? `<div class="block-note">${g.note}</div>` : ''}`;

      if(g.costItem){
        bodyHtml += editRow(g.costItem.id, g.costItem.defBookedBy, g.costItem.defCost);
      }

      const items = visibleItems(g);
      if(items.length){
        bodyHtml += `<ul class="activity-list">`;
        items.forEach(it=>{
          bodyHtml += `<li class="activity-item">
            <div class="activity-head">
              <div class="activity-text">
                ${it.star ? '<span class="star">🌟 </span>' : ''}${escapeHtml(it.title)}
                ${it.duration ? `<span class="a-dur">${escapeHtml(it.duration)}</span>` : ''}
                ${it.link ? `<span class="a-note"><a href="${it.link}" target="_blank" rel="noopener">Enlace de reserva ↗</a></span>` : ''}
                ${it.note ? `<span class="a-note">${escapeHtml(it.note)}</span>` : ''}
              </div>
              <button class="remove-btn" data-remove-id="${it.id}" title="Quitar actividad">🗑️</button>
            </div>
            ${editRow(it.id, it.defBookedBy, it.defCost)}
          </li>`;
        });
        bodyHtml += `</ul>`;
      }

      bodyHtml += `
        <button class="add-activity-btn" data-toggle-add="${g.id}">+ Añadir actividad</button>
        <div class="add-activity-form ${openAddForms.has(g.id)?'open':''}" data-group-form="${g.id}">
          <input class="add-title" type="text" placeholder="Nombre de la actividad">
          <input class="add-dur" type="text" placeholder="Duración (opcional)">
          <button type="button" class="add-confirm" data-submit-add="${g.id}">Añadir</button>
        </div>`;

      bodyHtml += `</div>`;
    });

    // highlight if any sub-item belongs to WHOAMI
    let mine = false;
    if(day.hotel && isMine(day.hotel.id, day.hotel.defBookedBy)) mine = true;
    if(day.transport && isMine(day.transport.id, day.transport.defBookedBy)) mine = true;
    (day.groups||[]).forEach(g=>{
      if(g.costItem && isMine(g.costItem.id, g.costItem.defBookedBy)) mine = true;
      visibleItems(g).forEach(it=>{ if(isMine(it.id, it.defBookedBy)) mine = true; });
    });

    html += `<div class="card ticket ${mine?'mine':''}">
      <div class="stub">
        <div class="day-n">${dayNum(day.date)}</div>
        <div class="day-m">Ago 2026</div>
        <div class="dow">${day.dow.slice(0,3)}</div>
      </div>
      <div class="divider"><div class="dash"></div></div>
      <div class="ticket-body">${bodyHtml}</div>
    </div>`;
  });

  document.getElementById('tabContent').innerHTML = html;
}

/* ---------- TAB: CIUDADES ---------- */
function renderCiudades(){
  let html = `<h2 class="section-title">Ciudades y consejos de viaje</h2>
  <p class="section-sub">Un poco de historia y curiosidades de cada parada, más recomendaciones prácticas para moveros con soltura.</p>`;

  html += `<div class="card"><div style="padding:16px 18px;">
    <div class="block-title" style="margin-bottom:8px;">🧭 Recomendaciones generales del viaje</div>
    <ul class="tip-list">${TRAVEL_TIPS.map(t=>`<li>${t}</li>`).join('')}</ul>
  </div></div>`;

  CITY_GUIDE.forEach(c=>{
    html += `<div class="card"><div style="padding:16px 18px;">
      <div class="city-line" style="margin-bottom:2px;"><h3>${c.name}</h3></div>
      <div class="guide-kicker">Historia</div>
      <p class="guide-text">${c.history}</p>
      <div class="guide-kicker">Datos curiosos</div>
      <ul class="tip-list">${c.facts.map(f=>`<li>${f}</li>`).join('')}</ul>
      <div class="guide-kicker">Recomendaciones</div>
      <ul class="tip-list">${c.tips.map(t=>`<li>${t}</li>`).join('')}</ul>
    </div></div>`;
  });

  document.getElementById('tabContent').innerHTML = html;
}

/* ---------- TAB: HOTELES ---------- */
function renderHoteles(){
  let html = `<h2 class="section-title">Hoteles</h2>
  <p class="section-sub">Un resumen rápido de dónde dormimos cada noche.</p>`;

  DAYS.forEach(day=>{
    if(!day.hotel) return;
    const h = day.hotel;
    html += `<div class="card"><div class="hotel-row">
      <div class="hotel-icon">🛏️</div>
      <div style="flex:1;min-width:0;">
        <div class="hotel-name">${h.name}</div>
        <div class="hotel-meta">Check-in ${day.date.split('-').reverse().join('/')} · ${h.nights} noche${h.nights>1?'s':''} · ${day.city}</div>
        ${h.address ? `<div class="hotel-meta">${h.address}</div>`:''}
        ${h.link ? `<div class="hotel-meta"><a href="${h.link}" target="_blank" rel="noopener">Ver alojamiento ↗</a></div>`:''}
        ${editRow(h.id, h.defBookedBy, h.defCost)}
      </div>
    </div></div>`;
  });
  document.getElementById('tabContent').innerHTML = html;
}

/* ---------- TAB: GASTOS ---------- */
function chargeChipsHtml(){
  const allActive = expenseChargeSelection.size === PEOPLE.length;
  let html = `<div class="charge-picker">`;
  html += `<button type="button" class="charge-chip ${allActive?'active':''}" data-charge-toggle="__all__">Todos</button>`;
  PEOPLE.forEach(p=>{
    html += `<button type="button" class="charge-chip ${expenseChargeSelection.has(p)?'active':''}" data-charge-toggle="${p}">${p}</button>`;
  });
  html += `</div>`;
  return html;
}
function updateChargeChipsUI(){
  const allBtn = document.querySelector('[data-charge-toggle="__all__"]');
  if(allBtn) allBtn.classList.toggle('active', expenseChargeSelection.size === PEOPLE.length);
  PEOPLE.forEach(p=>{
    const btn = document.querySelector(`[data-charge-toggle="${p}"]`);
    if(btn) btn.classList.toggle('active', expenseChargeSelection.has(p));
  });
}

function renderGastos(){
  const today = new Date().toISOString().slice(0,10);
  let html = `<h2 class="section-title">Gastos del viaje</h2>
  <p class="section-sub">Registra aquí cualquier gasto suelto o liquidación entre vosotros. Elige quién lo pagó y a quién se le carga (uno, varios o todos) — se reparte a partes iguales entre los elegidos y se suma al saldo de la pestaña Presupuesto.</p>`;

  html += `<div class="card"><div style="padding:16px 18px;">
    <div class="block-title" style="margin-bottom:10px;">➕ Añadir gasto</div>
    <div class="expense-form" data-expense-form>
      <label class="ef-field ef-date"><span class="ef-label">Fecha</span>
        <input type="date" data-exp="date" value="${today}">
      </label>
      <label class="ef-field ef-concept"><span class="ef-label">Concepto</span>
        <input type="text" data-exp="concept" placeholder="p.ej. Taxi, Comida...">
      </label>
      <label class="ef-field ef-detail"><span class="ef-label">Detalle (opcional)</span>
        <input type="text" data-exp="detail" placeholder="Notas...">
      </label>
      <label class="ef-field ef-amount"><span class="ef-label">Importe</span>
        <input type="number" step="0.01" data-exp="amount" placeholder="€">
      </label>
      <label class="ef-field ef-paidby"><span class="ef-label">Pagado por</span>
        <select data-exp="paidBy">${whoOptions("")}</select>
      </label>
      <div class="ef-field ef-chargeto"><span class="ef-label">Cargado a</span>
        ${chargeChipsHtml()}
      </div>
      <label class="ef-field ef-settlement chk">
        <input type="checkbox" data-exp="isSettlement">
        <span>Es una liquidación / pago directo entre personas (no es un gasto del viaje)</span>
      </label>
      <button type="button" class="add-confirm ef-submit" data-submit-expense>Añadir gasto</button>
    </div>
    <p class="empty-note" style="padding:8px 2px 0;">💡 Para registrar que alguien te ha devuelto dinero (p.ej. Albertito paga 500 € a Mallo), añádelo pagado por Albertito, cargado solo a Mallo, y marca la casilla de liquidación — así no se cuenta como gasto nuevo del viaje, solo salda deuda.</p>
  </div></div>`;

  const expenses = getExpenses();
  if(!expenses.length){
    html += `<p class="empty-note">Todavía no hay gastos registrados.</p>`;
  } else {
    html += `<div class="card"><div style="padding:4px 18px;">`;
    expenses.forEach(e=>{
      const charged = (e.chargedTo && e.chargedTo.length) ? e.chargedTo : PEOPLE;
      const chargedLabel = charged.length === PEOPLE.length ? 'Todos' : charged.join(', ');
      html += `<div class="expense-row">
        <div class="expense-main">
          <div class="expense-concept">${escapeHtml(e.concept)}${e.isSettlement ? ' <span class="badge" style="background:var(--cinnabar-tint);color:var(--cinnabar-dark);">🔁 Liquidación</span>' : ''}</div>
          <div class="expense-meta">${e.date.split('-').reverse().join('/')}${e.detail ? ' · ' + escapeHtml(e.detail) : ''}</div>
          <div class="expense-meta">Pagado por <b>${e.paidBy||'sin asignar'}</b> · Cargado a <b>${escapeHtml(chargedLabel)}</b></div>
        </div>
        <div class="expense-side">
          <span class="mono expense-amt">${parseFloat(e.amount).toFixed(2)} €</span>
          <button class="remove-btn" data-remove-expense-id="${e.id}" title="Quitar gasto">🗑️</button>
        </div>
      </div>`;
    });
    html += `</div></div>`;
  }

  document.getElementById('tabContent').innerHTML = html;
}

/* ---------- TAB: PRESUPUESTO ---------- */
// Los vuelos quedan fuera: cada uno paga el suyo por su cuenta (mismo importe
// para los 4, ver FLIGHTS_PP_TOTAL), así que no forman parte del bote común
// que se reparte entre los 4 aquí abajo.
function collectAllCostItems(){
  const items = [];
  DAYS.forEach(day=>{
    if(day.hotel) items.push({id:day.hotel.id, defBookedBy:day.hotel.defBookedBy, defCost:day.hotel.defCost, label:`Hotel ${day.city}`});
    if(day.transport) items.push({id:day.transport.id, defBookedBy:day.transport.defBookedBy, defCost:day.transport.defCost, label:`Trayecto ${day.transport.route}`});
    (day.groups||[]).forEach(g=>{
      if(g.costItem) items.push({id:g.costItem.id, defBookedBy:g.costItem.defBookedBy, defCost:g.costItem.defCost, label:g.title});
      visibleItems(g).forEach(it=>{
        items.push({id:it.id, defBookedBy:it.defBookedBy, defCost:it.defCost, label:it.title});
      });
    });
  });
  return items;
}

function renderPresupuesto(){
  const items = collectAllCostItems();
  const { totalPaid, totalOwed, balance, grandTotal, unassignedPaid, expenses } = buildLedger();
  const maxVal = Math.max(1, ...Object.values(totalPaid).map(v=>Math.max(0,v)));
  const settlements = simplifyDebts(balance);

  let html = `<h2 class="section-title">Presupuesto</h2>
  <p class="section-sub">Cada partida del itinerario se reparte entre los 4. Cada gasto suelto de la pestaña <b>Gastos</b> se reparte solo entre a quien se lo hayáis cargado. Las liquidaciones (pagos directos entre vosotros) no cuentan como gasto del viaje, solo mueven saldo — por eso "aportado" baja para quien recibe un pago y sube para quien lo hace, hasta quedar igualado cuando todo está saldado. Los vuelos quedan fuera porque cada uno paga el suyo por su cuenta y sale igual para los 4 (<b class="mono">${FLIGHTS_PP_TOTAL.toFixed(2)} €</b> por persona).</p>`;

  html += `<div class="total-banner">
    <div><div class="lbl">Total registrado</div><div class="amt">${grandTotal.toFixed(2)} €</div></div>
    <div><div class="lbl">Sin pagador asignado</div><div class="amt" style="color:#fff;">${unassignedPaid.toFixed(2)} €</div></div>
  </div>`;

  html += `<div class="budget-grid">`;
  PEOPLE.forEach(p=>{
    const paid = totalPaid[p], owed = totalOwed[p], bal = balance[p];
    let balanceLabel, balanceClass;
    if(Math.abs(bal) < 0.01){ balanceLabel = 'En paz'; balanceClass = 'even'; }
    else if(bal > 0){ balanceLabel = `Le deben ${bal.toFixed(2)} €`; balanceClass = 'owed'; }
    else { balanceLabel = `Debe ${Math.abs(bal).toFixed(2)} €`; balanceClass = 'owes'; }
    html += `<div class="budget-card">
      <div class="budget-name">${p}</div>
      <div class="budget-amt">${paid.toFixed(2)} €</div>
      <div class="bar-wrap"><div class="bar-fill" style="width:${Math.max(0,(paid/maxVal*100)).toFixed(0)}%"></div></div>
      <div class="budget-sub">aportado (neto) por ${p} · le corresponde ${owed.toFixed(2)} €</div>
      <div class="budget-balance ${balanceClass}">${balanceLabel}</div>
    </div>`;
  });
  html += `</div>`;

  html += `<h3 style="font-family:'Noto Serif SC',serif;font-size:16px;margin:22px 0 10px;">Quién debe a quién</h3>`;
  if(!settlements.length){
    html += `<p class="empty-note">Todo saldado — nadie debe nada a nadie. 🎉</p>`;
  } else {
    html += `<div class="card"><div style="padding:4px 18px;">`;
    settlements.forEach(t=>{
      html += `<div class="settle-row">
        <div class="settle-people"><b>${t.from}</b><span class="settle-arrow">→</span><b>${t.to}</b></div>
        <div style="display:flex;gap:10px;align-items:center;">
          <span class="mono settle-amt">${t.amount.toFixed(2)} €</span>
          <button type="button" class="add-confirm" style="padding:5px 10px;font-size:11.5px;" data-settle-from="${t.from}" data-settle-to="${t.to}" data-settle-amount="${t.amount.toFixed(2)}">Marcar como pagado</button>
        </div>
      </div>`;
    });
    html += `</div></div>`;
  }

  html += `<h3 style="font-family:'Noto Serif SC',serif;font-size:16px;margin:22px 0 10px;">Detalle de partidas del itinerario</h3>`;
  items.forEach(it=>{
    const bookedBy = fieldVal(it.id,'bookedBy', it.defBookedBy||"");
    const cost = fieldVal(it.id,'cost', it.defCost!==undefined&&it.defCost!==null?it.defCost:"");
    if(cost==="" && !bookedBy) return;
    html += `<div class="card"><div style="padding:12px 16px;display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap;">
      <div style="font-size:13.5px;font-weight:600;">${escapeHtml(it.label)}</div>
      <div style="display:flex;gap:10px;align-items:center;">
        <span class="badge" style="background:var(--porcelain-2);color:var(--ink-soft);">${bookedBy||'sin asignar'}</span>
        <span class="mono" style="font-weight:700;">${cost!==""?parseFloat(cost).toFixed(2)+' €':'—'}</span>
      </div>
    </div></div>`;
  });

  if(expenses.length){
    html += `<h3 style="font-family:'Noto Serif SC',serif;font-size:16px;margin:22px 0 10px;">Gastos sueltos registrados</h3>`;
    expenses.forEach(e=>{
      const charged = (e.chargedTo && e.chargedTo.length) ? e.chargedTo : PEOPLE;
      const chargedLabel = charged.length === PEOPLE.length ? 'Todos' : charged.join(', ');
      html += `<div class="card"><div style="padding:12px 16px;display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap;">
        <div>
          <div style="font-size:13.5px;font-weight:600;">${escapeHtml(e.concept)} <span class="mono" style="font-weight:400;color:var(--ink-soft);font-size:12px;">${e.date.split('-').reverse().join('/')}</span>${e.isSettlement ? ' <span class="badge" style="background:var(--cinnabar-tint);color:var(--cinnabar-dark);">🔁 Liquidación</span>' : ''}</div>
          <div style="font-size:12px;color:var(--ink-soft);margin-top:2px;">Pagado por <b>${e.paidBy||'sin asignar'}</b> · Cargado a <b>${escapeHtml(chargedLabel)}</b></div>
        </div>
        <span class="mono" style="font-weight:700;">${parseFloat(e.amount).toFixed(2)} €</span>
      </div></div>`;
    });
  }

  document.getElementById('tabContent').innerHTML = html;
}

/* =========================================================
   TABS
   ========================================================= */
const TABS = [
  {id:'resumen', label:'Resumen', render:renderResumen},
  {id:'vuelos', label:'Vuelos', render:renderVuelos},
  {id:'ciudades', label:'Ciudades', render:renderCiudades},
  {id:'itinerario', label:'Itinerario', render:renderItinerario},
  {id:'hoteles', label:'Hoteles', render:renderHoteles},
  {id:'gastos', label:'Gastos', render:renderGastos},
  {id:'presupuesto', label:'Presupuesto', render:renderPresupuesto},
];
let activeTab = 'itinerario';

function renderTabbar(){
  document.getElementById('tabbar').innerHTML = TABS.map(t=>
    `<button class="tab-btn ${t.id===activeTab?'active':''}" data-tab="${t.id}">${t.label}</button>`
  ).join('');
}
function renderCurrentTab(){
  const tab = TABS.find(t=>t.id===activeTab);
  if(tab) tab.render();
}
function renderWhoButtons(){
  document.getElementById('whoButtons').outerHTML = `<div id="whoButtons" style="display:flex;gap:8px;flex-wrap:wrap;">` +
    PEOPLE.map(p=>`<button class="who-btn ${p===WHOAMI?'active':''}" data-who="${p}">${p}</button>`).join('') +
  `</div>`;
}
function renderConnStatus(){
  const el = document.getElementById('connStatus');
  if(!el) return;
  if(!FIREBASE_READY){
    el.className = 'conn-status offline';
    el.innerHTML = `<span class="conn-dot"></span> Sin backend configurado`;
    return;
  }
  el.className = 'conn-status ' + (connected ? 'online' : 'offline');
  el.innerHTML = `<span class="conn-dot"></span> ${connected ? 'Sincronizado con el grupo' : 'Sin conexión — reintentando'}`;
}
function renderStorageBanner(){
  document.getElementById('storageBanner').innerHTML = FIREBASE_READY ? '' :
    `<div class="storage-banner">⚠️ El backend compartido (Firebase) todavía no está configurado. Los cambios que hagas ahora se guardan solo en <b>este dispositivo</b> y no los verán los demás. Edita <code>firebase-config.js</code> con los datos de vuestro proyecto de Firebase y vuelve a publicar — instrucciones en el <code>README.md</code>.</div>`;
}

/* ---------- Countdown ---------- */
function updateCountdown(){
  const target = new Date("2026-08-18T15:30:00+02:00").getTime();
  const now = Date.now();
  const diff = target - now;
  const days = Math.max(0, Math.floor(diff/86400000));
  const hours = Math.max(0, Math.floor((diff%86400000)/3600000));
  document.getElementById('cd-days').textContent = diff>0 ? days : 0;
  document.getElementById('cd-hours').textContent = diff>0 ? hours : 0;
}

/* =========================================================
   EVENTS
   ========================================================= */
document.addEventListener('click', (e)=>{
  const tabBtn = e.target.closest('[data-tab]');
  if(tabBtn){
    activeTab = tabBtn.dataset.tab;
    renderTabbar();
    renderCurrentTab();
    window.scrollTo({top:0, behavior:'smooth'});
    return;
  }
  const whoBtn = e.target.closest('[data-who]');
  if(whoBtn){
    const name = whoBtn.dataset.who;
    saveWhoAmI(name === WHOAMI ? "" : name);
    return;
  }
  const removeBtn = e.target.closest('[data-remove-id]');
  if(removeBtn){
    if(confirm('¿Quitar esta actividad para todos?')){
      removeActivity(removeBtn.dataset.removeId);
    }
    return;
  }
  const toggleAddBtn = e.target.closest('[data-toggle-add]');
  if(toggleAddBtn){
    const gId = toggleAddBtn.dataset.toggleAdd;
    if(openAddForms.has(gId)) openAddForms.delete(gId); else openAddForms.add(gId);
    renderCurrentTab();
    return;
  }
  const submitAddBtn = e.target.closest('[data-submit-add]');
  if(submitAddBtn){
    const gId = submitAddBtn.dataset.submitAdd;
    const form = document.querySelector(`[data-group-form="${gId}"]`);
    const title = form.querySelector('.add-title').value;
    const dur = form.querySelector('.add-dur').value;
    addCustomActivity(gId, title, dur);
    return;
  }
  const removeExpenseBtn = e.target.closest('[data-remove-expense-id]');
  if(removeExpenseBtn){
    if(confirm('¿Quitar este gasto para todos?')){
      removeExpense(removeExpenseBtn.dataset.removeExpenseId);
    }
    return;
  }
  const submitExpenseBtn = e.target.closest('[data-submit-expense]');
  if(submitExpenseBtn){
    submitExpenseForm();
    return;
  }
  const chargeChipBtn = e.target.closest('[data-charge-toggle]');
  if(chargeChipBtn){
    const person = chargeChipBtn.dataset.chargeToggle;
    if(person === '__all__'){
      if(expenseChargeSelection.size === PEOPLE.length) expenseChargeSelection.clear();
      else PEOPLE.forEach(p=>expenseChargeSelection.add(p));
    } else {
      if(expenseChargeSelection.has(person)) expenseChargeSelection.delete(person);
      else expenseChargeSelection.add(person);
    }
    updateChargeChipsUI();
    return;
  }
  const settleBtn = e.target.closest('[data-settle-from]');
  if(settleBtn){
    const from = settleBtn.dataset.settleFrom;
    const to = settleBtn.dataset.settleTo;
    const amount = settleBtn.dataset.settleAmount;
    if(confirm(`¿Registrar que ${from} ha pagado ${amount} € a ${to}?`)){
      addExpense(new Date().toISOString().slice(0,10), `Liquidación ${from} → ${to}`, '', amount, from, [to], true);
    }
    return;
  }
});

function submitExpenseForm(){
  const form = document.querySelector('[data-expense-form]');
  if(!form) return;
  const date = form.querySelector('[data-exp="date"]').value;
  const concept = form.querySelector('[data-exp="concept"]').value;
  const detail = form.querySelector('[data-exp="detail"]').value;
  const amount = form.querySelector('[data-exp="amount"]').value;
  const paidBy = form.querySelector('[data-exp="paidBy"]').value;
  const isSettlement = form.querySelector('[data-exp="isSettlement"]').checked;
  addExpense(date, concept, detail, amount, paidBy, Array.from(expenseChargeSelection), isSettlement);
}

document.addEventListener('keydown', (e)=>{
  if(e.key !== 'Enter') return;
  const groupForm = e.target.closest('[data-group-form]');
  if(groupForm && (e.target.classList.contains('add-title') || e.target.classList.contains('add-dur'))){
    e.preventDefault();
    const gId = groupForm.dataset.groupForm;
    const title = groupForm.querySelector('.add-title').value;
    const dur = groupForm.querySelector('.add-dur').value;
    addCustomActivity(gId, title, dur);
    return;
  }
  const expenseForm = e.target.closest('[data-expense-form]');
  if(expenseForm && e.target.tagName === 'INPUT'){
    e.preventDefault();
    submitExpenseForm();
  }
});

document.addEventListener('change', (e)=>{
  const el = e.target;
  if(!el.dataset || !el.dataset.field) return;
  const id = el.dataset.id;
  const field = el.dataset.field;
  const value = el.type === 'checkbox' ? el.checked : el.value;
  setField(id, field, value);
  renderCurrentTab();
});

/* =========================================================
   INIT
   ========================================================= */
(function init(){
  renderStorageBanner();
  renderTabbar();
  renderWhoButtons();
  renderConnStatus();
  renderCurrentTab();
  initFirebase();
  updateCountdown();
  setInterval(updateCountdown, 60000);
})();
