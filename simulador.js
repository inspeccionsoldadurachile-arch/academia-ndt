/* Simulador de examen: práctica, examen con tiempo y repaso de errores.
   Banco gratis: data/simulador-gratis.json (muestra pública).
   Banco completo: se obtiene con una clave de compra (SIM_CONFIG.unlockUrl) y se guarda en este navegador.
   Las preguntas pagadas NO deben subirse a este repositorio público. */
const SIM_CONFIG = {
  unlockUrl: "",   // servicio que valida la clave de Payhip y entrega el banco (paso pendiente)
  buyUrl: "",      // página de venta en Payhip (cuando exista)
  totals: {VT:149, PT:151, MT:70, UT:70, RT:70},
  practiceSize: 10, examSize: 20, secPerQuestion: 90, passPct: 70
};
const SIM_METHODS = {VT:"Inspección visual", PT:"Líquidos penetrantes", MT:"Partículas magnéticas", UT:"Ultrasonido", RT:"Radiografía"};
const SIM_BANK_KEY = "ndt-banco-v1";
const BANK = {free: [], full: null};

S.sim = Object.assign({met: "VT", lvl: "todos", stats: {}, wrong: {}}, S.sim || {});
try { const b = localStorage.getItem(SIM_BANK_KEY); if (b) BANK.full = JSON.parse(b); } catch (e) {}
if (window.SIM_PREVIEW_BANK) BANK.full = window.SIM_PREVIEW_BANK;
fetch("data/simulador-gratis.json").then(r => r.json()).then(d => { BANK.free = d; if (view.tab === "sim" && !view.sim) render(); }).catch(() => {});

const simPremium = () => Array.isArray(BANK.full) && BANK.full.length > 0;
const simAll = () => simPremium() ? BANK.full : BANK.free;
function simPool(met, lvl) { return simAll().filter(q => q.metodo === met && (lvl === "todos" || q.nivel === lvl)); }
function simShuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function simFmt(s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }
function simRecord(q, ok) {
  const st = S.sim.stats[q.metodo] || (S.sim.stats[q.metodo] = {n: 0, ok: 0});
  st.n++; if (ok) st.ok++;
  S.answers++; if (ok) S.correct++;
  if (ok) delete S.sim.wrong[q.id]; else S.sim.wrong[q.id] = 1;
}
function simWrongList(met) { const all = simAll(); return all.filter(q => S.sim.wrong[q.id] && q.metodo === met); }

