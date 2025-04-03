import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="py-6 px-6 md:px-12 flex justify-between items-center border-b border-accent">
      <div className="flex flex-col items-start">
        <div className="text-2xl font-bold">Crypt</div>
        <div className="text-sm text-gray-400 mt-1">{t("header.tagline")}</div>
      </div>
      
      <div className="flex items-center">
        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;
