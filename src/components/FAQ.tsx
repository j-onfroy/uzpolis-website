import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'OSAGO polisini online qanday olish mumkin?',
    a: "Saytimizda OSAGO bo'limiga o'ting, avtomobil raqamingizni kiriting, kerakli ma'lumotlarni to'ldiring va to'lovni amalga oshiring. Polis darhol emailingizga yuboriladi.",
  },
  {
    q: "Polis qog'oz shaklda kerakmi?",
    a: "Yo'q. Elektron polis qog'oz polisga teng kuchga ega va rasmiy hujjat hisoblanadi. Uni telefoningizda saqlashingiz mumkin.",
  },
  {
    q: "To'lovni qanday usulda amalga oshirish mumkin?",
    a: "Bank kartasi (Uzcard, Humo, Visa, Mastercard), bank o'tkazmasi va boshqa qulay to'lov usullari mavjud.",
  },
  {
    q: "Sug'urta hodisasi yuz berganda nima qilish kerak?",
    a: "Bizning 24/7 qo'llab-quvvatlash xizmatiga murojaat qiling. Operatorlarimiz sizga zarur ko'rsatmalar berishadi va sug'urta kompaniyasi bilan bog'liq barcha masalalarni hal qilishda yordam beradi.",
  },
  {
    q: "Polisni bekor qilish mumkinmi?",
    a: "Ha, muddatidan oldin bekor qilish mumkin. Foydalanilmagan muddat uchun to'lov qaytariladi. Batafsil ma'lumot uchun shartlar va qoidalar bo'limiga qarang.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1216px] mx-auto px-4">
        <div className="grid md:grid-cols-[380px,1fr] gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight">
              Ko'p so'raladigan savollar
            </h2>
            <p className="text-mute mt-4 leading-relaxed">
              Qo'shimcha savollaringiz bo'lsa, chat-bot yoki telefon orqali biz bilan bog'laning.
            </p>
            <a
              href="#"
              className="inline-block mt-6 bg-blue-50 text-blue-2 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-blue-100 transition-colors"
            >
              Barchasi →
            </a>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-line rounded-[14px] overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-ink hover:bg-bg transition-colors"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 ml-4 text-mute transition-transform ${open === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {open === i && (
                  <div className="px-5 pb-4 text-sm text-mute leading-relaxed border-t border-line bg-bg/50">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