function simView() {
  if (view.sim) return view.sim.done ? simResultView() : simRunView();
  const met = S.sim.met, lvl = S.sim.lvl, pool = simPool(met, lvl), prem = simPremium();
  const st = S.sim.stats[met], wrong = simWrongList(met).length;
  const chip = (k, label, on, attr) => `<button class="chip ${on ? "on" : ""}" ${attr}="${k}" aria-pressed="${on}">${label}</button>`;
  const examN = Math.min(SIM_CONFIG.examSize, pool.length);
  return `<section class="stack"><div class="eyebrow">Simulador de examen</div><h1>Pon a prueba tu nivel</h1>
  <p class="muted">Preguntas tipo examen de Nivel I y II con su explicación. ${prem ? "Tienes la versión completa." : "Estás usando la muestra gratis."}</p></section>
  <section class="stack"><div class="eyebrow">Método</div><div class="chips">${Object.keys(SIM_METHODS).map(m => chip(m, m, m === met, "data-sim-met")).join("")}</div>
  <div class="eyebrow">Nivel</div><div class="chips">${[["todos", "Todos"], ["basico", "Básico"], ["avanzado", "Avanzado"]].map(([k, l]) => chip(k, l, k === lvl, "data-sim-lvl")).join("")}</div></section>
  <section class="stats"><div class="stat"><b>${pool.length}</b><span>preguntas ${prem ? "" : "de muestra"}</span></div><div class="stat"><b>${st ? st.n : 0}</b><span>respondidas</span></div><div class="stat"><b>${st && st.n ? Math.round(100 * st.ok / st.n) : 0}%</b><span>aciertos</span></div></section>
  <section class="card"><h3>Práctica</h3><p class="muted">${Math.min(SIM_CONFIG.practiceSize, pool.length)} preguntas al azar de ${SIM_METHODS[met]}. Ves la respuesta y la explicación al instante.</p><button class="btn" data-sim-start="practica" ${pool.length ? "" : "disabled"}>Practicar</button></section>
  <section class="card"><h3>${prem ? "Examen con tiempo" : "Mini examen gratis"}</h3><p class="muted">${examN} preguntas, ${simFmt(examN * SIM_CONFIG.secPerQuestion)} minutos. Las respuestas se muestran al terminar. Nota de referencia: ${SIM_CONFIG.passPct}%.</p><button class="btn" data-sim-start="examen" ${examN ? "" : "disabled"}>Empezar examen</button></section>
  <section class="card"><h3>Repaso de errores</h3><p class="muted">${wrong ? `Tienes ${wrong} pregunta${wrong === 1 ? "" : "s"} de ${met} por repasar. Salen de la lista cuando las respondes bien.` : "Aquí aparecerán las preguntas que respondas mal."}</p><button class="btn ghost" data-sim-start="repaso" ${wrong ? "" : "disabled"}>Repasar errores</button></section>
  ${prem ? "" : simUnlockCard()}
  <p class="demo">Material de estudio independiente: no entrega certificación ni calificación (SNT-TC-1A, ISO 9712), no contiene preguntas reales de exámenes y no reproduce normas. Preguntas en revisión técnica.</p>`;
}
function simUnlockCard() {
  const t = SIM_CONFIG.totals, total = Object.values(t).reduce((a, b) => a + b, 0);
  return `<form class="card" id="sim-unlock"><h3>Versión completa</h3><p class="muted">${total} preguntas: VT ${t.VT}, PT ${t.PT}, MT ${t.MT}, UT ${t.UT} y RT ${t.RT}, en nivel básico y avanzado.</p>
  ${SIM_CONFIG.buyUrl ? `<a class="btn" href="${SIM_CONFIG.buyUrl}" target="_blank" rel="noopener" style="text-align:center;text-decoration:none">Comprar acceso</a>` : ""}
  <label for="sim-key">¿Ya compraste? Pega tu clave</label><input id="sim-key" type="text" autocomplete="off" spellcheck="false" placeholder="XXXXX-XXXXX-XXXXX-XXXXX">
  <button class="btn ghost" type="submit">Desbloquear</button><p class="muted" id="sim-msg" role="status" style="font-size:.85rem">${SIM_CONFIG.unlockUrl ? "" : "La versión completa estará disponible pronto."}</p></form>`;
}

