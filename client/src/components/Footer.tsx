import { useTranslation } from "react-i18next";
import { MessageCircle } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-accent py-5 px-4 md:px-10 mt-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-3 md:mb-0">
          <p className="text-xs text-gray-400">
            {t("footer.disclaimer")}
          </p>
        </div>
        
        <div className="flex items-center">
          <span className="text-xs text-gray-400 mr-2">Created by Mr - M.</span>
          <a 
            href="https://t.me/eogri" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-white custom-transition flex items-center"
          >
            <MessageCircle className="h-3 w-3 inline mx-1 rtl:mirror-for-rtl" />
            @eogri
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
