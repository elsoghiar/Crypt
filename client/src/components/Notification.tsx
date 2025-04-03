import { AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationProps {
  message: string;
  type: "success" | "danger";
  visible: boolean;
}

const Notification = ({ message, type, visible }: NotificationProps) => {
  return (
    <div 
      className={cn(
        "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-4 rounded-lg shadow-xl z-50 transition-all transform",
        "max-w-sm w-full flex items-center",
        type === "success" ? "bg-success text-white" : "bg-destructive text-white",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {type === "success" ? (
        <CheckCircle className="shrink-0 mr-3 h-6 w-6" />
      ) : (
        <AlertCircle className="shrink-0 mr-3 h-6 w-6" />
      )}
      <span className="text-sm break-words">{message}</span>
    </div>
  );
};

export default Notification;
