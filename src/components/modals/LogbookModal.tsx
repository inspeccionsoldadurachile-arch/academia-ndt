import React, { useState } from 'react';
import { ASSETS } from '../../data/assets';
import { LogbookEntry } from '../../types';

interface LogbookModalProps {
  entries: LogbookEntry[];
  totalHours: number;
  isOpen: boolean;
  onClose: () => void;
  onAddEntry: (entry: Omit<LogbookEntry, 'id'>) => void;
}

export const LogbookModal: React.FC<LogbookModalProps> = ({
  entries,
  totalHours,
  isOpen,
  onClose,
  onAddEntry
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [company, setCompany] = useState('Minera Centinela');
  const [component, setComponent] = useState('Línea de Concentrado 14"');
  const [method, setMethod] = useState<'VT' | 'PT' | 'MT' | 'UT'>('VT');
  const [technique, setTechnique] = useState('VT Cordón 4G GTAW · Galga Cambridge');
  const [hours, setHours] = useState('8.0');
  const [weldingProcess, setWeldingProcess] = useState('GTAW / SMAW');
  const [supervisor, setSupervisor] = useState('Rodrigo Palma - Nivel III #204');
  const [discontinuities, setDiscontinuities] = useState('Sin discontinuidades fuera de norma.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedHours = parseFloat(hours) || 4;
    onAddEntry({
      date: 'Hoy, ' + new Date().toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' }),
      company,
      facility: 'Faena Terreno',
      component,
      method,
      technique,
      hours: parsedHours,
      supervisor,
      status: 'FIRMADO',
      avatarUrl: company.includes('Asmar') ? ASSETS.faenaAsmar : ASSETS.faenaCentinela,
      weldingProcess,
      discontinuitiesFound: discontinuities
    });
    setShowAddForm(false);
  };

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-gradient-to-b from-[#112238] to-[#081423] border border-[#1d3557] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 bg-[#0d1e33] border-b border-[#1d3557] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff6b00] text-[20px]">menu_book</span>
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider block leading-tight">
                Bitácora de Terreno (Logbook NDT)
              </span>
              <span className="text-[10px] text-[#4cd6fb]">
                Norma ASNT SNT-TC-1A · Horas Prácticas
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#112238] hover:bg-[#1d3557] text-[#9db4d4] hover:text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* Progress Overview Card */}
          <div className="bg-[#0b1a2e] border border-[#1d3557] rounded-xl p-3.5 space-y-2">
            <div className="flex justify-between items-baseline text-xs">
              <span className="text-[10px] text-[#9db4d4] uppercase font-semibold">
                Acumulado Habilitante Supervisor
              </span>
              <span className="text-[#4cd6fb] font-extrabold text-sm tabular-nums">
                {totalHours} / 400 hrs
              </span>
            </div>

            <div className="w-full h-2.5 bg-[#040f1d] rounded-full overflow-hidden border border-[#1d3557]">
              <div 
                className="h-full bg-gradient-to-r from-[#00d2ff] to-[#4cd6fb] transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, (totalHours / 400) * 100)}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-[10px] text-[#9db4d4]">
              <span className="text-[#00e676]">✓ Nivel I: 70 hrs (Completado)</span>
              <span>Requisito Nivel II: 400 hrs</span>
            </div>
          </div>

          {/* Toggle Add Form Button */}
          {!showAddForm ? (
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddForm(true)}
                className="flex-1 h-10 px-3 bg-[#112238] border border-[#ff6b00]/50 hover:bg-[#ff6b00]/10 text-white text-[11px] font-semibold tracking-wider uppercase rounded-lg flex items-center justify-center gap-1.5 transition-all"
              >
                <span className="material-symbols-outlined text-[18px] text-[#ff6b00]">add_circle</span>
                <span>NUEVO REGISTRO EN TERRENO</span>
              </button>
              
              <button
                onClick={handleExportPdf}
                className="h-10 px-3 bg-[#0d1e33] border border-[#1d3557] hover:border-[#4cd6fb] text-[#4cd6fb] text-[11px] font-semibold tracking-wider uppercase rounded-lg flex items-center justify-center gap-1.5 transition-all"
                title="Imprimir o Exportar PDF"
              >
                <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                <span>PDF</span>
              </button>
            </div>
          ) : (
            /* Add Form */
            <form onSubmit={handleSubmit} className="bg-[#0b1a2e] border border-[#ff6b00]/40 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#1d3557] pb-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Registrar Horas de Inspección
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-[10px] text-[#9db4d4] hover:text-white"
                >
                  Cancelar
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[10px] text-[#9db4d4] uppercase block mb-1">Empresa / Faena</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-[#081423] border border-[#1d3557] text-white text-xs rounded p-2 outline-none focus:border-[#ff6b00]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#9db4d4] uppercase block mb-1">Componente / Junta</label>
                  <input
                    type="text"
                    value={component}
                    onChange={(e) => setComponent(e.target.value)}
                    className="w-full bg-[#081423] border border-[#1d3557] text-white text-xs rounded p-2 outline-none focus:border-[#ff6b00]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="text-[10px] text-[#9db4d4] uppercase block mb-1">Método</label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value as any)}
                    className="w-full bg-[#081423] border border-[#1d3557] text-white text-xs rounded p-2 outline-none focus:border-[#ff6b00]"
                  >
                    <option value="VT">VT (Visual)</option>
                    <option value="PT">PT (Penetrantes)</option>
                    <option value="MT">MT (Magnéticas)</option>
                    <option value="UT">UT (Ultrasonido)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-[#9db4d4] uppercase block mb-1">Horas en Faena</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="12"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full bg-[#081423] border border-[#1d3557] text-white text-xs rounded p-2 outline-none focus:border-[#ff6b00]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#9db4d4] uppercase block mb-1">Proceso Sold.</label>
                  <input
                    type="text"
                    value={weldingProcess}
                    onChange={(e) => setWeldingProcess(e.target.value)}
                    className="w-full bg-[#081423] border border-[#1d3557] text-white text-xs rounded p-2 outline-none focus:border-[#ff6b00]"
                    placeholder="SMAW/GTAW"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-[#9db4d4] uppercase block mb-1">Técnica Empleada</label>
                <input
                  type="text"
                  value={technique}
                  onChange={(e) => setTechnique(e.target.value)}
                  className="w-full bg-[#081423] border border-[#1d3557] text-white text-xs rounded p-2 outline-none focus:border-[#ff6b00]"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] text-[#9db4d4] uppercase block mb-1">Supervisor NDT Validador</label>
                <input
                  type="text"
                  value={supervisor}
                  onChange={(e) => setSupervisor(e.target.value)}
                  className="w-full bg-[#081423] border border-[#1d3557] text-white text-xs rounded p-2 outline-none focus:border-[#ff6b00]"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] text-[#9db4d4] uppercase block mb-1">Observaciones / Hallazgos</label>
                <textarea
                  value={discontinuities}
                  onChange={(e) => setDiscontinuities(e.target.value)}
                  rows={2}
                  className="w-full bg-[#081423] border border-[#1d3557] text-white text-xs rounded p-2 outline-none focus:border-[#ff6b00]"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-[#ff6b00] hover:bg-[#e65c00] text-white text-xs font-semibold tracking-wider uppercase rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-[0_2px_10px_rgba(255,107,0,0.35)]"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>GUARDAR Y FIRMAR REGISTRO</span>
              </button>
            </form>
          )}

          {/* List of Registered Inspections */}
          <div className="space-y-2">
            <span className="text-[10px] text-[#9db4d4] uppercase tracking-wider block font-semibold">
              Historial de Jornadas Validadas ({entries.length})
            </span>

            {entries.map((entry) => (
              <div 
                key={entry.id}
                className="p-3 rounded-lg bg-[#0d1e33] border border-[#1d3557] text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={entry.avatarUrl} 
                      alt={entry.company} 
                      className="w-6 h-6 rounded-full object-cover shrink-0 border border-[#1d3557]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {entry.company} · {entry.component}
                      </span>
                      <span className="text-[10px] text-[#9db4d4]">
                        {entry.date} · {entry.facility}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-[#00d2ff]/15 text-[#4cd6fb] text-[10px] font-bold block">
                      {entry.hours} hrs
                    </span>
                    <span className="text-[9px] text-[#00e676] font-semibold uppercase mt-0.5 block">
                      FIRMADO
                    </span>
                  </div>
                </div>

                <div className="pt-1 text-[11px] text-[#9db4d4] border-t border-[#1d3557]/50 flex justify-between items-center">
                  <span>{entry.technique}</span>
                  <span className="text-[10px] text-[#afc8ec]">{entry.weldingProcess}</span>
                </div>

                {entry.discontinuitiesFound && (
                  <p className="text-[10px] text-white/80 bg-[#081423] p-1.5 rounded border border-[#1d3557]/60">
                    <strong className="text-[#ffb693]">Nota:</strong> {entry.discontinuitiesFound}
                  </p>
                )}

                <div className="text-[9px] text-[#9db4d4] flex items-center justify-between">
                  <span>Validador: {entry.supervisor}</span>
                  <span className="text-[#00e676] flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px]">check</span>
                    Firma Electrónica OK
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-[#0d1e33] border-t border-[#1d3557] shrink-0">
          <button 
            onClick={handleExportPdf}
            className="w-full h-11 bg-[#0d1e33] border border-[#1d3557] hover:border-[#4cd6fb]/60 text-[#4cd6fb] text-xs tracking-wider uppercase font-semibold rounded flex items-center justify-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            <span>EXPORTAR BITÁCORA VALIDADA COMPLETA (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
