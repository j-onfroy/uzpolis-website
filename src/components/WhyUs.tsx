import { Zap, Shield, Smartphone, HeartHandshake, Clock, BadgeCheck } from 'lucide-react'

const features = [
  { icon: Zap, title: '5 daqiqada', desc: 'Polisni 5 daqiqada rasmiylashtirishingiz mumkin' },
  { icon: Shield, title: 'Ishonchli', desc: "Markaziy bank tomonidan litsenziyalangan kompaniyalar" },
  { icon: Smartphone, title: 'Mobile ilovada', desc: "Polislaringizni ilovada saqlang va boshqaring" },
  { icon: HeartHandshake, title: "Yordam 24/7", desc: "Istalgan vaqtda murojaat qiling" },
  { icon: Clock, title: "Tez to'lov", desc: "Zararni tezda qoplash kafolati" },
  { icon: BadgeCheck, title: "15+ kompaniya", desc: "Eng yaxshi narxni tanglash imkoni" },
]

export default function WhyUs() {
  return (
    <section className="py-16 md:py-20 bg-bg">
      <div className="max-w-[1216px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[24px] font-bold text-ink tracking-tight">Nima uchun uzpolis?</h2>
          <p className="text-mute mt-3 max-w-lg mx-auto">
            O'zbekistondagi yetakchi online sug'urta platformasi
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-[18px] p-6 shadow-sm flex gap-4 items-start">
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <f.icon size={20} className="text-blue-2" />
              </div>
              <div>
                <h3 className="font-bold text-ink">{f.title}</h3>
                <p className="text-mute text-sm mt-1 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
