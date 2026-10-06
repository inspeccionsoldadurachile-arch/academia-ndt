// @ts-nocheck
// Contenido educativo (borrador pendiente de validación técnica por Francisco).
/* ---------- Ilustraciones (esquemas; se complementarán con fotos reales) ---------- */
const T=(x,y,t,o="")=>`<text x="${x}" y="${y}" font-family="IBM Plex Mono,monospace" font-size="10" fill="var(--ink)" ${o}>${t}</text>`;
const fig=(svg,cap)=>`<figure class="ill">${svg}<figcaption>${cap}</figcaption></figure>`;
const mini=(extra,cap="M30 60 Q75 35 120 60 Z")=>`<svg viewBox="0 0 150 100" role="img"><rect x="0" y="60" width="150" height="35" fill="var(--metal)"/><path d="${cap}" fill="var(--weld)" stroke="var(--ink)" stroke-width="1.2"/><line x1="0" y1="60" x2="150" y2="60" stroke="var(--ink)" stroke-width="1.2"/>${extra}</svg>`;
const ILL={
  vtCond:`<svg viewBox="0 0 320 195" role="img" aria-label="Ojo a 600 mm o menos, ángulo de 30 grados o más y 1000 lux">
    <rect x="10" y="160" width="300" height="22" fill="var(--metal)"/><line x1="10" y1="160" x2="310" y2="160" stroke="var(--ink)" stroke-width="1.5"/>
    <path d="M200 160 Q220 146 240 160 Z" fill="var(--weld)" stroke="var(--ink)" stroke-width="1.2"/>
    <ellipse cx="60" cy="40" rx="18" ry="10" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.5"/><circle cx="64" cy="42" r="5" fill="var(--ink)"/>
    <line x1="66" y1="45" x2="216" y2="157" stroke="var(--steel)" stroke-width="2" stroke-dasharray="6 4"/>
    ${T(150,92,"≤ 600 mm",'font-weight="600"')}
    <path d="M176 160 A40 40 0 0 1 184 136" fill="none" stroke="var(--dye)" stroke-width="2.5"/>
    ${T(120,152,"≥ 30°",'font-weight="600" fill="var(--dye)"')}
    <path d="M262 22 h28 l-6 14 h-16 z" fill="var(--steel)"/>
    <path d="M268 38 L232 150 M276 38 L262 150 M284 38 L292 150" stroke="var(--dye)" stroke-width="1.2" stroke-dasharray="3 4"/>
    ${T(210,18,"≥ 1000 lux",'font-weight="600"')}
  </svg>`,
  discont:`<div class="illgrid">
    ${fig(mini(`<path d="M114 60 Q121 70 130 60" fill="var(--bg)" stroke="var(--dye)" stroke-width="2.5"/>`),"Socavación")}
    ${fig(mini(`<path d="M118 60 Q136 52 142 61 Q132 63 118 60 Z" fill="var(--weld)" stroke="var(--ink)" stroke-width="1.2"/><line x1="121" y1="61" x2="140" y2="61" stroke="var(--dye)" stroke-width="2.5"/>`),"Solapamiento")}
    ${fig(mini(`<circle cx="58" cy="52" r="3.5" fill="var(--bg)" stroke="var(--dye)" stroke-width="2"/><circle cx="74" cy="48" r="2.5" fill="var(--bg)" stroke="var(--dye)" stroke-width="2"/><circle cx="90" cy="51" r="3.5" fill="var(--bg)" stroke="var(--dye)" stroke-width="2"/>`),"Porosidad")}
    ${fig(mini(`<path d="M56 50 L64 54 L71 47 L79 52 L86 46 L94 51" fill="none" stroke="var(--dye)" stroke-width="2.5" stroke-linecap="round"/>`),"Grieta")}
    ${fig(mini(`<path d="M30 60 Q75 74 120 60 Z" fill="var(--bg)" stroke="var(--dye)" stroke-width="2.5"/>`,"M30 60 L120 60 Z"),"Falta de llenado")}
    ${fig(mini(`<line x1="138" y1="60" x2="138" y2="22" stroke="var(--dye)" stroke-width="2"/><line x1="132" y1="22" x2="144" y2="22" stroke="var(--dye)" stroke-width="2"/>`,"M30 60 Q75 -14 120 60 Z"),"Refuerzo excesivo")}
  </div>`,
  ptCap:`<svg viewBox="0 0 320 150" role="img" aria-label="El penetrante entra en la grieta y el revelador lo extrae">
    <rect x="10" y="50" width="140" height="70" fill="var(--metal)"/><rect x="10" y="44" width="140" height="6" fill="var(--dye)" opacity=".75"/>
    <path d="M74 50 L80 110 L86 50 Z" fill="var(--dye)"/><path d="M80 34 v8 m-4 -4 l4 4 4 -4" stroke="var(--dye)" stroke-width="2" fill="none"/>
    ${T(10,140,"1. El penetrante entra")}
    <rect x="170" y="50" width="140" height="70" fill="var(--metal)"/><rect x="170" y="40" width="140" height="10" fill="var(--dev)" stroke="var(--line)"/>
    <path d="M234 50 L240 110 L246 50 Z" fill="var(--dye)"/><ellipse cx="240" cy="42" rx="16" ry="6" fill="var(--dye)"/>
    ${T(170,140,"2. El revelador lo saca")}
  </svg>`,
  ptSteps:`<svg viewBox="0 0 320 120" role="img" aria-label="Aplicar penetrante, remover exceso, aplicar revelador, inspeccionar">
    ${[0,1,2,3].map(i=>{const x=i*80+8;return `<rect x="${x}" y="58" width="64" height="22" fill="var(--metal)"/><path d="M${x+29} 58 L${x+32} 78 L${x+35} 58 Z" fill="var(--dye)"/>`}).join("")}
    <rect x="8" y="53" width="64" height="5" fill="var(--dye)" opacity=".75"/><circle cx="28" cy="38" r="3" fill="var(--dye)"/><circle cx="44" cy="30" r="3" fill="var(--dye)"/><circle cx="54" cy="42" r="3" fill="var(--dye)"/>
    <path d="M98 50 l40 -14 l6 10 l-40 14 z" fill="var(--steel)"/>
    <rect x="168" y="50" width="64" height="8" fill="var(--dev)" stroke="var(--line)"/><circle cx="182" cy="32" r="2" fill="var(--muted)"/><circle cx="200" cy="26" r="2" fill="var(--muted)"/><circle cx="216" cy="34" r="2" fill="var(--muted)"/>
    <rect x="248" y="50" width="64" height="8" fill="var(--dev)" stroke="var(--line)"/><ellipse cx="280" cy="52" rx="9" ry="4" fill="var(--dye)"/>
    <ellipse cx="280" cy="26" rx="12" ry="7" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.5"/><circle cx="280" cy="27" r="3.5" fill="var(--ink)"/>
    ${T(8,104,"Aplicar")}${T(88,104,"Remover")}${T(168,104,"Revelar")}${T(248,104,"Inspeccionar")}
  </svg>`,
  ptInd:`<svg viewBox="0 0 320 130" role="img" aria-label="Indicación lineal frente a indicación redondeada">
    <rect x="20" y="50" width="120" height="8" rx="4" fill="var(--dye)"/>
    <line x1="20" y1="38" x2="140" y2="38" stroke="var(--ink)"/><line x1="20" y1="33" x2="20" y2="43" stroke="var(--ink)"/><line x1="140" y1="33" x2="140" y2="43" stroke="var(--ink)"/>${T(76,30,"L")}
    <line x1="150" y1="50" x2="150" y2="58" stroke="var(--ink)"/>${T(155,58,"W")}
    ${T(20,90,"L &gt; 3W",'font-weight="600"')}${T(20,106,"Lineal")}
    <ellipse cx="250" cy="54" rx="14" ry="10" fill="var(--dye)"/>
    ${T(200,90,"L ≤ 3W",'font-weight="600"')}${T(200,106,"Redondeada")}
  </svg>`
};


