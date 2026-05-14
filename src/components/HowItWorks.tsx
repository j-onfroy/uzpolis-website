import { ClipboardList, CreditCard, FileCheck, Headphones } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: "Mahsulot tanlang",
    desc: "OSAGO, KASKO, sayohat yoki boshqa sug'urta turini tanlang.",
  },
  {
    icon: ClipboardList,
    step: '02',
    title: "Ma'lumot kiriting",
    desc: "Shaxsiy ma'lumotlar va avtomobilingiz haqida ma'lumot kiriting.",
  },
  {
    icon: CreditCard,
    step: '03',
    title: "To'lov qiling",
    desc: "Online to'lov: karta yoki bank o'tkazmasi orqali to'lang.",
  },
  {
    icon: FileCheck,
    step: '04',
    title: "Polisni oling",
    desc: "Polis elektron shaklda darhol emailingizga yuboriladi.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1216px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight">Qanday ishlaydi?</h2>
          <p className="text-mute mt-3 max-w-lg mx-auto">
            Sug'urta polisini olish uchun atigi 4 ta oddiy qadam
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.step} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-line z-0" style={{ width: 'calc(100% - 32px)', left: 'calc(50% + 16px)' }} />
              )}
              <div className="relative z-10 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center relative">
                  <step.icon size={24} className="text-blue-2" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-2 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-ink">{step.title}</h3>
                  <p className="text-mute text-sm mt-1.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-12 bg-[#0B1B3D] rounded-[22px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
              <Headphones size={28} />
            </div>
            <div>
              <p className="font-bold text-lg">24/7 Qo'llab-quvvatlash</p>
              <p className="text-white/70 text-sm">Har qanday savolga javob berishga tayyormiz</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
          
            {/* <a href="#" className="bg-blue-2 hover:bg-blue-2/90 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors">
              Chat-bot
            </a> */}
          </div>
        </div>
      </div>
    </section>
  )
}
