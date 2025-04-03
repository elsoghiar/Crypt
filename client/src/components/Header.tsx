import { useState } from "react";
import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(true);
  
  // Toggle dark mode functionality would be implemented here
  // For now, we are always in dark mode as per the design
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="py-6 px-6 md:px-12 flex justify-between items-center border-b border-accent">
      <div className="flex items-center">
        <div className="text-2xl font-bold mr-2">Crypt</div>
        <div className="text-sm text-gray-400">{t("header.tagline")}</div>
      </div>
      
      <div className="flex items-center space-x-4">
        <LanguageSelector />
        
        <Button
          variant="outline"
          className="bg-secondary hover:bg-accent transition-all p-2 rounded-md neu-card"
          onClick={toggleDarkMode}
          aria-label={t("header.toggleDarkMode")}
        >
          <Moon className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