/* ---------- Ilustraciones de Francisco (lápiz y acuarela) ---------- */
const IMG=(f,alt)=>`<img src="img/${f}.jpg" alt="${alt}" loading="lazy" width="640" height="640">`;
const GAL=[
  {g:"Superficiales: se ven con VT y se confirman con PT o MT",items:[
    ["grieta-longitudinal","Grieta longitudinal","Paralela al eje del cordón."],
    ["grieta-transversal","Grieta transversal","Perpendicular al eje del cordón. Puede seguir hacia el metal base."],
    ["grieta-crater","Grieta de cráter","En el cráter final, a menudo en estrella. Aparece al cortar el arco sin rellenar el cráter."],
    ["porosidad-superficial","Porosidad superficial","Poros abiertos en la cara del cordón por gas atrapado."],
    ["perforacion","Perforación","Agujero que atraviesa la soldadura por exceso de calor."]]},
  {g:"En la raíz: visible por el reverso; si no hay acceso, UT o RT",items:[
    ["falta-penetracion","Falta de penetración","El metal de soldadura no llega a la raíz de la junta."]]},
  {g:"Internas: requieren UT o RT",items:[
    ["inclusion-escoria","Inclusión de escoria","Escoria atrapada, típica de una mala limpieza entre pasadas."],
    ["porosidad-interna","Porosidad interna","Poros dentro del cordón. En RT se ven como manchas oscuras redondeadas."]]}
];
const galleryBody=()=>GAL.map(sec=>`<div class="eyebrow">${sec.g}</div><div class="photos">${sec.items.map(([f,t,d])=>`<figure class="photo">${IMG(f,t)}<figcaption><b>${t}</b><span>${d}</span></figcaption></figure>`).join("")}</div>`).join("");

