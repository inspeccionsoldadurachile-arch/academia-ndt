import React, { useState } from 'react';
import { ASSETS } from '../../data/assets';
import { InspectorProfile } from '../../types';

interface QrCredentialModalProps {
  profile: InspectorProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const QrCredentialModal: React.FC<QrCredentialModalProps> = ({ profile, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const verificationUrl = `https://verificacion.inspeccionsoldadurachile.cl/validar?rut=${encodeURIComponent(profile.rut)}&reg=${encodeURIComponent(profile.regNdt)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-sm bg-gradient-to-b from-[#112238] to-[#081423] border border-[#1d3557] rounded-2xl shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-4 py-3 bg-[#0d1e33] border-b border-[#1d3557] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff6b00] text-[20px]">badge</span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Credencial NDT Oficial
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#112238] hover:bg-[#1d3557] text-[#9db4d4] hover:text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Credential Body */}
        <div className="p-4 space-y-4">
          {/* Card Frame with Holographic Corner Border */}
          <div className="bg-[#0b1a2e] border-2 border-[#1d3557] rounded-xl p-4 relative overflow-hidden shadow-inner">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#00d2ff]/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-[#ff6b00]/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ff6b00] via-[#00d2ff] to-[#ff6b00]"></div>

            {/* Institution Brand */}
            <div className="flex items-center justify-between border-b border-[#1d3557] pb-3">
              <div className="flex items-center gap-2">
                <img 
                  src={ASSETS.isotipoOficial} 
                  alt="NDT Chile" 
                  className="w-7 h-7 rounded-full border border-[#ff6b00]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[10px] font-extrabold text-white block uppercase tracking-wider leading-none">
                    Inspección Soldadura Chile
                  </span>
                  <span className="text-[9px] text-[#4cd6fb] font-semibold">
                    REGISTRO NACIONAL END / NDT
                  </span>
                </div>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#00e676]/15 border border-[#00e676]/40 text-[#00e676] font-bold uppercase tracking-wider">
                VIGENTE
              </span>
            </div>

            {/* Inspector Identity */}
            <div className="flex items-center gap-3 py-3 border-b border-[#1d3557]">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#ff6b00] via-[#00d2ff] to-[#ff6b00] flex items-center justify-center">
                  <img 
                    src={profile.avatarUrl} 
                    alt={profile.name} 
                    className="w-full h-full rounded-full object-cover bg-[#081423]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-extrabold text-base text-white tracking-tight leading-tight">
                  {profile.name}
                </h3>
                <p className="text-[11px] font-semibold text-[#4cd6fb] mt-0.5">
                  RUT: {profile.rut}
                </p>
                <p className="text-[10px] text-[#9db4d4]">
                  Reg: {profile.regNdt}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#ff6b00]/20 text-[#ffb693] font-bold uppercase">
                    VT Nivel I
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#00d2ff]/20 text-[#a5e7ff] font-bold uppercase">
                    PT Nivel I
                  </span>
                </div>
              </div>
            </div>

            {/* Scannable Industrial QR Simulation */}
            <div className="py-3 flex flex-col items-center justify-center text-center">
              <div className="p-2.5 bg-white rounded-lg shadow-lg relative">
                {/* SVG QR Code */}
                <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none">
                  {/* Position detection patterns */}
                  <rect x="0" y="0" width="28" height="28" fill="#081423" rx="2" />
                  <rect x="4" y="4" width="20" height="20" fill="white" rx="1" />
                  <rect x="8" y="8" width="12" height="12" fill="#ff6b00" rx="1" />

                  <rect x="72" y="0" width="28" height="28" fill="#081423" rx="2" />
                  <rect x="76" y="4" width="20" height="20" fill="white" rx="1" />
                  <rect x="80" y="8" width="12" height="12" fill="#081423" rx="1" />

                  <rect x="0" y="72" width="28" height="28" fill="#081423" rx="2" />
                  <rect x="4" y="76" width="20" height="20" fill="white" rx="1" />
                  <rect x="8" y="80" width="12" height="12" fill="#081423" rx="1" />

                  {/* QR Matrix Elements */}
                  <rect x="34" y="8" width="6" height="6" fill="#081423" />
                  <rect x="44" y="8" width="6" height="6" fill="#081423" />
                  <rect x="54" y="8" width="6" height="6" fill="#081423" />
                  <rect x="34" y="20" width="16" height="6" fill="#081423" />
                  <rect x="54" y="20" width="6" height="12" fill="#081423" />
                  
                  <rect x="8" y="34" width="12" height="6" fill="#081423" />
                  <rect x="24" y="34" width="6" height="12" fill="#ff6b00" />
                  <rect x="34" y="34" width="10" height="10" fill="#081423" />
                  <rect x="48" y="34" width="8" height="8" fill="#081423" />
                  <rect x="60" y="34" width="6" height="6" fill="#081423" />
                  <rect x="70" y="34" width="12" height="6" fill="#081423" />
                  <rect x="86" y="34" width="6" height="12" fill="#081423" />

                  <rect x="8" y="48" width="6" height="16" fill="#081423" />
                  <rect x="18" y="48" width="8" height="6" fill="#081423" />
                  <rect x="30" y="48" width="14" height="6" fill="#081423" />
                  <rect x="48" y="48" width="10" height="14" fill="#081423" />
                  <rect x="62" y="48" width="8" height="8" fill="#081423" />
                  <rect x="74" y="48" width="18" height="6" fill="#081423" />

                  <rect x="20" y="60" width="6" height="6" fill="#081423" />
                  <rect x="32" y="60" width="10" height="6" fill="#081423" />
                  <rect x="62" y="60" width="12" height="6" fill="#081423" />
                  <rect x="78" y="60" width="14" height="6" fill="#081423" />

                  <rect x="34" y="72" width="6" height="12" fill="#081423" />
                  <rect x="44" y="72" width="14" height="6" fill="#081423" />
                  <rect x="62" y="72" width="6" height="6" fill="#081423" />
                  <rect x="72" y="72" width="10" height="6" fill="#081423" />
                  <rect x="86" y="72" width="6" height="18" fill="#081423" />

                  <rect x="34" y="86" width="16" height="6" fill="#081423" />
                  <rect x="54" y="86" width="8" height="6" fill="#081423" />
                  <rect x="66" y="86" width="14" height="6" fill="#ff6b00" />
                </svg>

                {/* Center Micro Badge */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-[#081423] border border-[#ff6b00] p-1 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px] text-[#ff6b00]">verified</span>
                  </div>
                </div>
              </div>

              <span className="text-[10px] text-[#4cd6fb] font-semibold mt-2">
                HASH DE INTEGRIDAD: #SHA-8824-CL-2026
              </span>
              <span className="text-[9px] text-[#9db4d4]">
                Escanear para verificar en faena según ASNT SNT-TC-1A
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopy}
              className="h-10 px-3 bg-[#112238] border border-[#1d3557] hover:border-[#4cd6fb]/60 text-white text-[11px] font-semibold tracking-wider uppercase rounded flex items-center justify-center gap-1.5 transition-all"
            >
              <span className="material-symbols-outlined text-[17px] text-[#4cd6fb]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'COPIADO' : 'COPIAR URL'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="h-10 px-3 bg-[#ff6b00] hover:bg-[#e65c00] text-white text-[11px] font-semibold tracking-wider uppercase rounded flex items-center justify-center gap-1.5 shadow-[0_2px_10px_rgba(255,107,0,0.35)] transition-all"
            >
              <span className="material-symbols-outlined text-[17px]">print</span>
              <span>IMPRIMIR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
