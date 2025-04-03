import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="py-4 px-4 md:px-8 flex justify-between items-center border-b border-accent">
      <div className="flex flex-col items-start">
        <div className="text-xl font-bold">Crypt</div>
        <div className="text-xs text-gray-400 mt-0.5">{t("header.tagline")}</div>
      </div>
      
      <div className="flex items-center">
        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;
