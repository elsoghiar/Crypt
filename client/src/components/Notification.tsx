import { AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface NotificationProps {
  message: string;
  type: "success" | "danger";
  visible: boolean;
}

const Notification = ({ message, type, visible }: NotificationProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div 
      className={cn(
        "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-4 rounded-lg shadow-xl z-50 transition-all transform",
        "max-w-sm w-full flex items-center backdrop-blur-md",
        type === "success" 
          ? "bg-success/50 text-white border border-success/30" 
          : "bg-destructive/50 text-white border border-destructive/30",
        visible 
          ? "opacity-100 scale-100" 
          : "opacity-0 scale-95 pointer-events-none"
      )}
    >
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-black/20 to-black/5 pointer-events-none" />
      {type === "success" ? (
        <CheckCircle className={cn(
          "shrink-0 h-6 w-6 z-10 notification-icon",
          isRTL ? "ml-4" : "mr-4"
        )} />
      ) : (
        <AlertCircle className={cn(
          "shrink-0 h-6 w-6 z-10 notification-icon",
          isRTL ? "ml-4" : "mr-4"
        )} />
      )}
      <span className="text-sm break-words z-10">{message}</span>
    </div>
  );
};

export default Notification;
