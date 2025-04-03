import { useTranslation } from "react-i18next";
import { Shield, Code, HelpCircle } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-accent py-6 px-6 md:px-12 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-400">
            {t("footer.disclaimer")}
          </p>
        </div>
        
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-all">
            <Shield className="h-4 w-4 inline mr-1" /> {t("footer.security")}
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-all">
            <Code className="h-4 w-4 inline mr-1" /> {t("footer.api")}
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-all">
            <HelpCircle className="h-4 w-4 inline mr-1" /> {t("footer.help")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
