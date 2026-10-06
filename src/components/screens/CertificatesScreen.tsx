import React, { useState } from 'react';
import { ASSETS } from '../../data/assets';
import { InspectorProfile, Certificate, LogbookEntry, Badge } from '../../types';

interface CertificatesScreenProps {
  profile: InspectorProfile;
  certificates: Certificate[];
  logbook: LogbookEntry[];
  badges: Badge[];
  onOpenQr: () => void;
  onOpenSafetyPass: () => void;
  onOpenLogbook: () => void;
  onOpenEditProfile: () => void;
  onSelectCertificate: (cert: Certificate) => void;
  onSelectBadge: (badge: Badge) => void;
}

export const CertificatesScreen: React.FC<CertificatesScreenProps> = ({
  profile,
  certificates,
  logbook,
  badges,
  onOpenQr,
  onOpenSafetyPass,
  onOpenLogbook,
  onOpenEditProfile,
  onSelectCertificate,
  onSelectBadge
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'in-progress' | 'pending'>('all');

  const filteredCerts = certificates.filter((cert) => {
    if (filterTab === 'all') return cert.status === 'aprobado';
    if (filterTab === 'in-progress') return cert.status === 'en_curso';
    if (filterTab === 'pending') return cert.status === 'por_iniciar';
    return true;
  });

  const totalLogHours = logbook.reduce((sum, item) => sum + item.hours, 0);

  return (
    <div className="flex flex-col w-full px-3.5 space-y-3.5 max-w-2xl mx-auto">
      {/* Profile Header Card (Industrial Calibrated Badge with Official Brand Identity) */}
      <section className="bg-gradient-to-b from-[#112238] to-[#0d1e33] border border-[#1d3557] rounded-xl p-3.5 shadow-lg relative overflow-hidden">
        {/* Technical Grid & Hologram Glow Strip */}
        <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#ff6b00]/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -left-8 -bottom-8 w-36 h-36 bg-[#00d2ff]/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ff6b00] via-[#00d2ff] to-[#ff6b00]"></div>
        
        {/* Watermark Official Isotype */}
        <img 
          alt="" 
          className="absolute right-[-14px] top-[-10px] w-28 h-28 opacity-10 pointer-events-none select-none" 
          src={ASSETS.watermark} 
          referrerPolicy="no-referrer"
        />

        <div className="flex items-start gap-3 relative z-10">
          {/* Avatar with Circular Arc Indicators from Logo */}
          <div className="relative shrink-0">
            <div className="w-[78px] h-[78px] rounded-full p-[3px] bg-gradient-to-tr from-[#ff6b00] via-[#00d2ff] to-[#ff6b00] shadow-[0_0_12px_rgba(255,107,0,0.35)] flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#081423] border border-[#081423]">
                <img 
                  alt={`Retrato de Inspector ${profile.name}`} 
                  className="w-full h-full object-cover" 
                  src={profile.avatarUrl} 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Calibrated Arc Sub-badge */}
            <div className="absolute -bottom-1 -right-1 bg-[#081423] text-[#4cd6fb] border border-[#1d3557] px-1.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider flex items-center gap-1 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] animate-pulse"></span>
              {profile.specialties.join(' · ')}
            </div>
          </div>

          {/* Identity & Code Details */}
          <div className="flex-1 min-w-0 flex flex-col space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="bg-[#1f2b3b] text-[#4cd6fb] border border-[#1d3557] px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold">
                {profile.level}
              </span>
              <span className="bg-[#00d2ff]/15 text-[#4cd6fb] border border-[#00d2ff]/30 px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                {profile.status}
              </span>
            </div>

            <h1 className="font-extrabold text-[21px] text-white tracking-tight truncate leading-tight mt-0.5">
              {profile.name}
            </h1>
            <p className="text-[11px] font-normal text-[#9db4d4] truncate">
              RUT: {profile.rut} | Reg. {profile.regNdt}
            </p>
            <p className="text-[11px] font-normal text-[#9db4d4] line-clamp-1">
              {profile.workplace}
            </p>
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="grid grid-cols-2 gap-2 pt-2 relative z-10">
          <button 
            onClick={onOpenEditProfile}
            className="h-10 px-3 bg-[#112238] border border-[#1d3557] hover:border-[#4cd6fb]/50 active:scale-98 transition-all text-[#d7e3f9] text-[11px] tracking-wider uppercase font-semibold rounded flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px] text-[#4cd6fb]">badge</span>
            <span>EDITAR PERFIL</span>
          </button>
          <button 
            onClick={onOpenQr}
            className="h-10 px-3 bg-[#ff6b00] hover:bg-[#e65c00] active:scale-98 transition-all text-white text-[11px] tracking-wider uppercase font-semibold rounded flex items-center justify-center gap-1.5 shadow-[0_2px_10px_rgba(255,107,0,0.35)]"
          >
            <span className="material-symbols-outlined text-[17px]">qr_code_2</span>
            <span>CREDENCIAL QR</span>
          </button>
        </div>
      </section>

      {/* Metric Gauges (4-pack Compact Dashboard with Navy/Metallic borders) */}
      <section className="grid grid-cols-2 gap-2">
        {/* Horas Prácticas */}
        <div className="bg-[#112238] border border-[#1d3557] rounded-lg p-3 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#9db4d4] uppercase tracking-wider font-semibold">Horas Práctica</span>
            <span className="material-symbols-outlined text-[18px] text-[#4cd6fb]">timelapse</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-extrabold text-2xl text-white leading-none tabular-nums">
              {profile.hoursPractica}
            </span>
            <span className="text-[11px] text-[#4cd6fb] font-semibold">hrs</span>
          </div>
          <span className="text-[11px] font-normal text-[#9db4d4] mt-1">
            +{profile.hoursWeekChange}h esta semana
          </span>
        </div>

        {/* Precisión Ensayo */}
        <div className="bg-[#112238] border border-[#1d3557] rounded-lg p-3 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#9db4d4] uppercase tracking-wider font-semibold">Precisión Ensayo</span>
            <span className="material-symbols-outlined text-[18px] text-[#4cd6fb]">target</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-extrabold text-2xl text-white leading-none tabular-nums">
              {profile.precision}
            </span>
            <span className="text-[11px] text-[#4cd6fb] font-semibold">%</span>
          </div>
          <span className="text-[11px] text-[#ff6b00] mt-1 font-semibold">
            {profile.precisionStandard}
          </span>
        </div>

        {/* Racha Activa */}
        <div className="bg-[#112238] border border-[#1d3557] rounded-lg p-3 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#9db4d4] uppercase tracking-wider font-semibold">Racha Activa</span>
            <span 
              className="material-symbols-outlined text-[18px] text-[#ff6b00]" 
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-extrabold text-2xl text-[#ff6b00] leading-none tabular-nums">
              {profile.streakDays}
            </span>
            <span className="text-[11px] text-[#ffb693] font-semibold">Días</span>
          </div>
          <span className="text-[11px] font-normal text-[#9db4d4] mt-1">
            {profile.streakStatus}
          </span>
        </div>

        {/* Nivel de Experiencia */}
        <div className="bg-[#112238] border border-[#1d3557] rounded-lg p-3 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#9db4d4] uppercase tracking-wider font-semibold">XP Acumulado</span>
            <span className="material-symbols-outlined text-[18px] text-[#afc8ec]">bolt</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-extrabold text-2xl text-[#afc8ec] leading-none tabular-nums">
              {profile.xp.toLocaleString()}
            </span>
            <span className="text-[11px] text-[#d4e3ff] font-semibold">XP</span>
          </div>
          <span className="text-[11px] font-normal text-[#9db4d4] mt-1">
            Faltan {profile.nextLevelXp - profile.xp} para Rango II
          </span>
        </div>
      </section>

      {/* Certificados Ganados & Oficiales con halo circular segmentado */}
      <section className="flex flex-col space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#ff6b00]">workspace_premium</span>
            <h2 className="font-extrabold text-base text-white tracking-tight uppercase">
              Acreditaciones NDT
            </h2>
          </div>
          <span className="text-[10px] px-2 py-0.5 bg-[#0d1e33] border border-[#1d3557] text-[#4cd6fb] rounded font-semibold tracking-wider uppercase">
            Validez 3 Años
          </span>
        </div>

        {/* Segmented Filter Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-[#040f1d] p-1 rounded-lg border border-[#1d3557]" id="cert-filter-group">
          <button 
            onClick={() => setFilterTab('all')}
            className={`py-1.5 rounded text-[11px] uppercase tracking-wider font-semibold transition-all text-center ${
              filterTab === 'all' 
                ? 'bg-[#ff6b00] text-white shadow-sm' 
                : 'text-[#9db4d4] hover:text-white'
            }`}
          >
            Aprobados (2)
          </button>
          <button 
            onClick={() => setFilterTab('in-progress')}
            className={`py-1.5 rounded text-[11px] uppercase tracking-wider font-semibold transition-all text-center ${
              filterTab === 'in-progress' 
                ? 'bg-[#ff6b00] text-white shadow-sm' 
                : 'text-[#9db4d4] hover:text-white'
            }`}
          >
            En Curso (1)
          </button>
          <button 
            onClick={() => setFilterTab('pending')}
            className={`py-1.5 rounded text-[11px] uppercase tracking-wider font-semibold transition-all text-center ${
              filterTab === 'pending' 
                ? 'bg-[#ff6b00] text-white shadow-sm' 
                : 'text-[#9db4d4] hover:text-white'
            }`}
          >
            Por Iniciar (2)
          </button>
        </div>

        {/* Render Filtered Certificates */}
        {filteredCerts.map((cert) => {
          if (cert.id === 'cert-vt-1') {
            return (
              /* Certificate 1: VT Direct Visual Inspection */
              <article key={cert.id} className="bg-[#112238] border border-[#1d3557] rounded-xl p-3.5 shadow-md space-y-2.5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d2ff]/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-11 h-11 rounded-full p-[2px] bg-gradient-to-r from-[#ff6b00] via-[#00d2ff] to-[#ff6b00] shrink-0">
                      <img 
                        alt="Icono Soldadura VT" 
                        className="w-full h-full rounded-full object-cover bg-[#081423]" 
                        src={cert.iconUrl} 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#4cd6fb] font-semibold uppercase tracking-wider block">
                        {cert.norm}
                      </span>
                      <span className="text-[10px] font-normal text-[#9db4d4]">
                        Reg: {cert.reg}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-[#081423] border border-[#00d2ff]/40 px-2 py-0.5 rounded text-[#4cd6fb] text-[10px] font-semibold uppercase shrink-0">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <span>Acreditado</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-white leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-normal text-[#9db4d4] mt-1 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-[#0d1e33] border border-[#1d3557]/80 p-2.5 rounded">
                  <div>
                    <span className="text-[10px] text-[#9db4d4] block uppercase tracking-wider font-semibold">Carga Horaria</span>
                    <span className="text-xs text-white font-semibold">{cert.hours}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#9db4d4] block uppercase tracking-wider font-semibold">Vigencia</span>
                    <span className="text-xs text-white font-semibold">{cert.validity}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button 
                    onClick={() => onSelectCertificate(cert)}
                    className="h-10 px-2.5 bg-[#0d1e33] border border-[#1d3557] hover:border-[#4cd6fb]/50 active:scale-98 transition-all text-[#d7e3f9] text-[11px] uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#4cd6fb]">visibility</span>
                    <span>Ver Credencial</span>
                  </button>
                  <button 
                    onClick={() => onSelectCertificate(cert)}
                    className="h-10 px-2.5 bg-[#1f2b3b] border border-[#ff6b00]/40 hover:bg-[#ff6b00]/15 active:scale-98 transition-all text-[#ffb693] text-[11px] uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#ff6b00]">download</span>
                    <span>Descargar PDF</span>
                  </button>
                </div>
              </article>
            );
          }

          if (cert.id === 'cert-pt-1') {
            return (
              /* Certificate 2: PT Penetrant Testing */
              <article key={cert.id} className="bg-[#112238] border border-[#1d3557] rounded-xl p-3.5 shadow-md space-y-2.5 relative overflow-hidden">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-[#ff6b00] to-[#ffb690] shrink-0">
                      <img 
                        alt="Icono Líquidos Penetrantes PT" 
                        className="w-full h-full rounded-full object-cover bg-[#081423]" 
                        src={cert.iconUrl} 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#ff6b00] font-semibold uppercase tracking-wider block">
                        {cert.norm}
                      </span>
                      <span className="text-[10px] font-normal text-[#9db4d4]">
                        Reg: {cert.reg}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-[#081423] border border-[#ff6b00]/40 px-2 py-0.5 rounded text-[#ff6b00] text-[10px] font-semibold shrink-0">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span>{cert.score}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-white leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-normal text-[#9db4d4] mt-1 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-[#0d1e33] border border-[#1d3557]/80 p-2.5 rounded">
                  <div>
                    <span className="text-[10px] text-[#9db4d4] block uppercase tracking-wider font-semibold">Acreditación</span>
                    <span className="text-xs text-white font-semibold">{cert.hours}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#9db4d4] block uppercase tracking-wider font-semibold">Examen Teórico</span>
                    <span className="text-xs text-white font-semibold">Distinción Máxima</span>
                  </div>
                </div>

                <div className="pt-1">
                  <button 
                    onClick={() => onSelectCertificate(cert)}
                    className="w-full h-10 px-3 bg-[#0d1e33] border border-[#1d3557] hover:border-[#ff6b00]/50 active:scale-98 transition-all text-[#d7e3f9] text-[11px] tracking-wider uppercase font-semibold rounded flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#ff6b00]">file_download</span>
                    <span>DESCARGAR DIPLOMA OFICIAL (PDF FIRMADO)</span>
                  </button>
                </div>
              </article>
            );
          }

          if (cert.id === 'cert-mt-1') {
            return (
              /* Certificate 3: In Progress (MT Magnetic Particle) */
              <article key={cert.id} className="bg-[#112238] border border-[#1d3557] rounded-xl p-3.5 shadow-md space-y-2.5 relative overflow-hidden">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-11 h-11 rounded-full p-[2px] bg-gradient-to-r from-[#00d2ff] to-[#ff6b00] shrink-0">
                      <img 
                        alt="Icono Partículas Magnéticas MT" 
                        className="w-full h-full rounded-full object-cover bg-[#081423]" 
                        src={cert.iconUrl} 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#afc8ec] font-semibold uppercase tracking-wider block">
                        {cert.norm}
                      </span>
                      <span className="text-[10px] font-normal text-[#9db4d4]">
                        {cert.reg}
                      </span>
                    </div>
                  </div>
                  <span className="bg-[#081423] border border-[#afc8ec]/30 text-[#afc8ec] px-2 py-0.5 rounded text-[10px] font-semibold tabular-nums">
                    {cert.progressPercent}%
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-white leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-normal text-[#9db4d4] mt-1 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Calibrated Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#9db4d4] font-normal">Progreso del Plan</span>
                    <span className="text-white font-semibold tabular-nums">
                      {cert.completedLessons} / {cert.totalLessons} Lecciones
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#040f1d] border border-[#1d3557] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#ff6b00] to-[#00d2ff] rounded-full transition-all duration-500" 
                      style={{ width: `${cert.progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Next Milestone Banner */}
                <div className="flex items-center gap-2 bg-[#0d1e33] border border-[#1d3557] p-2.5 rounded">
                  <span className="material-symbols-outlined text-[18px] text-[#ff6b00] shrink-0">alarm</span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-[#ff6b00] block uppercase font-semibold tracking-wider">
                      Próximo Hito Obligatorio
                    </span>
                    <span className="text-xs text-white truncate block font-normal">
                      {cert.nextMilestone}
                    </span>
                  </div>
                </div>
              </article>
            );
          }

          /* Other certificates (UT, RT) */
          return (
            <article key={cert.id} className="bg-[#112238] border border-[#1d3557] rounded-xl p-3.5 shadow-md space-y-2.5 relative overflow-hidden opacity-90">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-full p-[2px] bg-[#1d3557] shrink-0 flex items-center justify-center">
                    <img 
                      alt="" 
                      className="w-full h-full rounded-full object-cover bg-[#081423]" 
                      src={cert.iconUrl} 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#9db4d4] font-semibold uppercase tracking-wider block">
                      {cert.norm}
                    </span>
                    <span className="text-[10px] font-normal text-[#9db4d4]">
                      {cert.reg}
                    </span>
                  </div>
                </div>
                <span className="bg-[#081423] border border-[#1d3557] text-[#9db4d4] px-2 py-0.5 rounded text-[10px] font-semibold uppercase">
                  Por Iniciar
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-white leading-snug">
                  {cert.title}
                </h3>
                <p className="text-xs font-normal text-[#9db4d4] mt-1 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs bg-[#0d1e33] p-2.5 rounded border border-[#1d3557]">
                <span className="text-[#9db4d4]">{cert.hours}</span>
                <span className="text-[#4cd6fb] font-semibold">{cert.nextMilestone}</span>
              </div>
            </article>
          );
        })}
      </section>

      {/* Logbook NDT: Horas de Terreno Acreditadas (SNT-TC-1A) */}
      <section className="bg-[#112238] border border-[#1d3557] rounded-xl p-3.5 shadow-md space-y-3 relative overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <img 
                alt="Casos Reales Bitácora" 
                className="w-6 h-6 rounded-full object-cover shrink-0" 
                src={ASSETS.iconBitacora} 
                referrerPolicy="no-referrer"
              />
              <h2 className="font-extrabold text-base text-white tracking-tight uppercase">
                Bitácora de Terreno (Logbook)
              </h2>
            </div>
            <p className="text-[10px] font-normal text-[#9db4d4] mt-1">
              Norma SNT-TC-1A / Calificación Nivel II
            </p>
          </div>
          <span className="bg-[#081423] border border-[#1d3557] text-[#4cd6fb] text-[10px] px-2 py-0.5 rounded font-semibold uppercase tabular-nums">
            {Math.round((totalLogHours / 400) * 100)}% Meta
          </span>
        </div>

        {/* Gauge Bar */}
        <div className="bg-[#0d1e33] border border-[#1d3557] p-3 rounded space-y-2">
          <div className="flex justify-between items-baseline text-xs">
            <span className="text-[#9db4d4] uppercase tracking-wider text-[10px] font-semibold">
              Horas Acreditadas Supervisor
            </span>
            <span className="text-[#4cd6fb] font-bold text-xs tabular-nums">
              {totalLogHours} / 400 hrs
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#040f1d] rounded-full overflow-hidden flex border border-[#1d3557]">
            <div 
              className="h-full bg-gradient-to-r from-[#00d2ff] to-[#4cd6fb] transition-all rounded-full" 
              style={{ width: `${Math.min(100, (totalLogHours / 400) * 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-[#9db4d4] pt-0.5 font-normal">
            <span>Min. Nivel I: 70 hrs (OK)</span>
            <span>Requisito Nivel II: 400 hrs</span>
          </div>
        </div>

        {/* Recent Inspections Micro-Log */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#9db4d4] uppercase tracking-wider block font-semibold">
              Últimos Registros Validados
            </span>
            <button
              onClick={onOpenLogbook}
              className="text-[10px] text-[#ff6b00] hover:underline font-semibold"
            >
              + Agregar Jornada
            </button>
          </div>

          {logbook.slice(0, 2).map((entry) => (
            <div 
              key={entry.id}
              onClick={onOpenLogbook}
              className="flex items-center justify-between p-2 rounded bg-[#0d1e33] border border-[#1d3557]/80 text-xs cursor-pointer hover:border-[#4cd6fb]/40 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <img 
                  alt="Inspección Faena" 
                  className="w-4 h-4 rounded-full object-cover shrink-0" 
                  src={entry.avatarUrl} 
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <span className="text-xs text-white font-semibold block truncate">
                    {entry.company} · {entry.component}
                  </span>
                  <span className="text-[11px] font-normal text-[#9db4d4]">
                    {entry.technique} · {entry.hours} hrs
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-[#4cd6fb] shrink-0 font-semibold uppercase">
                {entry.status}
              </span>
            </div>
          ))}
        </div>

        {/* Export Action */}
        <button 
          onClick={onOpenLogbook}
          className="w-full h-11 bg-[#0d1e33] border border-[#1d3557] hover:border-[#4cd6fb]/60 active:scale-98 transition-all text-[#4cd6fb] text-xs tracking-wider uppercase font-semibold rounded flex items-center justify-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
          <span>EXPORTAR BITÁCORA VALIDADA (PDF)</span>
        </button>
      </section>

      {/* Insignias Técnicas de Especialidad (Badges Grid with Brand Archetypes) */}
      <section className="bg-[#112238] border border-[#1d3557] rounded-xl p-3.5 shadow-md space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#ff6b00]">military_tech</span>
            <h2 className="font-extrabold text-base text-white tracking-tight uppercase">
              Insignias de Competencia
            </h2>
          </div>
          <span className="text-[10px] text-[#4cd6fb] font-semibold tabular-nums">
            {badges.filter(b => b.unlocked).length} de {badges.length} Desbloqueadas
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          {badges.slice(0, 4).map((badge) => (
            <div 
              key={badge.id}
              onClick={() => onSelectBadge(badge)}
              className="p-2.5 bg-[#0d1e33] border border-[#1d3557] hover:border-[#4cd6fb]/50 rounded flex items-start gap-2.5 relative overflow-hidden cursor-pointer transition-all active:scale-98"
            >
              <div className="w-8 h-8 rounded-full p-[1px] bg-gradient-to-r from-[#ff6b00] to-[#00d2ff] shrink-0">
                <img 
                  alt={badge.title} 
                  className="w-full h-full rounded-full object-cover bg-[#081423]" 
                  src={badge.iconUrl} 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-semibold text-white truncate">
                  {badge.title}
                </h4>
                <p className="text-[10px] font-normal text-[#9db4d4] leading-tight mt-0.5 line-clamp-2">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verificación Institucional & QR Oficial */}
      <section className="bg-gradient-to-b from-[#0d1e33] to-[#081423] border border-[#1d3557] rounded-xl p-3.5 shadow-md space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#ff6b00] to-[#00d2ff] shrink-0 shadow-md">
            <img 
              alt="Sello Institucional Oficial" 
              className="w-full h-full rounded-full object-cover bg-[#081423]" 
              src={ASSETS.selloInstitucional} 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-tight truncate">
              Validación para Contratistas
            </h4>
            <p className="text-xs font-normal text-[#9db4d4] mt-0.5">
              Los supervisores de faena pueden verificar la autenticidad de tus diplomas escaneando tu código de acreditado.
            </p>
          </div>
        </div>

        <div className="p-2.5 bg-[#112238] border border-[#1d3557] rounded flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#4cd6fb]">verified_user</span>
            <span className="text-[11px] text-white font-semibold">
              Respaldado por Inst. Soldadura &amp; NDT Chile
            </span>
          </div>
          <span className="text-[10px] text-[#ff6b00] font-semibold uppercase tracking-wider">
            ACTIVO
          </span>
        </div>

        {/* Industrial Primary Action Button in Safety Orange */}
        <button 
          onClick={onOpenSafetyPass}
          className="w-full h-12 bg-[#ff6b00] hover:bg-[#e65c00] active:scale-98 transition-all text-white text-xs font-semibold tracking-wider uppercase rounded flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,107,0,0.4)]"
        >
          <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
          <span>GENERAR PASE DE SEGURIDAD PARA FAENA</span>
        </button>
      </section>
    </div>
  );
};
