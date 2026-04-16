import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface FormConfig {
  fields: { label: string; placeholder: string; type?: string; half?: boolean }[];
  radio?: { label: string; options: string[] };
}

const formConfigs: Record<string, FormConfig> = {
  ОСАГО: {
    fields: [
      { label: "Гос. номер", placeholder: "01A001AA" },
      { label: "Серия тех. паспорта", placeholder: "AAA", half: true },
      { label: "Номер тех. паспорта", placeholder: "0000000", half: true },
    ],
    radio: { label: "Количество водителей", options: ["Не ограничено", "Ограничено до 5 человек"] },
  },
  КАСКО: {
    fields: [
      { label: "Марка автомобиля", placeholder: "Chevrolet" },
      { label: "Модель", placeholder: "Nexia" },
      { label: "Год выпуска", placeholder: "2020" },
    ],
  },
  Путешествие: {
    fields: [
      { label: "Страна назначения", placeholder: "Турция" },
      { label: "Дата выезда", placeholder: "01.01.2026", type: "date" },
      { label: "Дата возврата", placeholder: "15.01.2026", type: "date" },
    ],
  },
  Имущество: {
    fields: [
      { label: "Тип имущества", placeholder: "Квартира" },
      { label: "Адрес", placeholder: "г. Ташкент, ул. ..." },
      { label: "Площадь (м²)", placeholder: "65" },
    ],
  },
};

interface Props {
  activeTab: string;
}

const InsuranceForm = ({ activeTab }: Props) => {
  const [radioValue, setRadioValue] = useState("unlimited");
  const config = formConfigs[activeTab];

  return (
    <div className="animate-fade-in space-y-5 bg-white">
      <div className="flex flex-wrap gap-4">
        {config.fields.map((field) => (
          <div key={field.label} className={field.half ? "flex-1 min-w-[120px]" : "w-full"}>
            <Label className="text-sm font-medium text-foreground/80 mb-1.5 block">{field.label}</Label>
            <Input placeholder={field.placeholder} type={field.type || "text"} className="bg-background" />
          </div>
        ))}
      </div>
      {config.radio && (
        <div>
          <Label className="text-sm font-medium text-foreground/80 mb-2 block">{config.radio.label}</Label>
          <RadioGroup value={radioValue} onValueChange={setRadioValue} className="space-y-2">
            {config.radio.options.map((opt, i) => (
              <div key={opt} className="flex items-center gap-2">
                <RadioGroupItem value={i === 0 ? "unlimited" : "limited"} id={`radio-${i}`} />
                <Label htmlFor={`radio-${i}`} className="text-sm cursor-pointer">{opt}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
      <Button className="w-full text-base font-semibold h-12">Расчет</Button>
    </div>
  );
};

export default InsuranceForm;
