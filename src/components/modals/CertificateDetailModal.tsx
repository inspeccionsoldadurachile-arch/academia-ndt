import React from 'react';
import { ASSETS } from '../../data/assets';
import { Certificate, InspectorProfile } from '../../types';

interface CertificateDetailModalProps {
  certificate: Certificate | null;
  profile: InspectorProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateDetailModal: React.FC<CertificateDetailModalProps> = ({
  certificate,
  profile,
  isOpen,
  onClose
}) => {
  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-gradient-to-b from-[#112238] to-[#081423] border border-[#1d3557] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 bg-[#0d1e33] border-b border-[#1d3557] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff6b00] text-[20px]">workspace_premium</span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Diploma Oficial de Acreditación NDT
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#112238] hover:bg-[#1d3557] text-[#9db4d4] hover:text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scrollable Diploma Content */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* Official Diploma Frame */}
          <div className="bg-[#0b1a2e] border-2 border-[#ff6b00]/50 rounded-xl p-5 relative overflow-hidden text-center space-y-3.5 shadow-xl">
            {/* Watermark in background */}
            <img 
              src={ASSETS.watermark} 
              alt="" 
              className="absolute right-0 top-0 w-64 h-64 opacity-5 pointer-events-none select-none"
              referrerPolicy="no-referrer"
            />

            {/* Institution Brand Header */}
            <div className="flex items-center justify-center gap-3 border-b border-[#1d3557] pb-3">
              <img 
                src={ASSETS.isotipoOficial} 
                alt="Isotipo" 
                className="w-12 h-12 rounded-full border-2 border-[#ff6b00]"
                referrerPolicy="no-referrer"
              />
              <div className="text-left">
                <h4 className="text-xs font-extrabold text-white uppercase tracking-widest leading-tight">
                  Inspección Soldadura Chile
                </h4>
                <p className="text-[10px] text-[#4cd6fb] font-semibold">
                  INSTITUTO DE CAPACITACIÓN & AUDITORÍA NDT
                </p>
                <p className="text-[9px] text-[#9db4d4]">
                  Certificación según Práctica Recomendada ASNT SNT-TC-1A
                </p>
              </div>
            </div>

            {/* Diploma Core Text */}
            <div className="space-y-1">
              <span className="text-[10px] text-[#9db4d4] uppercase tracking-widest block">
                OTORGA LA PRESENTE CERTIFICACIÓN A:
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                {profile.name}
              </h2>
              <p className="text-xs text-[#4cd6fb] font-semibold">
                RUT: {profile.rut} · Registro Nacional: {certificate.reg}
              </p>
            </div>

            {/* Specialty Qualification Title */}
            <div className="bg-[#0d1e33] border border-[#1d3557] p-3 rounded-lg space-y-1">
              <span className="text-[10px] text-[#ff6b00] font-bold uppercase tracking-wider block">
                COMPETENCIA TÉCNICA ACREDITADA
              </span>
              <h3 className="text-base font-extrabold text-white">
                {certificate.title}
              </h3>
              <p className="text-[11px] text-[#9db4d4]">
                Bajo códigos y especificaciones: <strong className="text-white">{certificate.norm}</strong>
              </p>
            </div>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-2 gap-2 text-left text-xs bg-[#081423] p-3 rounded border border-[#1d3557]">
              <div>
                <span className="text-[9px] text-[#9db4d4] uppercase block">Carga Horaria</span>
                <span className="text-white font-semibold">{certificate.hours}</span>
              </div>
              <div>
                <span className="text-[9px] text-[#9db4d4] uppercase block">Período de Vigencia</span>
                <span className="text-white font-semibold">{certificate.validity || '3 Años Oficiales'}</span>
              </div>
              <div className="mt-1">
                <span className="text-[9px] text-[#9db4d4] uppercase block">Calificación</span>
                <span className="text-[#00e676] font-semibold">{certificate.score || 'Aprobado 100%'}</span>
              </div>
              <div className="mt-1">
                <span className="text-[9px] text-[#9db4d4] uppercase block">Emisión</span>
                <span className="text-white font-semibold">{certificate.issueDate || 'Enero 2025'}</span>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-2 border-t border-[#1d3557] flex items-center justify-between text-left">
              <div className="flex items-center gap-2">
                <img 
                  src={ASSETS.selloInstitucional} 
                  alt="Sello" 
                  className="w-10 h-10 rounded-full"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[9px] text-[#00e676] font-bold block uppercase">
                    CERTIFICADO AUTÉNTICO
                  </span>
                  <span className="text-[8px] text-[#9db4d4] block">
                    ID: CL-NDT-{certificate.code}-8824
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="font-serif italic text-xs text-[#4cd6fb]">
                  R. Palma C.
                </div>
                <span className="text-[8px] text-[#9db4d4] uppercase block border-t border-[#1d3557] pt-0.5 mt-0.5">
                  Auditor NDT Nivel III
                </span>
              </div>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="p-3 bg-[#0d1e33] border border-[#1d3557] rounded-lg text-xs flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[18px] text-[#4cd6fb] shrink-0 mt-0.5">verified</span>
            <p className="text-[11px] text-[#9db4d4] leading-relaxed">
              Este diploma cuenta con firma digital avanzada y validación criptográfica en los sistemas de acreditación para contratistas en faena minera.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-3 bg-[#0d1e33] border-t border-[#1d3557] shrink-0">
          <button
            onClick={handlePrint}
            className="w-full h-11 bg-[#ff6b00] hover:bg-[#e65c00] text-white text-xs font-semibold tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,107,0,0.4)] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>DESCARGAR DIPLOMA OFICIAL (PDF FIRMADO)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
