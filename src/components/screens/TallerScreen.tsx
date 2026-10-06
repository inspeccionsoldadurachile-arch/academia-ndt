import React, { useState } from 'react';
import { ASSETS } from '../../data/assets';

interface TallerScreenProps {
  onEarnXp: (amount: number, reason: string) => void;
}

export const TallerScreen: React.FC<TallerScreenProps> = ({ onEarnXp }) => {
  const [selectedMethod, setSelectedMethod] = useState<'VT' | 'PT' | 'MT'>('VT');

  // VT State
  const [undercutDepth, setUndercutDepth] = useState(0.8); // mm
  const [reinforcementHeight, setReinforcementHeight] = useState(2.2); // mm
  const [gaugePosition, setGaugePosition] = useState(45); // %
  const [vtSaved, setVtSaved] = useState(false);

  // PT State
  const [ptStep, setPtStep] = useState<number>(1);
  const [uvLightOn, setUvLightOn] = useState(false);
  const [dwellTime, setDwellTime] = useState(10);
  const [foundDiscontinuities, setFoundDiscontinuities] = useState<string[]>([]);

  // MT State
  const [yokePowerOn, setYokePowerOn] = useState(false);
  const [currentType, setCurrentType] = useState<'AC' | 'DC'>('AC');
  const [powderSprinkled, setPowderSprinkled] = useState(false);
  const [pieGaugeTested, setPieGaugeTested] = useState(false);

  // VT Evaluation Logic (AWS D1.1)
  const isUndercutAcceptable = undercutDepth <= 1.0;
  const isReinforcementAcceptable = reinforcementHeight <= 3.0;
  const isVtPass = isUndercutAcceptable && isReinforcementAcceptable;

  const handleSaveVt = () => {
    setVtSaved(true);
    onEarnXp(25, 'Medición dimensional calibrada con Galga Cambridge');
    setTimeout(() => setVtSaved(false), 2500);
  };

  const handlePtCrackClick = (defectName: string) => {
    if (!foundDiscontinuities.includes(defectName)) {
      setFoundDiscontinuities([...foundDiscontinuities, defectName]);
      onEarnXp(20, `Identificación de ${defectName} en ensayo PT`);
    }
  };

  return (
    <div className="flex flex-col w-full px-3.5 space-y-3.5 max-w-2xl mx-auto">
      {/* Workshop Header Card */}
      <section className="bg-gradient-to-b from-[#112238] to-[#0d1e33] border border-[#1d3557] rounded-xl p-3.5 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#ff6b00] to-[#00d2ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px] text-white">science</span>
            </div>
            <div>
              <span className="text-[10px] text-[#4cd6fb] font-bold uppercase tracking-wider block">
                LABORATORIO PRÁCTICO INTERACTIVO
              </span>
              <h2 className="text-base font-extrabold text-white leading-tight">
                Simulador de Ensayos NDT
              </h2>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#081423] border border-[#1d3557] text-[#ff6b00] text-[10px] font-bold uppercase">
            CALIBRADO
          </span>
        </div>

        {/* Method Switcher Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-[#040f1d] p-1 rounded-lg border border-[#1d3557] mt-3">
          <button
            onClick={() => setSelectedMethod('VT')}
            className={`py-1.5 rounded text-[11px] uppercase tracking-wider font-semibold transition-all text-center flex items-center justify-center gap-1 ${
              selectedMethod === 'VT'
                ? 'bg-[#ff6b00] text-white shadow-sm'
                : 'text-[#9db4d4] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">straighten</span>
            <span>VT Galga</span>
          </button>
          <button
            onClick={() => setSelectedMethod('PT')}
            className={`py-1.5 rounded text-[11px] uppercase tracking-wider font-semibold transition-all text-center flex items-center justify-center gap-1 ${
              selectedMethod === 'PT'
                ? 'bg-[#ff6b00] text-white shadow-sm'
                : 'text-[#9db4d4] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">water_drop</span>
            <span>PT Tintas</span>
          </button>
          <button
            onClick={() => setSelectedMethod('MT')}
            className={`py-1.5 rounded text-[11px] uppercase tracking-wider font-semibold transition-all text-center flex items-center justify-center gap-1 ${
              selectedMethod === 'MT'
                ? 'bg-[#ff6b00] text-white shadow-sm'
                : 'text-[#9db4d4] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            <span>MT Yugo</span>
          </button>
        </div>
      </section>

      {/* METHOD 1: VT VISUAL INSPECTION WITH CAMBRIDGE GAUGE */}
      {selectedMethod === 'VT' && (
        <div className="space-y-3">
          {/* Specimen Viewport Canvas */}
          <div className="bg-[#0b1a2e] border border-[#1d3557] rounded-xl p-3.5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] text-[#4cd6fb] uppercase font-bold">
                Junta a Tope 3G SMAW E7018 · Espesor t = 16mm
              </span>
              <span className="text-[10px] text-[#9db4d4]">
                Iluminancia: 1.150 Lux (OK)
              </span>
            </div>

            {/* Weld Seam SVG Simulation */}
            <div className="relative w-full h-44 bg-[#081423] rounded-lg border border-[#1d3557] overflow-hidden flex items-center justify-center select-none">
              <svg className="w-full h-full" viewBox="0 0 500 180" preserveAspectRatio="none">
                {/* Base metal plate left */}
                <rect x="0" y="40" width="180" height="100" fill="#1b2a3d" stroke="#253a54" strokeWidth="1" />
                {/* Steel plate grain texture */}
                <line x1="20" y1="45" x2="160" y2="45" stroke="#253a54" strokeDasharray="4 8" />
                <line x1="10" y1="90" x2="170" y2="90" stroke="#253a54" strokeDasharray="3 6" />
                <line x1="25" y1="130" x2="165" y2="130" stroke="#253a54" strokeDasharray="5 7" />

                {/* Base metal plate right */}
                <rect x="320" y="40" width="180" height="100" fill="#1b2a3d" stroke="#253a54" strokeWidth="1" />
                <line x1="330" y1="45" x2="480" y2="45" stroke="#253a54" strokeDasharray="4 8" />
                <line x1="325" y1="90" x2="490" y2="90" stroke="#253a54" strokeDasharray="3 6" />
                <line x1="335" y1="130" x2="475" y2="130" stroke="#253a54" strokeDasharray="5 7" />

                {/* Heat Affected Zone (HAZ / ZAC) Left & Right */}
                <path d="M170 40 L185 40 L185 140 L170 140 Z" fill="#2d3a4d" opacity="0.6" />
                <path d="M315 40 L330 40 L330 140 L315 140 Z" fill="#2d3a4d" opacity="0.6" />

                {/* Weld Bead (Cordón de soldadura con ondas / ripples) */}
                <path 
                  d="M185 40 C 230 30, 270 30, 315 40 L 315 140 C 270 148, 230 148, 185 140 Z" 
                  fill="#33475f" 
                  stroke="#4cd6fb" 
                  strokeWidth="1.5"
                />

                {/* Welding ripples texture */}
                {Array.from({ length: 9 }).map((_, i) => (
                  <path
                    key={i}
                    d={`M186 ${48 + i * 10} Q 250 ${38 + i * 10} 314 ${48 + i * 10}`}
                    fill="none"
                    stroke="#506c8f"
                    strokeWidth="1.5"
                    opacity="0.8"
                  />
                ))}

                {/* Undercut Groove (Socavación en el pie de soldadura) */}
                <ellipse 
                  cx="185" 
                  cy="90" 
                  rx={undercutDepth * 3} 
                  ry={undercutDepth * 12} 
                  fill="#040b14" 
                  stroke="#ff6b00" 
                  strokeWidth="1"
                />

                {/* Virtual Cambridge Gauge Pointer */}
                <line
                  x1={`${160 + (gaugePosition * 1.8)}`}
                  y1="10"
                  x2={`${160 + (gaugePosition * 1.8)}`}
                  y2="170"
                  stroke="#ff6b00"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
              </svg>

              {/* Position indicator */}
              <div 
                className="absolute top-2 bg-[#081423]/90 border border-[#ff6b00] px-2 py-0.5 rounded text-[10px] text-white font-mono pointer-events-none"
                style={{ left: `${Math.min(75, Math.max(10, gaugePosition))}%` }}
              >
                Punto de Medición
              </div>
            </div>

            {/* Gauge Controls */}
            <div className="space-y-3 bg-[#0d1e33] p-3 rounded-lg border border-[#1d3557]">
              {/* Undercut Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#9db4d4]">
                    Profundidad de Socavación (Undercut):
                  </span>
                  <span className={`font-mono font-bold ${isUndercutAcceptable ? 'text-[#00e676]' : 'text-[#ff3838]'}`}>
                    {undercutDepth.toFixed(1)} mm
                  </span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="2.5"
                  step="0.1"
                  value={undercutDepth}
                  onChange={(e) => setUndercutDepth(parseFloat(e.target.value))}
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-[#9db4d4]">
                  <span>0.0 mm (Perfecto)</span>
                  <span className="text-[#ff6b00]">Límite AWS: ≤ 1.0 mm</span>
                  <span>2.5 mm (Crítico)</span>
                </div>
              </div>

              {/* Reinforcement Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#9db4d4]">
                    Altura de Sobremonta (Corona Reinforcement):
                  </span>
                  <span className={`font-mono font-bold ${isReinforcementAcceptable ? 'text-[#00e676]' : 'text-[#ff3838]'}`}>
                    {reinforcementHeight.toFixed(1)} mm
                  </span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.5"
                  step="0.1"
                  value={reinforcementHeight}
                  onChange={(e) => setReinforcementHeight(parseFloat(e.target.value))}
                  className="w-full accent-[#00d2ff] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-[#9db4d4]">
                  <span>1.0 mm</span>
                  <span className="text-[#00d2ff]">Máximo Admisible: 3.0 mm</span>
                  <span>4.5 mm (Exceso)</span>
                </div>
              </div>

              {/* Position Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#9db4d4]">Desplazamiento Galga Cambridge a lo largo del cordón:</span>
                  <span className="font-mono text-white">{gaugePosition}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={gaugePosition}
                  onChange={(e) => setGaugePosition(parseInt(e.target.value))}
                  className="w-full accent-[#9db4d4] cursor-pointer"
                />
              </div>
            </div>

            {/* Live Verdict Card according to AWS D1.1 Table 6.1 */}
            <div className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
              isVtPass 
                ? 'bg-[#00e676]/10 border-[#00e676]/40 text-[#d7e3f9]' 
                : 'bg-[#ff3838]/10 border-[#ff3838]/40 text-[#d7e3f9]'
            }`}>
              <span className={`material-symbols-outlined text-[20px] shrink-0 ${isVtPass ? 'text-[#00e676]' : 'text-[#ff3838]'}`}>
                {isVtPass ? 'check_circle' : 'cancel'}
              </span>
              <div className="flex-1">
                <span className={`font-extrabold uppercase text-[11px] block ${isVtPass ? 'text-[#00e676]' : 'text-[#ff3838]'}`}>
                  {isVtPass ? 'CONFORME SEGÚN AWS D1.1 (TABLA 6.1)' : 'RECHAZADO SEGÚN AWS D1.1'}
                </span>
                <p className="text-[10px] text-[#9db4d4] mt-0.5">
                  {isVtPass
                    ? 'La socavación y la sobremonta se encuentran dentro de las tolerancias admisibles para juntas estáticas.'
                    : !isUndercutAcceptable 
                      ? 'Rechazado: La socavación excede el límite máximo de 1.0 mm para este espesor de plancha.'
                      : 'Rechazado: La sobremonta excede los 3.0 mm admisibles produciendo concentrador de tensiones.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleSaveVt}
              className="w-full h-11 bg-[#ff6b00] hover:bg-[#e65c00] text-white text-xs font-semibold tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,107,0,0.4)] transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">
                {vtSaved ? 'done' : 'save'}
              </span>
              <span>
                {vtSaved ? 'MEDICIÓN GUARDADA (+25 XP)' : 'REGISTRAR CALIBRACIÓN EN BITÁCORA'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* METHOD 2: PT PENETRANT TESTING SIMULATOR */}
      {selectedMethod === 'PT' && (
        <div className="space-y-3">
          <div className="bg-[#0b1a2e] border border-[#1d3557] rounded-xl p-3.5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] text-[#ff6b00] uppercase font-bold">
                Procedimiento ASTM E165 / Tipo II Método C
              </span>
              <span className="text-[10px] text-[#9db4d4]">
                Paso {ptStep} de 5
              </span>
            </div>

            {/* Stepper Buttons */}
            <div className="grid grid-cols-5 gap-1 text-[10px]">
              {[
                { step: 1, name: '1. Limpieza' },
                { step: 2, name: '2. Penetrante' },
                { step: 3, name: '3. Remoción' },
                { step: 4, name: '4. Revelador' },
                { step: 5, name: '5. Inspección' }
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => setPtStep(s.step)}
                  className={`py-1 rounded text-center font-semibold transition-all ${
                    ptStep === s.step
                      ? 'bg-[#ff6b00] text-white shadow-sm'
                      : ptStep > s.step
                      ? 'bg-[#0d1e33] text-[#4cd6fb] border border-[#1d3557]'
                      : 'bg-[#040f1d] text-[#9db4d4]'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            {/* Interactive Inspection Specimen Screen */}
            <div className={`relative w-full h-48 rounded-lg border border-[#1d3557] overflow-hidden flex items-center justify-center transition-colors duration-500 ${
              uvLightOn ? 'bg-[#0b031c]' : 'bg-[#0d1e33]'
            }`}>
              {/* Weld Seam Visual under various PT stages */}
              <svg className="w-full h-full" viewBox="0 0 500 200">
                {/* Steel plates */}
                <rect x="0" y="30" width="190" height="140" fill={uvLightOn ? '#120b24' : '#18273a'} />
                <rect x="310" y="30" width="190" height="140" fill={uvLightOn ? '#120b24' : '#18273a'} />
                
                {/* Weld Bead */}
                <rect 
                  x="190" 
                  y="30" 
                  width="120" 
                  height="140" 
                  fill={
                    ptStep === 2 ? '#b80c32' : // Red penetrant applied
                    ptStep === 4 ? '#e2e8f0' : // White chalky developer
                    uvLightOn ? '#1a1038' : '#22354a'
                  }
                  opacity={ptStep === 2 ? 0.8 : ptStep === 4 ? 0.9 : 1}
                />

                {/* If step 4 or 5: Indications bleeding out */}
                {(ptStep === 4 || ptStep === 5) && (
                  <g>
                    {/* Crack in HAZ (indicación lineal) */}
                    <path
                      d="M 180 80 Q 185 105 182 130"
                      fill="none"
                      stroke={uvLightOn ? '#00ff66' : '#d90429'}
                      strokeWidth={uvLightOn ? '4' : '3'}
                      strokeLinecap="round"
                      filter={uvLightOn ? 'drop-shadow(0px 0px 8px #00ff66)' : undefined}
                      className="cursor-pointer"
                      onClick={() => handlePtCrackClick('Fisura Longitudinal en ZAC')}
                    />

                    {/* Porosity (indicación redondeada) */}
                    <circle
                      cx="250"
                      cy="110"
                      r="4"
                      fill={uvLightOn ? '#ffff00' : '#d90429'}
                      filter={uvLightOn ? 'drop-shadow(0px 0px 6px #ffff00)' : undefined}
                      className="cursor-pointer"
                      onClick={() => handlePtCrackClick('Porosidad Aislada')}
                    />
                  </g>
                )}
              </svg>

              {/* UV Light Overlay Glow Indicator */}
              {uvLightOn && (
                <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 rounded bg-[#6a0dad]/40 border border-[#a855f7] text-[#e9d5ff] text-[10px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#c084fc] animate-ping"></span>
                  Luz Negra 365nm UV Activa (&gt;1000 µW/cm²)
                </div>
              )}

              {/* Instructions banner on canvas */}
              <div className="absolute bottom-2 left-2 right-2 bg-[#081423]/90 p-2 rounded border border-[#1d3557] text-[11px] text-white flex items-center justify-between">
                <span>
                  {ptStep === 1 && 'Paso 1: Aplica solvente limpiador para remover aceites y óxidos.'}
                  {ptStep === 2 && 'Paso 2: Rociar líquido penetrante Tipo II. Tiempo de penetración: 10 min.'}
                  {ptStep === 3 && 'Paso 3: Remover cuidadosamente el exceso con paño húmedo.'}
                  {ptStep === 4 && 'Paso 4: Aplicar capa fina y uniforme de revelador suspendido en solvente.'}
                  {ptStep === 5 && 'Paso 5: Toca las indicaciones que aparezcan en el cordón para identificarlas.'}
                </span>

                {ptStep === 5 && (
                  <button
                    onClick={() => setUvLightOn(!uvLightOn)}
                    className="px-2 py-1 rounded bg-[#6a0dad] hover:bg-[#7e22ce] text-white text-[10px] font-bold uppercase shrink-0"
                  >
                    {uvLightOn ? 'Luz Blanca' : 'Luz UV 365nm'}
                  </button>
                )}
              </div>
            </div>

            {/* Found Indications Status */}
            <div className="bg-[#0d1e33] p-3 rounded-lg border border-[#1d3557] space-y-1.5">
              <span className="text-[10px] text-[#9db4d4] uppercase font-bold block">
                Discontinuidades Detectadas ({foundDiscontinuities.length}/2)
              </span>
              <div className="flex gap-2">
                <span className={`text-[10px] px-2 py-1 rounded border flex items-center gap-1 ${
                  foundDiscontinuities.includes('Fisura Longitudinal en ZAC')
                    ? 'bg-[#00e676]/15 border-[#00e676]/40 text-[#00e676]'
                    : 'bg-[#081423] border-[#1d3557] text-[#9db4d4]'
                }`}>
                  <span className="material-symbols-outlined text-[14px]">
                    {foundDiscontinuities.includes('Fisura Longitudinal en ZAC') ? 'check' : 'radio_button_unchecked'}
                  </span>
                  Fisura en ZAC (Lineal)
                </span>

                <span className={`text-[10px] px-2 py-1 rounded border flex items-center gap-1 ${
                  foundDiscontinuities.includes('Porosidad Aislada')
                    ? 'bg-[#00e676]/15 border-[#00e676]/40 text-[#00e676]'
                    : 'bg-[#081423] border-[#1d3557] text-[#9db4d4]'
                }`}>
                  <span className="material-symbols-outlined text-[14px]">
                    {foundDiscontinuities.includes('Porosidad Aislada') ? 'check' : 'radio_button_unchecked'}
                  </span>
                  Porosidad (Redondeada)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* METHOD 3: MT MAGNETIC PARTICLE SIMULATOR */}
      {selectedMethod === 'MT' && (
        <div className="space-y-3">
          <div className="bg-[#0b1a2e] border border-[#1d3557] rounded-xl p-3.5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] text-[#afc8ec] uppercase font-bold">
                Yugo Electromagnético Portátil · ASME Sec. V Art. 7
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentType('AC')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    currentType === 'AC' ? 'bg-[#ff6b00] text-white' : 'bg-[#0d1e33] text-[#9db4d4]'
                  }`}
                >
                  AC (4.5 kg)
                </button>
                <button
                  onClick={() => setCurrentType('DC')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    currentType === 'DC' ? 'bg-[#ff6b00] text-white' : 'bg-[#0d1e33] text-[#9db4d4]'
                  }`}
                >
                  DC (18 kg)
                </button>
              </div>
            </div>

            {/* Yoke Magnetization Canvas */}
            <div className="relative w-full h-48 bg-[#081423] rounded-lg border border-[#1d3557] overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 200">
                {/* Steel plate */}
                <rect x="50" y="40" width="400" height="120" fill="#1b2a3d" stroke="#253a54" strokeWidth="1.5" />
                
                {/* Magnetic Flux Lines when Yoke is energized */}
                {yokePowerOn && (
                  <g opacity="0.6">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <path
                        key={i}
                        d={`M 120 ${60 + i * 12} Q 250 ${40 + i * 16} 380 ${60 + i * 12}`}
                        fill="none"
                        stroke="#00d2ff"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                    ))}
                  </g>
                )}

                {/* Yoke Legs */}
                <rect x="100" y="30" width="30" height="50" fill="#ff6b00" rx="3" stroke="#fff" strokeWidth="1" />
                <rect x="370" y="30" width="30" height="50" fill="#ff6b00" rx="3" stroke="#fff" strokeWidth="1" />
                {/* Yoke handle */}
                <path d="M 115 30 C 115 -10, 385 -10, 385 30" fill="none" stroke="#e65c00" strokeWidth="12" />

                {/* Crack Accumulation when powder sprinkled & energized */}
                {powderSprinkled && yokePowerOn && (
                  <g>
                    {/* Magnetic leakage field defect */}
                    <line x1="245" y1="75" x2="255" y2="125" stroke="#ff3838" strokeWidth="4" filter="drop-shadow(0 0 4px #ff3838)" />
                    <text x="265" y="105" fill="#ffb4ab" fontSize="11" fontWeight="bold">
                      Grieta Transversal detectada
                    </text>
                  </g>
                )}
              </svg>

              {/* Status pill inside canvas */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded bg-[#081423]/90 border border-[#1d3557] text-[10px]">
                <span className={`w-2 h-2 rounded-full ${yokePowerOn ? 'bg-[#00e676] animate-pulse' : 'bg-[#9db4d4]'}`}></span>
                <span className="text-white font-semibold">
                  {yokePowerOn ? 'CAMPO MAGNÉTICO ACTIVO' : 'DESENERGIZADO'}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setYokePowerOn(!yokePowerOn)}
                className={`h-11 rounded-lg text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all ${
                  yokePowerOn
                    ? 'bg-[#00e676] hover:bg-[#00c853] text-[#003543] shadow-[0_0_12px_rgba(0,230,118,0.4)]'
                    : 'bg-[#112238] border border-[#1d3557] text-white hover:border-[#00e676]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">power_settings_new</span>
                <span>{yokePowerOn ? 'APAGAR YUGO' : 'ENERGIZAR YUGO'}</span>
              </button>

              <button
                onClick={() => {
                  setPowderSprinkled(true);
                  if (yokePowerOn) {
                    onEarnXp(20, 'Detección de flujo magnético en probeta');
                  }
                }}
                className="h-11 bg-[#0d1e33] border border-[#1d3557] hover:border-[#ff6b00] text-white text-xs font-semibold tracking-wider uppercase rounded-lg flex items-center justify-center gap-1.5 transition-all"
              >
                <span className="material-symbols-outlined text-[18px] text-[#ff6b00]">grain</span>
                <span>APLICAR PARTÍCULAS</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
