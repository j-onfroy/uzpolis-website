import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Shield,
  ChevronRight,
  ChevronLeft,
  FileText,
  CheckCircle2,
  Car,
  User,
  Palette,
  Calendar,
  Hash,
  AlertCircle,
  Loader2,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { osagoCalculate, osagoCreateContract, osagoSmsSend, osagoSmsVerify, type OsagoCalculateResponse } from '@/service/apis/osago.api';

const PERIOD_LABELS: Record<number, string> = { 1: '3 oy', 2: '12 oy' };

const inp =
  'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none bg-white transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 placeholder:text-gray-400';
const lbl = 'block text-xs font-medium text-gray-500 mb-1.5';

const InfoCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3">
    <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Icon className="w-4 h-4 text-blue-600" />
    </div>
    <div>
      <p className="text-[11px] text-gray-400 leading-none mb-1">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value || '—'}</p>
    </div>
  </div>
);

const InsuranceRegistration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [phase, setPhase] = useState<'calculate' | 'contract'>('calculate');

  // Calculation fields
  const [gosNumber, setGosNumber] = useState('');
  const [techSery, setTechSery] = useState('');
  const [techNumber, setTechNumber] = useState('');
  const [periodId, setPeriodId] = useState(1);
  const [limited, setLimited] = useState(false);
  const [drivers, setDrivers] = useState<number[]>([]);
  const [driverInput, setDriverInput] = useState('');
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcError, setCalcError] = useState<string | null>(null);
  const [calcResult, setCalcResult] = useState<OsagoCalculateResponse | null>(null);

  // Contract fields
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [ownerSeriya, setOwnerSeriya] = useState('');
  const [ownerNumber, setOwnerNumber] = useState('');
  const [ownerInn, setOwnerInn] = useState('');
  const [driverEntries, setDriverEntries] = useState([{ passSeriya: '', passNumber: '', birthDate: '' }]);

  const updateDriver = (idx: number, field: 'passSeriya' | 'passNumber' | 'birthDate', val: string) =>
    setDriverEntries((prev) => prev.map((d, i) => (i === idx ? { ...d, [field]: val } : d)));
  const addDriver = () =>
    setDriverEntries((prev) => [...prev, { passSeriya: '', passNumber: '', birthDate: '' }]);
  const removeDriver = (idx: number) =>
    setDriverEntries((prev) => prev.filter((_, i) => i !== idx));
  const [contractLoading, setContractLoading] = useState(false);
  const [contractError, setContractError] = useState<string | null>(null);

  // SMS verification
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [smsCode, setSmsCode] = useState('');
  const [smsLoading, setSmsLoading] = useState(false);
  const [smsError, setSmsError] = useState<string | null>(null);

  const handleGosNumber = (val: string) => {
    const raw = val.replace(/\s/g, '').toUpperCase();
    if (!raw) { setGosNumber(''); return; }
    if (/^\d/.test(raw)) {
      // Format: 3 digits + 3 letters (e.g., 641BNA)
      const chars: string[] = [];
      let dc = 0, lc = 0;
      for (const ch of raw) {
        if (dc < 3 && /\d/.test(ch)) { chars.push(ch); dc++; }
        else if (dc === 3 && lc < 3 && /[A-Z]/.test(ch)) { chars.push(ch); lc++; }
        if (lc >= 3) break;
      }
      if (!chars.length) { setGosNumber(''); return; }
      let out = chars.slice(0, 3).join('');
      if (chars.length > 3) out += ' ' + chars.slice(3).join('');
      setGosNumber(out);
    } else {
      // Format: 1 letter + 3 digits + 2 letters (e.g., A123AB)
      const chars: string[] = [];
      let pos = 0;
      for (const ch of raw) {
        if (pos === 0 && /[A-Z]/.test(ch)) { chars.push(ch); pos++; }
        else if (pos >= 1 && pos <= 3 && /\d/.test(ch)) { chars.push(ch); pos++; }
        else if (pos >= 4 && pos <= 5 && /[A-Z]/.test(ch)) { chars.push(ch); pos++; }
        if (pos > 5) break;
      }
      if (!chars.length) { setGosNumber(''); return; }
      let out = chars[0];
      if (chars.length >= 2) out += ' ' + chars.slice(1, Math.min(4, chars.length)).join('');
      if (chars.length >= 5) out += ' ' + chars.slice(4).join('');
      setGosNumber(out);
    }
  };

  const canCalculate =
    gosNumber.replace(/\s/g, '').length === 6 &&
    techSery.length >= 2 &&
    techNumber.length === 7;

  const isLimited = calcResult?.limited ?? false;
  const isJuridic = !calcResult?.individual ;

  const canSubmitContract =
    phoneNumber.replace(/\D/g, '').length === 12 &&
    !!startDate &&
    (isJuridic ? ownerInn.length >= 9 : ownerSeriya.length === 2 && ownerNumber.length === 7) &&
    (!isLimited || (driverEntries.length > 0 && driverEntries.every((d) => d.passSeriya.length === 2 && d.passNumber.length === 7 && !!d.birthDate)));

  const handleCalculate = async () => {
    setCalcLoading(true);
    setCalcError(null);
    try {
      const result = await osagoCalculate({
        gosNumber: '01' + gosNumber.replace(/\s/g, ''),
        techSery,
        techNumber,
        periodId,
        limited,
        drivers,
      });
      setCalcResult(result);
      setPhase('contract');
      window.scrollTo(0, 0);
    } catch (err: any) {
      setCalcError(err?.response?.data?.error ?? 'Hisoblashda xatolik yuz berdi.');
    } finally {
      setCalcLoading(false);
    }
  };

  const formattedPhone = '+' + phoneNumber.replace(/\D/g, '');

  const handleSendSms = async () => {
    if (!calcResult) return;
    setContractLoading(true);
    setContractError(null);
    try {
      await osagoSmsSend(formattedPhone);
      setSmsCode('');
      setSmsError(null);
      setShowSmsModal(true);
    } catch (err: any) {
      setContractError(err?.response?.data?.error ?? 'SMS yuborishda xatolik yuz berdi.');
    } finally {
      setContractLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!calcResult) return;
    setSmsLoading(true);
    setSmsError(null);
    try {
      const { identity } = await osagoSmsVerify(formattedPhone, smsCode);
      const contract = await osagoCreateContract({
        calculationId: calcResult.id,
        identity,
        startDate,
        phoneNumber: formattedPhone,
        owner: isJuridic
          ? { organization: { inn: ownerInn } }
          : { person: { passSeriya: ownerSeriya, passNumber: ownerNumber } },
        drivers: isLimited ? driverEntries : [],
      });
      setShowSmsModal(false);
      navigate('/osago/payment', { state: { contract } });
    } catch (err: any) {
      setSmsError(err?.response?.data?.error ?? 'Kod noto\'g\'ri yoki muddati tugagan.');
    } finally {
      setSmsLoading(false);
    }
  };

  const steps = [
    { num: 1, label: 'Hisoblash', sub: "Avtomobil ma'lumotlari", active: phase === 'calculate' },
    { num: 2, label: 'Ariza', sub: "Shaxsiy ma'lumotlar", active: phase === 'contract' },
    { num: 3, label: "To'lov", sub: 'Payme / Click', active: false },
    { num: 4, label: 'Polis tayyor', sub: 'Yuklab olish', active: false },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
    const state = location.state as any;
    if (state?.calcResult) {
      setCalcResult(state.calcResult);
      setPhase('contract');
      if (state.formData) {
        const fd = state.formData;
        setGosNumber(fd.gosNumber ?? '');
        setTechSery(fd.techSery ?? '');
        setTechNumber(fd.techNumber ?? '');
        setPeriodId(fd.periodId ?? 1);
        setLimited(fd.limited ?? false);
      }
    }
  }, [])
  return (
    <div className="min-h-screen bg-[#f5f7fb] pb-20">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
            {['Bosh sahifa', 'OSAGO', 'Rasmiylashtrish'].map((crumb, i, arr) => (
              <React.Fragment key={crumb}>
                <span className={i === arr.length - 1 ? 'text-gray-600 font-medium' : 'hover:text-blue-600 cursor-pointer'}>
                  {crumb}
                </span>
                {i < arr.length - 1 && <ChevronRight className="w-3 h-3 flex-shrink-0" />}
              </React.Fragment>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">OSAGO sug'urtasi</h1>
          <p className="text-sm text-gray-500 mt-1">
            Avtomobil ma'lumotlarini kiriting — narxni hisoblang va polis rasmiylashtiring.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Step indicator */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-3.5 mb-5">
          <div className="flex items-center">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${step.active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                    {step.num}
                  </div>
                  <div className="min-w-0 hidden sm:block">
                    <p className={`text-xs font-semibold truncate leading-tight ${step.active ? 'text-blue-600' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                    <p className="text-[10px] text-gray-400 truncate leading-tight mt-0.5">{step.sub}</p>
                  </div>
                </div>
                {idx < steps.length - 1 && <div className="h-px w-6 bg-gray-200 mx-1 flex-shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* ── Left column ── */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Phase 1: Calculation form */}
            {phase === 'calculate' && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">01</span>
                  <span className="text-sm font-semibold text-gray-900">Avtomobil ma'lumotlari</span>
                </div>
                <div className="p-5 space-y-4">
                  {/* Plate */}
                  <div>
                    <label className={lbl}>Davlat raqami *</label>
                    <div className={`flex items-stretch border rounded-xl overflow-hidden transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 border-gray-200 bg-white`}>
                      <div className="flex flex-col items-center justify-center px-3 bg-gray-50 border-r border-gray-200 flex-shrink-0">
                        <span className="text-xs font-bold text-gray-700 leading-none">01</span>
                        <span className="text-[9px] text-gray-400 leading-none mt-0.5">UZ</span>
                      </div>
                      <input
                        className="flex-1 px-3 py-2.5 text-sm outline-none bg-white placeholder:text-gray-400"
                        placeholder="A 123 BC"
                        value={gosNumber}
                        onChange={(e) => handleGosNumber(e.target.value)}
                        maxLength={8}
                      />
                    </div>
                  </div>

                  {/* Tech passport */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={lbl}>Texpassport seriyasi *</label>
                      <input
                        className={inp}
                        placeholder="AAC"
                        value={techSery}
                        maxLength={3}
                        onChange={(e) =>
                          setTechSery(e.target.value.replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 3))
                        }
                      />
                    </div>
                    <div>
                      <label className={lbl}>Texpassport raqami *</label>
                      <input
                        className={inp}
                        placeholder="0000000"
                        inputMode="numeric"
                        value={techNumber}
                        maxLength={7}
                        onChange={(e) => setTechNumber(e.target.value.replace(/\D/g, '').slice(0, 7))}
                      />
                    </div>
                  </div>

                  {/* Period */}
                  <div>
                    <label className={lbl}>Muddat *</label>
                    <div className="flex gap-2">
                      {([1, 2] as const).map((id) => (
                        <button
                          key={id}
                          onClick={() => setPeriodId(id)}
                          className={`flex-1 py-2.5 text-xs font-semibold rounded-xl border transition-all ${periodId === id
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                            }`}
                        >
                          {PERIOD_LABELS[id]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Drivers */}
                  <div>
                    <label className={lbl}>Haydovchilar (JSHSHIR)</label>
                    <div className="flex gap-2">
                      <input
                        className={inp + ' flex-1'}
                        placeholder="Haydovchi JSHSHIR raqami"
                        inputMode="numeric"
                        maxLength={14}
                        value={driverInput}
                        onChange={(e) => setDriverInput(e.target.value.replace(/\D/g, '').slice(0, 14))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && driverInput.length === 14) {
                            setDrivers((prev) => [...prev, Number(driverInput)]);
                            setDriverInput('');
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          if (driverInput.length === 14) {
                            setDrivers((prev) => [...prev, Number(driverInput)]);
                            setDriverInput('');
                          }
                        }}
                        disabled={driverInput.length !== 14}
                        className="px-4 py-2.5 bg-blue-600 text-white text-xs font-semibold rounded-xl disabled:opacity-40 transition hover:bg-blue-700 flex-shrink-0"
                      >
                        Qo'shish
                      </button>
                    </div>
                    {drivers.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {drivers.map((d, i) => (
                          <span key={i} className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-lg">
                            {d}
                            <button
                              onClick={() => setDrivers((prev) => prev.filter((_, idx) => idx !== i))}
                              className="text-blue-400 hover:text-blue-700 leading-none"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Limited toggle */}
                  <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-800">Haydovchilar cheklovi</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {limited
                          ? "Cheklangan — faqat ko'rsatilgan haydovchilar"
                          : 'Cheklanmagan — istalgan haydovchi'}
                      </p>
                    </div>
                    <button
                      onClick={() => setLimited((p) => !p)}
                      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ml-3 ${limited ? 'bg-blue-600' : 'bg-gray-200'}`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${limited ? 'left-6' : 'left-1'}`}
                      />
                    </button>
                  </div>

                  {calcError && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-red-600">{calcError}</p>
                    </div>
                  )}

                  <button
                    onClick={handleCalculate}
                    disabled={calcLoading || !canCalculate}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  >
                    {calcLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>Narxni hisoblash <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Phase 2: Result + Contract form */}
            {phase === 'contract' && calcResult && (
              <>
                {/* Price banner */}
                <div className="bg-blue-600 rounded-2xl px-6 py-5 flex items-center justify-between text-white">
                  <div>
                    <p className="text-sm text-blue-200 mb-1">To'lov miqdori</p>
                    <p className="text-3xl font-extrabold">
                      {Number(calcResult.amountUzs).toLocaleString('uz-UZ')}
                      <span className="text-base font-normal text-blue-200 ml-1">so'm</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-blue-200 mb-1">Muddat</div>
                    <div className="text-lg font-bold">{PERIOD_LABELS[calcResult.periodId]}</div>
                    <div className="text-xs text-blue-200 mt-1">
                      {calcResult.limited ? 'Cheklangan' : 'Cheklanmagan'}
                    </div>
                  </div>
                </div>

                {/* Vehicle info */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        01
                      </span>
                      <span className="text-sm font-semibold text-gray-900">Avtomobil ma'lumotlari</span>
                    </div>
                    <button
                      onClick={() => { setPhase('calculate'); setCalcResult(null); }}
                      className="text-xs text-blue-600 font-medium hover:underline"
                    >
                      O'zgartirish
                    </button>
                  </div>
                  <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InfoCard icon={User} label="Egasi" value={calcResult.owner} />
                    <InfoCard icon={Car} label="Marka / Model" value={`${calcResult.markaName} ${calcResult.modelName}`} />
                    <InfoCard icon={Palette} label="Rang" value={calcResult.vehicleColor} />
                    <InfoCard icon={Calendar} label="Ishlab chiqarilgan yil" value={String(calcResult.issueYear)} />
                    <InfoCard icon={Hash} label="Davlat raqami" value={calcResult.gosNumber} />
                    <InfoCard icon={FileText} label="Texpassport" value={`${calcResult.techSery} ${calcResult.techNumber}`} />
                  </div>
                </div>

                {/* Contract form */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100">
                    <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      02
                    </span>
                    <span className="text-sm font-semibold text-gray-900">Ariza ma'lumotlari</span>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={lbl}>Telefon raqami *</label>
                        <input
                          className={inp}
                          placeholder="998 00 000 00 00"
                          inputMode="numeric"
                          value={phoneNumber}
                          onChange={(e) => {
                            const d = e.target.value.replace(/\D/g, '').slice(0, 12);
                            let out = d;
                            if (d.length > 3) out = d.slice(0, 3) + ' ' + d.slice(3);
                            if (d.length > 5) out = d.slice(0, 3) + ' ' + d.slice(3, 5) + ' ' + d.slice(5);
                            if (d.length > 8) out = d.slice(0, 3) + ' ' + d.slice(3, 5) + ' ' + d.slice(5, 8) + ' ' + d.slice(8);
                            if (d.length > 10) out = d.slice(0, 3) + ' ' + d.slice(3, 5) + ' ' + d.slice(5, 8) + ' ' + d.slice(8, 10) + ' ' + d.slice(10);
                            setPhoneNumber(out);
                          }}
                        />
                      </div>
                      <div>
                        <label className={lbl}>Boshlanish sanasi *</label>
                        <input
                          type="date"
                          className={inp}
                          value={startDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                    </div>

                    {isJuridic ? (
                      <div>
                        <label className={lbl}>Tashkilot INN *</label>
                        <input
                          className={inp}
                          placeholder="123456789"
                          inputMode="numeric"
                          maxLength={9}
                          value={ownerInn}
                          onChange={(e) => setOwnerInn(e.target.value.replace(/\D/g, '').slice(0, 9))}
                        />
                      </div>
                    ) : (
                      <>
                        <p className="text-xs font-semibold text-gray-500">Egasi pasporti</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className={lbl}>Seriya</label>
                            <input
                              className={inp}
                              placeholder="AB"
                              maxLength={2}
                              value={ownerSeriya}
                              onChange={(e) =>
                                setOwnerSeriya(e.target.value.replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 2))
                              }
                            />
                          </div>
                          <div>
                            <label className={lbl}>Raqam</label>
                            <input
                              className={inp}
                              placeholder="0000000"
                              maxLength={7}
                              inputMode="numeric"
                              value={ownerNumber}
                              onChange={(e) => setOwnerNumber(e.target.value.replace(/\D/g, '').slice(0, 7))}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {isLimited && (
                      <>
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-gray-500">Haydovchilar pasporti</p>
                          {driverEntries.length < 5 && (
                            <button
                              type="button"
                              onClick={addDriver}
                              className="text-xs text-blue-600 font-medium hover:underline"
                            >
                              + Haydovchi qo'shish
                            </button>
                          )}
                        </div>

                        {driverEntries.map((d, idx) => (
                          <div key={idx} className="border border-gray-100 rounded-xl p-3 space-y-3 bg-gray-50">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-gray-600">{idx + 1}-haydovchi</span>
                              {driverEntries.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeDriver(idx)}
                                  className="text-xs text-red-400 hover:text-red-600"
                                >
                                  O'chirish
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className={lbl}>Seriya</label>
                                <input
                                  className={inp}
                                  placeholder="AB"
                                  maxLength={2}
                                  value={d.passSeriya}
                                  onChange={(e) =>
                                    updateDriver(idx, 'passSeriya', e.target.value.replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 2))
                                  }
                                />
                              </div>
                              <div>
                                <label className={lbl}>Raqam</label>
                                <input
                                  className={inp}
                                  placeholder="0000000"
                                  maxLength={7}
                                  inputMode="numeric"
                                  value={d.passNumber}
                                  onChange={(e) =>
                                    updateDriver(idx, 'passNumber', e.target.value.replace(/\D/g, '').slice(0, 7))
                                  }
                                />
                              </div>
                            </div>
                            <div>
                              <label className={lbl}>Tug'ilgan sana</label>
                              <input
                                type="date"
                                className={inp}
                                value={d.birthDate}
                                onChange={(e) => updateDriver(idx, 'birthDate', e.target.value)}
                              />
                            </div>
                          </div>
                        ))}
                      </>
                    )}

                    {contractError && (
                      <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-red-600">{contractError}</p>
                      </div>
                    )}

                    <button
                      onClick={handleSendSms}
                      disabled={contractLoading || !canSubmitContract}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200"
                    >
                      {contractLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>Ariza yuborish <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ── Right sidebar ── */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-5">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 leading-none mb-1">OSAGO</p>
                  <p className="text-sm font-bold text-gray-900 leading-tight">Majburiy sug'urta</p>
                </div>
              </div>

              <div className="px-5 py-4 space-y-2.5 border-b border-gray-100">
                {[
                  { label: 'Polis turi', value: 'OSAGO' },
                  { label: 'Muddat', value: calcResult ? PERIOD_LABELS[calcResult.periodId] : '—' },
                  {
                    label: 'Haydovchilar',
                    value: calcResult ? (calcResult.limited ? 'Cheklangan' : 'Cheklanmagan') : '—',
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{label}</span>
                    <span className="text-xs font-semibold text-gray-800">{value}</span>
                  </div>
                ))}
              </div>

              <div className="px-5 pt-3 pb-4">
                <div className="flex items-center justify-between  border-gray-100 pt-3">
                  <span className="text-sm font-semibold text-gray-800">Jami to'lov</span>
                  <div className="text-right">
                    {calcResult ? (
                      <>
                        <span className="text-base font-bold text-gray-900">
                          {Number(calcResult.amountUzs).toLocaleString('uz-UZ')}
                        </span>
                        <span className="text-xs font-normal text-gray-500 ml-1">so'm</span>
                      </>
                    ) : (
                      <span className="text-sm text-gray-400">Hisoblang</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SMS verification modal */}
      {showSmsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="px-6 pt-6 pb-5">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 text-center">SMS tasdiqlash</h2>
              <p className="text-sm text-gray-500 text-center mt-1">
                <span className="font-semibold text-gray-700">{formattedPhone}</span> raqamiga kod yuborildi
              </p>

              <div className="mt-5">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Tasdiqlash kodi</label>
                <input
                  className="w-full px-4 py-3 text-center text-2xl font-bold tracking-[0.5em] border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-colors"
                  placeholder="————"
                  inputMode="numeric"
                  maxLength={4}
                  value={smsCode}
                  onChange={(e) => { setSmsCode(e.target.value.replace(/\D/g, '').slice(0, 4)); setSmsError(null); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' && smsCode.length >= 4) handleVerifyCode(); }}
                  autoFocus
                />
              </div>

              {smsError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 mt-3">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-xs text-red-600">{smsError}</p>
                </div>
              )}

              <button
                onClick={handleVerifyCode}
                disabled={smsLoading || smsCode.length < 4}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {smsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Tasdiqlash <ArrowRight className="w-4 h-4" /></>}
              </button>

              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={() => { setShowSmsModal(false); setSmsCode(''); setSmsError(null); }}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={async () => { setSmsCode(''); setSmsError(null); try { await osagoSmsSend(formattedPhone); } catch { setSmsError('Qayta yuborishda xatolik.'); } }}
                  className="text-xs text-blue-600 font-medium hover:underline"
                >
                  Qayta yuborish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed bottom nav */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={() => (phase === 'contract' ? setPhase('calculate') : navigate(-1))}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            Orqaga
          </button>
          <span className="text-xs text-gray-400 hidden sm:block">
            {phase === 'calculate' ? "Bosqich 1: Hisoblash" : "Bosqich 2: Ariza"}
          </span>
          {phase === 'calculate' ? (
            <button
              onClick={handleCalculate}
              disabled={calcLoading || !canCalculate}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition"
            >
              {calcLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Hisoblash <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          ) : (
            <button
              onClick={handleSendSms}
              disabled={contractLoading || !canSubmitContract}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition"
            >
              {contractLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Ariza yuborish <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsuranceRegistration;
