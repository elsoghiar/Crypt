import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, ChevronDown } from "lucide-react";

type Language = {
  code: string;
  name: string;
  flag?: string;
};

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" }
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || "en");
  const [isRTL, setIsRTL] = useState(i18n.language === 'ar');
  const [isLoaded, setIsLoaded] = useState(false);

  // Update RTL status when language changes
  useEffect(() => {
    setIsRTL(i18n.language === 'ar');
  }, [i18n.language]);

  // Add loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setCurrentLang(langCode);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  return (
    <div className="relative">
      <Select value={currentLang} onValueChange={changeLanguage}>
        <SelectTrigger 
          className={`
            appearance-none bg-secondary/80 text-white py-1 px-3 text-xs rounded-md neu-input outline-none 
            w-[135px] h-9 backdrop-blur-sm border border-accent/50 hover:border-accent/90 transition-all
            ${isRTL ? 'pl-8 pr-3' : 'pl-8 pr-3'}
            ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500
          `}
        >
          <Globe className={`absolute ${isRTL ? 'right-2' : 'left-2'} top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400`} />
          <SelectValue aria-label={currentLang}>
            <span className="flex items-center gap-1.5">
              <span className="text-xs">{currentLanguage?.flag}</span>
              <span className={`${isRTL ? 'mr-0' : 'ml-0'} text-xs`}>{currentLanguage?.name || "English"}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent 
          className="bg-secondary text-white border-accent max-h-48 border border-accent/50 py-1"
          position="popper"
          align={isRTL ? "end" : "start"}
          side={isRTL ? "right" : "bottom"}
        >
          {languages.map((language) => (
            <SelectItem 
              key={language.code} 
              value={language.code} 
              className="focus:bg-accent hover:bg-accent py-2.5 cursor-pointer text-xs my-0.5 rounded-sm"
            >
              <span className="flex items-center gap-2.5">
                <span className="text-sm">{language.flag}</span>
                <span>{language.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className={`pointer-events-none absolute inset-y-0 ${isRTL ? 'left-3' : 'right-3'} flex items-center`}>
        <ChevronDown className="h-3 w-3 text-gray-400" />
      </div>
    </div>
  );
};

export default LanguageSelector;
