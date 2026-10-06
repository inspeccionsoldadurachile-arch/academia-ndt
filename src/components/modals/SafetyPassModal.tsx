import React, { useState } from 'react';
import { ASSETS } from '../../data/assets';
import { InspectorProfile } from '../../types';

interface SafetyPassModalProps {
  profile: InspectorProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyPassModal: React.FC<SafetyPassModalProps> = ({ profile, isOpen, onClose }) => {
  const [selectedFaena, setSelectedFaena] = useState('Minera Centinela (Antofagasta)');
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-md bg-gradient-to-b from-[#112238] to-[#081423] border border-[#1d3557] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 bg-[#0d1e33] border-b border-[#1d3557] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff6b00] text-[20px]">verified_user</span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Pase de Seguridad para Faena
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#112238] hover:bg-[#1d3557] text-[#9db4d4] hover:text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-[82vh] overflow-y-auto">
          {/* Select Faena */}
          <div>
            <label className="text-[10px] text-[#9db4d4] uppercase font-semibold block mb-1">
              Seleccionar Destino Minero / Faena
            </label>
            <select
              value={selectedFaena}
              onChange={(e) => setSelectedFaena(e.target.value)}
              className="w-full bg-[#081423] border border-[#1d3557] text-white text-xs rounded-lg px-3 py-2 outline-none focus:border-[#ff6b00]"
            >
              <option value="Minera Centinela (Antofagasta)">Minera Centinela · Módulo Flotación</option>
              <option value="Minera Escondida BHP (Antofagasta)">Minera Escondida BHP · Chancador</option>
              <option value="Astillero ASMAR (Talcahuano)">Astillero ASMAR · Dique Seco</option>
              <option value="Minera Los Pelambres (Coquimbo)">Minera Los Pelambres · Espesadores</option>
              <option value="Codelco División El Teniente (Rancagua)">Codelco División El Teniente</option>
            </select>
          </div>

          {/* Industrial Ticket Card */}
          <div className="bg-[#0b1a2e] border border-[#ff6b00]/40 rounded-xl p-4 relative overflow-hidden shadow-lg space-y-3">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff6b00]/10 rounded-full blur-xl pointer-events-none"></div>

            {/* Top Bar inside Pass */}
            <div className="flex items-center justify-between border-b border-[#1d3557] pb-2">
              <div className="flex items-center gap-2">
                <img 
                  src={ASSETS.selloInstitucional} 
                  alt="Sello Oficial" 
                  className="w-8 h-8 rounded-full"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[10px] font-extrabold text-white uppercase block leading-tight">
                    AUTORIZACIÓN ACCESO INDUSTRIAL
                  </span>
                  <span className="text-[9px] text-[#4cd6fb] font-semibold">
                    ORDEN DE TRABAJO: OT-2026-NDT-77
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#00e676]/20 border border-[#00e676]/40 text-[#00e676] text-[10px] font-bold">
                HABILITADO
              </span>
            </div>

            {/* Inspector Metadata */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#0d1e33] p-2 rounded border border-[#1d3557]">
                <span className="text-[9px] text-[#9db4d4] block uppercase">Inspector Calificado</span>
                <span className="text-white font-bold block truncate">{profile.name}</span>
                <span className="text-[10px] text-[#4cd6fb]">RUT: {profile.rut}</span>
              </div>
              <div className="bg-[#0d1e33] p-2 rounded border border-[#1d3557]">
                <span className="text-[9px] text-[#9db4d4] block uppercase">Faena Asignada</span>
                <span className="text-white font-bold block truncate">{selectedFaena.split('(')[0]}</span>
                <span className="text-[10px] text-[#ff6b00]">Área Crítica · Caliente</span>
              </div>
            </div>

            {/* Safety Check Matrix */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] text-[#9db4d4] uppercase font-semibold block">
                Cumplimiento de Seguridad Minera y Salud
              </span>
              
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                <div className="flex items-center gap-1.5 p-1.5 rounded bg-[#081423] border border-[#1d3557]">
                  <span className="material-symbols-outlined text-[16px] text-[#00e676]">check_circle</span>
                  <span className="text-[#d7e3f9] text-[10px]">Inducción Hombre Nuevo</span>
                </div>
                <div className="flex items-center gap-1.5 p-1.5 rounded bg-[#081423] border border-[#1d3557]">
                  <span className="material-symbols-outlined text-[16px] text-[#00e676]">check_circle</span>
                  <span className="text-[#d7e3f9] text-[10px]">Examen Gran Altura</span>
                </div>
                <div className="flex items-center gap-1.5 p-1.5 rounded bg-[#081423] border border-[#1d3557]">
                  <span className="material-symbols-outlined text-[16px] text-[#00e676]">check_circle</span>
                  <span className="text-[#d7e3f9] text-[10px]">Visión Jaeger 1 (ASNT)</span>
                </div>
                <div className="flex items-center gap-1.5 p-1.5 rounded bg-[#081423] border border-[#1d3557]">
                  <span className="material-symbols-outlined text-[16px] text-[#00e676]">check_circle</span>
                  <span className="text-[#d7e3f9] text-[10px]">EPP Dieléctrico / Calzado</span>
                </div>
              </div>
            </div>

            {/* Access Barcode */}
            <div className="bg-[#081423] p-2.5 rounded border border-[#1d3557] flex flex-col items-center">
              <div className="h-10 w-full flex items-center justify-between px-2 bg-white rounded overflow-hidden">
                {Array.from({ length: 48 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-full ${idx % 3 === 0 ? 'w-1 bg-[#081423]' : idx % 5 === 0 ? 'w-1.5 bg-[#081423]' : 'w-0.5 bg-[#081423]'}`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-[#4cd6fb] font-mono mt-1.5 font-bold tracking-widest">
                NDT-MIN-2026-CL-8824-CENT
              </span>
            </div>
          </div>

          {/* Action button */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleDownload}
              className="w-full h-12 bg-[#ff6b00] hover:bg-[#e65c00] text-white text-xs font-semibold tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,107,0,0.4)] transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">
                {downloaded ? 'done_all' : 'download'}
              </span>
              <span>
                {downloaded ? 'PASE GENERADO EXITOSAMENTE' : 'DESCARGAR PASE OFICIAL (PDF)'}
              </span>
            </button>
            <p className="text-[10px] text-center text-[#9db4d4]">
              Válido por 30 días para ingreso a faena según DS 132 Reglamento de Seguridad Minera.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
