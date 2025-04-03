import { useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { Shield, Lock } from "lucide-react";

const Header = () => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Add loading animation effect on first render
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="py-4 px-4 md:px-8 flex justify-between items-center border-b border-accent overflow-hidden">
      <div 
        className={`flex items-center transition-all duration-700 transform ${
          loaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
        }`}
      >
        <div className="mr-3 relative">
          <div className={`transition-all duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
            <div className="w-10 h-10 relative flex items-center justify-center">
              <Shield className="w-10 h-10 text-success/70" />
              <Lock className="w-5 h-5 text-white absolute" />
            </div>
          </div>
          <div className={`absolute top-0 left-0 w-10 h-10 rounded-full bg-success/20 animate-ping ${loaded ? "opacity-0" : "opacity-60"} transition-opacity duration-700`}></div>
        </div>
        <div className="flex flex-col items-start">
          <div className="text-xl font-bold flex items-center">
            Crypt
            <span className="ml-2 text-xs bg-accent/30 text-success/80 px-1.5 py-0.5 rounded-md">Beta</span>
          </div>
          <div className="text-xs text-gray-400 mt-0.5">{t("header.tagline")}</div>
        </div>
      </div>
      
      <div 
        className={`flex items-center transition-all duration-700 transform ${
          loaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
        }`}
      >
        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;