function simStart(mode) {
  const met = S.sim.met;
  let set;
  if (mode === "repaso") set = simShuffle(simWrongList(met)).slice(0, SIM_CONFIG.practiceSize);
  else set = simShuffle(simPool(met, S.sim.lvl)).slice(0, mode === "examen" ? SIM_CONFIG.examSize : SIM_CONFIG.practiceSize);
  if (!set.length) return;
  view = {tab: "sim", sim: {mode, met, set, i: 0, picks: {}, ok: 0, t0: Date.now(), limit: mode === "examen" ? set.length * SIM_CONFIG.secPerQuestion : 0}};
  render("fwd"); window.scrollTo(0, 0);
}
function simLabel(mode) { return {practica: "Práctica", examen: "Examen", repaso: "Repaso"}[mode]; }
function simRunView() {
  const s = view.sim, q = s.set[s.i], exam = s.mode === "examen", picked = s.picks[s.i], shown = !exam && picked !== undefined;
  const left = exam ? s.limit - (Date.now() - s.t0) / 1000 : 0;
  return `<div class="row" style="justify-content:space-between;align-items:center"><button class="back" data-sim-quit>‹ Salir</button>${exam ? `<span class="timer" id="sim-timer" aria-live="off">${simFmt(left)}</span>` : ""}</div>
  <div class="progress-dots">${s.set.map((_, k) => `<i class="${k === s.i ? "on" : (s.picks[k] !== undefined ? "ans" : "")}"></i>`).join("")}</div>
  <section class="stack"><div class="eyebrow">${simLabel(s.mode)} ${s.met} · ${q.nivel === "avanzado" ? "Avanzado" : "Básico"} · Pregunta ${s.i + 1} de ${s.set.length}</div>
  ${q.imagen ? `<div class="figure photo-q"><img src="${esc(q.imagen)}" alt="Ilustración de la pregunta" width="640" height="640"></div>` : ""}<h2>${esc(q.pregunta)}</h2></section>
  <div class="opts">${q.opciones.map((o, k) => `<button class="opt ${shown && k === q.correcta ? "right" : ""} ${shown && k === picked && k !== q.correcta ? "wrong" : ""} ${exam && k === picked ? "sel" : ""}" data-sim-pick="${k}" ${shown ? "disabled" : ""}>${esc(o)}</button>`).join("")}</div>
  ${shown ? `<div class="feedback ${picked === q.correcta ? "" : "no"}"><strong>${picked === q.correcta ? "Correcto." : "Incorrecto."}</strong> ${esc(q.explicacion)}</div>` : ""}
  <div class="row">${exam && s.i > 0 ? `<button class="btn ghost" data-sim-prev>Anterior</button>` : ""}
  ${(exam || shown) ? `<button class="btn" data-sim-next>${s.i === s.set.length - 1 ? (exam ? "Terminar examen" : "Ver resultado") : "Siguiente"}</button>` : ""}</div>
  ${exam && s.i < s.set.length - 1 ? `<button class="back" data-sim-finish>Terminar ahora (${Object.keys(s.picks).length} de ${s.set.length} respondidas)</button>` : ""}`;
}
function simFinish() {
  const s = view.sim; if (s.done) return;
  if (s.mode === "examen") { s.ok = 0; s.set.forEach((q, k) => { const ok = s.picks[k] === q.correcta; if (ok) s.ok++; simRecord(q, ok); }); }
  s.done = true; s.secs = Math.round((Date.now() - s.t0) / 1000); save(); render("fwd"); window.scrollTo(0, 0);
}
function simResultView() {
  const s = view.sim, n = s.set.length, p = Math.round(100 * s.ok / n), C = 2 * Math.PI * 60, exam = s.mode === "examen";
  const miss = s.set.map((q, k) => ({q, k})).filter(x => s.picks[x.k] !== x.q.correcta);
  return `<section class="stack"><div class="eyebrow">Resultado · ${simLabel(s.mode)} ${s.met}</div><svg class="ring" viewBox="0 0 140 140"><circle class="bg" cx="70" cy="70" r="60"/><circle class="fg" cx="70" cy="70" r="60" stroke-dasharray="${C}" style="stroke-dashoffset:${C}" data-to="${C * (1 - s.ok / n)}"/><text x="70" y="80" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-size="34" font-weight="700" style="fill:var(--ink)"><tspan class="score" data-to="${p}">0</tspan>%</text></svg>
  <h1>${s.ok} de ${n} correctas</h1><p class="muted">${exam ? (p >= SIM_CONFIG.passPct ? `Superaste la nota de referencia de ${SIM_CONFIG.passPct}%` : `Bajo la nota de referencia de ${SIM_CONFIG.passPct}%`) + ` · Tiempo: ${simFmt(Math.min(s.secs, s.limit))}` : (miss.length ? "Las preguntas falladas quedaron en tu repaso de errores." : "Sin errores en esta ronda.")}</p></section>
  ${exam && miss.length ? `<section class="stack"><div class="eyebrow">Revisa tus errores</div>${miss.map(({q, k}) => `<details class="card rev"><summary><strong>${esc(q.pregunta)}</strong><span class="eyebrow" style="display:block;margin-top:6px">Ver respuesta ›</span></summary><p class="muted">Tu respuesta: ${s.picks[k] === undefined ? "sin responder" : esc(q.opciones[s.picks[k]])}</p><p><b>Correcta:</b> ${esc(q.opciones[q.correcta])}</p><p class="muted">${esc(q.explicacion)}</p></details>`).join("")}</section>` : ""}
  <div class="row"><button class="btn" data-sim-again>Otra ronda</button><button class="btn ghost" data-sim-quit>Volver</button></div>`;
}

