import { useState } from "react";
import InsuranceForm from "./InsuranceForm";
import CompanyList from "./CompanyList";
import { useTranslation } from "react-i18next";

const FormSection = () => {
  const [activeTab, setActiveTab] = useState("ОСАГО");
  const { t } = useTranslation();

  const tabs = [
    { label: t("form.osago_title"), value: "ОСАГО" },
    { label: t("form.kasko_title"), value: "КАСКО" },
    { label: t("form.travel_title"), value: "Путешествие" },
    { label: t("form.property_title"), value: "Имущество" },
  ];

  return (
    <section className="container mx-auto px-4 bg-white md:px-20 py-12">
      {/* <div className="grid lg:grid-cols-[420px_1fr] gap-8 items-start">
        <div className="bg-white rounded-2xl border border-border shadow-[0_4px_24px_-4px_rgba(14,165,233,0.1)] overflow-hidden">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.value
                    ? "bg-white text-foreground border-b-2 border-primary"
                    : "bg-teal-500 text-white hover:bg-teal-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-6">
            <InsuranceForm activeTab={activeTab} />
          </div>
        </div>
      </div> */}
      <CompanyList />
    </section>
  );
};

export default FormSection;