const COURSES = {
  VT:{name:"Inspección visual",code:"VT",cls:"",lessons:[
    {t:"Qué es la inspección visual",min:3,body:`<p>La inspección visual (VT) es el primer ensayo que se hace y el más usado. Se aplica antes, durante y después de soldar.</p><p>Antes de soldar se revisa la preparación de la junta (bisel, separación de raíz, limpieza). Durante, se controlan los parámetros y la limpieza entre pasadas. Después se revisa la soldadura terminada.</p><div class="key"><b>Clave:</b> muchos problemas que encontraría un ensayo más caro se pueden evitar con una buena VT antes y durante la soldadura.</div>`},
    {t:"Condiciones para inspeccionar",min:4,body:`${fig(ILL.vtCond,"Condiciones mínimas · ASME V, Art. 9")}<p>Para una inspección visual directa, ASME Sección V, Artículo 9, pide:</p><ul><li>Iluminación mínima de <b>1000 lux</b> en la superficie.</li><li>Ojo a no más de <b>600 mm</b> de la superficie.</li><li>Ángulo de visión no menor de <b>30°</b> respecto de la superficie.</li></ul><p>Si no se cumplen, se puede usar inspección visual remota (espejos, boroscopio, cámara), siempre que se demuestre una resolución equivalente.</p><div class="key"><b>Ejemplo práctico:</b> dentro de un estanque con poca luz, lleva una linterna y verifica el nivel con un luxómetro antes de empezar.</div>`},
    {t:"Discontinuidad o defecto",min:3,body:`<p>Una <b>discontinuidad</b> es cualquier interrupción en la estructura normal del material, como un poro o una socavación.</p><p>Un <b>defecto</b> es una discontinuidad que supera el criterio de aceptación del código o especificación aplicable. Por eso un mismo poro puede ser aceptable en una obra y rechazable en otra.</p><div class="key"><b>Regla:</b> el inspector informa discontinuidades y las evalúa contra el código del contrato. No todo lo que se ve es defecto.</div>`},
    {t:"Discontinuidades superficiales típicas",min:5,body:`${ILL.discont}<ul><li><b>Socavación:</b> canal en el metal base junto al pie de la soldadura que no fue rellenado.</li><li><b>Solapamiento:</b> metal de soldadura que rebalsa sobre el metal base sin fundirse con él.</li><li><b>Porosidad:</b> cavidades redondeadas por gas atrapado.</li><li><b>Grieta:</b> discontinuidad tipo fisura, con punta aguda. Es la más severa.</li><li><b>Falta de llenado:</b> la cara de la soldadura queda bajo la superficie del metal base.</li><li><b>Refuerzo excesivo:</b> sobremonta mayor a la permitida.</li></ul>`},
    {t:"Galería de discontinuidades",min:5,body:`<p>Ilustraciones de discontinuidades reales, agrupadas según el método que las detecta.</p>${galleryBody()}`}
  ]},
  PT:{name:"Líquidos penetrantes",code:"PT",cls:"pt",lessons:[
    {t:"Cómo funciona el PT",min:3,body:`${fig(ILL.ptCap,"Capilaridad: así se forma la indicación")}<p>El ensayo de líquidos penetrantes (PT) aprovecha la <b>capilaridad</b>: un líquido de baja tensión superficial entra en las discontinuidades abiertas a la superficie.</p><p>Luego un revelador "saca" ese líquido y muestra una indicación visible, más ancha que la discontinuidad real.</p><div class="key"><b>Límite:</b> solo detecta discontinuidades <b>abiertas a la superficie</b> y no sirve en materiales porosos.</div>`},
    {t:"Los pasos del ensayo",min:4,body:`${fig(ILL.ptSteps,"Secuencia básica de PT")}<ul><li>Limpieza previa y secado.</li><li>Aplicación del penetrante.</li><li>Tiempo de penetración, definido en el procedimiento.</li><li>Remoción del exceso de penetrante.</li><li>Aplicación del revelador.</li><li>Inspección e interpretación.</li><li>Limpieza final.</li></ul><div class="key"><b>Error común:</b> remover el exceso con solvente rociado directo sobre la pieza. Así se lava el penetrante de dentro de la discontinuidad. Se usa un paño humedecido.</div>`},
    {t:"Tipos de penetrante",min:3,body:`<p>Por tipo de tinte:</p><ul><li><b>Tipo I:</b> fluorescente, se inspecciona con luz UV-A en un área oscura.</li><li><b>Tipo II:</b> visible (rojo), se inspecciona con luz blanca.</li></ul><p>Por método de remoción:</p><ul><li><b>A:</b> lavable con agua.</li><li><b>B:</b> postemulsificable lipofílico.</li><li><b>C:</b> removible con solvente.</li><li><b>D:</b> postemulsificable hidrofílico.</li></ul>`},
    {t:"Interpretar indicaciones",min:4,body:`<p>Según ASME Sección V y VIII:</p>${fig(ILL.ptInd,"Regla de 3 veces el ancho")}<ul><li><b>Indicación lineal:</b> su largo es mayor que 3 veces su ancho. Suele corresponder a grietas o falta de fusión.</li><li><b>Indicación redondeada:</b> circular o elíptica, con largo igual o menor a 3 veces su ancho. Suele corresponder a poros.</li></ul><p>La interpretación final se hace entre 10 y 60 minutos después de aplicar el revelador (ASME V, Art. 6).</p>`}
  ]},
  MT:{name:"Partículas magnéticas",code:"MT",locked:true,lessons:[]},
  UT:{name:"Ultrasonido",code:"UT",locked:true,lessons:[]},
  RT:{name:"Radiografía",code:"RT",locked:true,lessons:[]}
};