let simTimer = null;
function simBind() {
  clearInterval(simTimer);
  app.querySelectorAll("[data-sim-met]").forEach(b => b.onclick = () => { S.sim.met = b.dataset.simMet; save(); render(); });
  app.querySelectorAll("[data-sim-lvl]").forEach(b => b.onclick = () => { S.sim.lvl = b.dataset.simLvl; save(); render(); });
  app.querySelectorAll("[data-sim-start]").forEach(b => b.onclick = () => simStart(b.dataset.simStart));
  app.querySelectorAll("[data-sim-quit]").forEach(b => b.onclick = () => go({tab: "sim"}));
  const again = app.querySelector("[data-sim-again]"); if (again) again.onclick = () => simStart(view.sim.mode);
  app.querySelectorAll("[data-sim-pick]").forEach(b => b.onclick = () => {
    const s = view.sim, k = +b.dataset.simPick, q = s.set[s.i];
    if (s.mode === "examen") { s.picks[s.i] = k; render(); return; }
    if (s.picks[s.i] !== undefined) return;
    s.picks[s.i] = k; const ok = k === q.correcta; if (ok) s.ok++; simRecord(q, ok); save(); render();
  });
  const nx = app.querySelector("[data-sim-next]");
  if (nx) nx.onclick = () => { const s = view.sim; if (s.i === s.set.length - 1) simFinish(); else { s.i++; render("fwd"); window.scrollTo(0, 0); } };
  const pv = app.querySelector("[data-sim-prev]"); if (pv) pv.onclick = () => { view.sim.i--; render("back"); window.scrollTo(0, 0); };
  const fin = app.querySelector("[data-sim-finish]"); if (fin) fin.onclick = () => { if (fin.dataset.sure) simFinish(); else { fin.dataset.sure = 1; fin.textContent = "Toca otra vez para terminar"; } };
  const tm = app.querySelector("#sim-timer");
  if (tm) simTimer = setInterval(() => { const s = view.sim; if (!s || s.done) return clearInterval(simTimer); const left = s.limit - (Date.now() - s.t0) / 1000; tm.textContent = simFmt(left); tm.classList.toggle("low", left < 120); if (left <= 0) simFinish(); }, 1000);
  const f = app.querySelector("#sim-unlock");
  if (f) f.onsubmit = async (e) => {
    e.preventDefault(); const msg = f.querySelector("#sim-msg"), key = f.querySelector("#sim-key").value.trim();
    if (!SIM_CONFIG.unlockUrl) { msg.textContent = "La versión completa estará disponible pronto."; return; }
    if (!key) { msg.textContent = "Pega la clave que llegó a tu correo."; return; }
    msg.textContent = "Verificando…";
    try {
      const r = await fetch(SIM_CONFIG.unlockUrl, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({key})});
      const d = await r.json();
      if (!r.ok || !Array.isArray(d.preguntas)) { msg.textContent = d.error || "No pudimos validar la clave. Revísala o escríbenos."; return; }
      BANK.full = d.preguntas; S.sim.key = key; save();
      try { localStorage.setItem(SIM_BANK_KEY, JSON.stringify(d.preguntas)); } catch (err) {}
      render();
    } catch (err) { msg.textContent = "Sin conexión. Intenta de nuevo cuando tengas internet."; }
  };
}
