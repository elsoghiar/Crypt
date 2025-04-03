import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

type Language = {
  code: string;
  name: string;
};

const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "zh", name: "中文" }
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || "en");

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setCurrentLang(langCode);
  };

  return (
    <div className="relative">
      <Select value={currentLang} onValueChange={changeLanguage}>
        <SelectTrigger className="appearance-none bg-secondary text-white py-2 pl-3 pr-10 rounded-md neu-input outline-none w-[120px]">
          <SelectValue aria-label={currentLang}>
            {languages.find(lang => lang.code === currentLang)?.name || "English"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-secondary text-white border-accent">
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code} className="focus:bg-accent hover:bg-accent">
              {language.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
};

export default LanguageSelector;