const QUIZ = {
  VT:[
    {q:"¿Cuál es la iluminación mínima para VT directa según ASME V, Art. 9?",o:["300 lux","500 lux","1000 lux","2000 lux"],a:2,e:"ASME V, Art. 9 exige al menos 1000 lux en la superficie inspeccionada."},
    {q:"¿Qué diferencia a un defecto de una discontinuidad?",o:["El defecto siempre es una grieta","El defecto supera el criterio de aceptación","La discontinuidad solo es interna","No hay diferencia"],a:1,e:"Toda discontinuidad que supera el criterio de aceptación del código aplicable es un defecto."},
    {q:"Canal en el metal base junto al pie de la soldadura, sin rellenar:",o:["Solapamiento","Socavación","Falta de llenado","Porosidad"],a:1,e:"Eso es socavación. La falta de llenado está en la cara de la soldadura, no en el metal base."},
    {q:"¿Cuándo se hace la inspección visual?",o:["Solo al terminar","Solo antes de soldar","Antes, durante y después de soldar","Solo si falla otro ensayo"],a:2,e:"La VT acompaña todo el proceso. Detectar problemas en la preparación de la junta ahorra reparaciones."},
    {q:"¿Cuál es la discontinuidad más severa en general?",o:["Salpicadura","Porosidad aislada","Grieta","Refuerzo excesivo"],a:2,e:"La grieta tiene punta aguda que concentra esfuerzos y puede propagarse. La mayoría de los códigos no la acepta."}
  ],
  PT:[
    {q:"¿Qué fenómeno físico usa el ensayo de líquidos penetrantes?",o:["Magnetismo","Capilaridad","Reflexión del sonido","Absorción de radiación"],a:1,e:"El penetrante entra en las discontinuidades por capilaridad."},
    {q:"¿Qué discontinuidades detecta el PT?",o:["Solo internas","Abiertas a la superficie","Subsuperficiales","Todas"],a:1,e:"El penetrante solo puede entrar en lo que está abierto a la superficie."},
    {q:"Un penetrante Tipo I es:",o:["Visible rojo","Fluorescente","Lavable con agua","Removible con solvente"],a:1,e:"Tipo I es fluorescente y se inspecciona con luz UV-A. El Tipo II es el visible rojo."},
    {q:"Una indicación de 6 mm de largo y 1 mm de ancho es:",o:["Redondeada","Lineal","No relevante","Falsa"],a:1,e:"Su largo (6 mm) es mayor que 3 veces su ancho (3 mm), así que es lineal."},
    {q:"¿Cuál es el error al remover el exceso con método C?",o:["Usar paño seco primero","Rociar solvente directo sobre la pieza","Secar antes del revelador","Limpiar en una sola dirección"],a:1,e:"Rociar solvente directo lava el penetrante de dentro de la discontinuidad. Se usa un paño humedecido."}
  ]
};

