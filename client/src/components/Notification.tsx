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
        "fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center z-50 transition-all transform",
        type === "success" ? "bg-success text-white" : "bg-destructive text-white",
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
      )}
    >
      {type === "success" ? (
        <CheckCircle className="mr-2 h-5 w-5" />
      ) : (
        <AlertCircle className="mr-2 h-5 w-5" />
      )}
      <span>{message}</span>
    </div>
  );
};

export default Notification;
