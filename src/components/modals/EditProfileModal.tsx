import React, { useState } from 'react';
import { InspectorProfile } from '../../types';

interface EditProfileModalProps {
  profile: InspectorProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Partial<InspectorProfile>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSave
}) => {
  const [name, setName] = useState(profile.name);
  const [rut, setRut] = useState(profile.rut);
  const [workplace, setWorkplace] = useState(profile.workplace);
  const [phone, setPhone] = useState(profile.phone || '+56 9 8452 3910');
  const [email, setEmail] = useState(profile.email || 'm.rojas.ndt@inspeccionsoldadurachile.cl');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, rut, workplace, phone, email });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-sm bg-gradient-to-b from-[#112238] to-[#081423] border border-[#1d3557] rounded-2xl shadow-2xl overflow-hidden p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#1d3557] pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff6b00] text-[20px]">badge</span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Editar Perfil Inspector
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-[#112238] hover:bg-[#1d3557] text-[#9db4d4] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="text-[10px] text-[#9db4d4] uppercase block mb-1">Nombre Completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#081423] border border-[#1d3557] text-white rounded p-2 outline-none focus:border-[#ff6b00]"
              required
            />
          </div>

          <div>
            <label className="text-[10px] text-[#9db4d4] uppercase block mb-1">RUT Chileno</label>
            <input
              type="text"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              className="w-full bg-[#081423] border border-[#1d3557] text-white rounded p-2 outline-none focus:border-[#ff6b00]"
              required
            />
          </div>

          <div>
            <label className="text-[10px] text-[#9db4d4] uppercase block mb-1">Faena / Lugar de Trabajo</label>
            <input
              type="text"
              value={workplace}
              onChange={(e) => setWorkplace(e.target.value)}
              className="w-full bg-[#081423] border border-[#1d3557] text-white rounded p-2 outline-none focus:border-[#ff6b00]"
              required
            />
          </div>

          <div>
            <label className="text-[10px] text-[#9db4d4] uppercase block mb-1">Teléfono Contacto</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#081423] border border-[#1d3557] text-white rounded p-2 outline-none focus:border-[#ff6b00]"
            />
          </div>

          <div>
            <label className="text-[10px] text-[#9db4d4] uppercase block mb-1">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#081423] border border-[#1d3557] text-white rounded p-2 outline-none focus:border-[#ff6b00]"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-10 bg-[#0d1e33] border border-[#1d3557] text-[#9db4d4] text-xs font-semibold rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 h-10 bg-[#ff6b00] hover:bg-[#e65c00] text-white text-xs font-semibold rounded shadow-[0_2px_10px_rgba(255,107,0,0.35)]"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