/* Práctica visual: esquemas SVG; en la app real irán fotos propias de Francisco */
const weldBase = (extra) => `<svg viewBox="0 0 320 170" role="img"><rect x="0" y="110" width="320" height="60" fill="var(--metal)"/><path d="M60 110 Q160 70 260 110 Z" fill="var(--weld)"/><path d="M60 110 Q160 70 260 110" fill="none" stroke="var(--ink)" stroke-width="1.5"/><line x1="0" y1="110" x2="320" y2="110" stroke="var(--ink)" stroke-width="1.5"/>${extra}<text x="12" y="160" font-family="IBM Plex Mono,monospace" font-size="10" fill="var(--muted)">CORTE TRANSVERSAL (ESQUEMA)</text></svg>`;
const PRACTICE = [
  {m:"VT",img:IMG("grieta-transversal","Cordón con una grieta"),q:"¿Qué discontinuidad ves?",o:["Grieta longitudinal","Grieta transversal","Socavación","Falta de fusión"],a:1,e:"La grieta cruza el cordón en forma perpendicular a su eje: grieta transversal."},
  {m:"VT",img:IMG("grieta-crater","Final de un cordón con fisuras"),q:"Fisuras en estrella al final del cordón. ¿Qué son?",o:["Porosidad","Grieta de cráter","Perforación","Salpicadura"],a:1,e:"Es una grieta de cráter. Se previene rellenando el cráter antes de cortar el arco."},
  {m:"VT",img:IMG("perforacion","Cordón con un agujero"),q:"¿Qué discontinuidad muestra el cordón?",o:["Porosidad superficial","Perforación","Falta de llenado","Grieta"],a:1,e:"Es una perforación: el exceso de calor fundió el material de lado a lado."},
  {m:"RT",img:IMG("inclusion-escoria","Corte de soldadura con inclusiones oscuras"),q:"Inclusiones alargadas y oscuras dentro del cordón. ¿Qué son y con qué método se detectan?",o:["Porosidad, con VT","Inclusión de escoria, con UT o RT","Grieta, con PT","Falta de llenado, con VT"],a:1,e:"Es escoria atrapada dentro del cordón. Como es interna, se detecta con UT o RT, no con VT ni PT."},
  {m:"VT",img:IMG("falta-penetracion","Junta en V vista en corte"),q:"La raíz de la junta quedó sin fundir. ¿Qué discontinuidad es?",o:["Falta de penetración","Socavación","Solapamiento","Refuerzo excesivo"],a:0,e:"El metal de soldadura no llegó a la raíz: falta de penetración."},
  {m:"VT",svg:weldBase(`<path d="M248 110 Q256 122 268 110" fill="var(--bg)" stroke="var(--dye)" stroke-width="2.5"/><circle cx="258" cy="116" r="22" fill="none" stroke="var(--dye)" stroke-dasharray="4 3"/>`),q:"¿Qué discontinuidad marca el círculo?",o:["Socavación","Solapamiento","Falta de llenado","Grieta"],a:0,e:"Hay un canal en el metal base junto al pie de la soldadura: socavación."},
  {m:"VT",svg:weldBase(`<path d="M260 110 Q285 104 292 111 Q280 116 260 110 Z" fill="var(--weld)" stroke="var(--ink)" stroke-width="1.5"/><line x1="262" y1="111" x2="290" y2="111" stroke="var(--dye)" stroke-width="2.5"/><circle cx="278" cy="110" r="22" fill="none" stroke="var(--dye)" stroke-dasharray="4 3"/>`),q:"El metal de soldadura rebalsa sin fundirse con el metal base. ¿Qué es?",o:["Socavación","Refuerzo excesivo","Solapamiento","Porosidad"],a:2,e:"Metal de aporte sobre el metal base sin fusión: solapamiento (overlap)."},
  {m:"VT",svg:weldBase(`<circle cx="130" cy="96" r="4" fill="var(--bg)" stroke="var(--dye)" stroke-width="2"/><circle cx="150" cy="90" r="3" fill="var(--bg)" stroke="var(--dye)" stroke-width="2"/><circle cx="172" cy="94" r="4.5" fill="var(--bg)" stroke="var(--dye)" stroke-width="2"/><circle cx="190" cy="99" r="3" fill="var(--bg)" stroke="var(--dye)" stroke-width="2"/>`),q:"Cavidades redondeadas en la cara de la soldadura:",o:["Grietas","Porosidad superficial","Inclusión de escoria","Socavación"],a:1,e:"Cavidades redondeadas por gas atrapado: porosidad."},
  {m:"PT",svg:`<svg viewBox="0 0 320 170" role="img"><rect x="0" y="0" width="320" height="170" fill="var(--surface)"/><rect x="40" y="70" width="240" height="34" rx="6" fill="var(--bg)" stroke="var(--line)"/><path d="M90 88 L130 84 L170 89 L215 85" stroke="var(--dye)" stroke-width="3" fill="none" stroke-linecap="round"/><text x="12" y="160" font-family="IBM Plex Mono,monospace" font-size="10" fill="var(--muted)">VISTA SUPERIOR · REVELADOR BLANCO · PT TIPO II</text></svg>`,q:"Indicación roja de 32 mm de largo y 1 mm de ancho. ¿Cómo se clasifica?",o:["Redondeada","Lineal","No relevante","Falsa por exceso de revelador"],a:1,e:"Largo mayor que 3 veces el ancho: lineal. Puede corresponder a una grieta y se evalúa según el código."},
  {m:"PT",svg:`<svg viewBox="0 0 320 170" role="img"><rect x="0" y="0" width="320" height="170" fill="var(--surface)"/><rect x="40" y="70" width="240" height="34" rx="6" fill="var(--bg)" stroke="var(--line)"/><circle cx="110" cy="87" r="5" fill="var(--dye)"/><circle cx="160" cy="84" r="4" fill="var(--dye)"/><ellipse cx="205" cy="89" rx="6" ry="4" fill="var(--dye)"/><text x="12" y="160" font-family="IBM Plex Mono,monospace" font-size="10" fill="var(--muted)">VISTA SUPERIOR · REVELADOR BLANCO · PT TIPO II</text></svg>`,q:"Tres manchas circulares y elípticas. ¿Qué tipo de indicación son?",o:["Lineales","Redondeadas","Falta de fusión","Grieta ramificada"],a:1,e:"Largo igual o menor a 3 veces el ancho: indicaciones redondeadas, típicas de porosidad."}
];

export interface Course { name: string; code: string; locked?: boolean; lessons: { t: string; min: number; body: string }[] }
export interface Q { m?: string; q: string; o: string[]; a: number; e: string; img?: string; svg?: string }
const _C: Record<string, Course> = COURSES;
const _Q: Record<string, Q[]> = QUIZ;
const _P: Q[] = PRACTICE;
export { _C as COURSES, _Q as QUIZ, _P as PRACTICE, GAL };
