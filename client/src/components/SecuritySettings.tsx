import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ShieldAlert, X } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

interface SecuritySettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const SecuritySettings = ({ isOpen, onClose }: SecuritySettingsProps) => {
  const { t } = useTranslation();
  const { 
    clipboardAutoClear, 
    setClipboardAutoClear,
    clipboardClearDelay,
    setClipboardClearDelay
  } = useAppContext();
  
  // Local state for form
  const [delayValue, setDelayValue] = useState(clipboardClearDelay / 1000); // Convert ms to seconds for display
  
  if (!isOpen) return null;
  
  const handleSave = () => {
    // Convert seconds back to milliseconds for storage
    setClipboardClearDelay(delayValue * 1000);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div
        className="bg-secondary/80 backdrop-blur-md p-5 rounded-lg border border-accent/20 
        shadow-lg transition-all duration-500 relative max-w-md z-10 w-full"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1.5 hover:bg-gray-700/50 rounded-full transition-colors"
          aria-label={t("common.close")}
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
        
        <div className="flex items-start gap-3 mb-4">
          <ShieldAlert className="h-6 w-6 text-amber-500 shrink-0 mt-1" />
          <div className="font-semibold text-amber-300 text-lg">{t("security.settingsTitle")}</div>
        </div>
        
        <div className="space-y-4">
          {/* Clipboard auto-clear toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="clipboard-auto-clear" className="text-sm font-medium">
                {t("security.clipboardAutoClear")}
              </Label>
              <p className="text-xs text-gray-400 mt-1">
                {t("security.clipboardAutoClearDesc")}
              </p>
            </div>
            <Switch
              id="clipboard-auto-clear"
              checked={clipboardAutoClear}
              onCheckedChange={setClipboardAutoClear}
            />
          </div>
          
          {/* Clear delay setting */}
          {clipboardAutoClear && (
            <div className="space-y-2">
              <Label htmlFor="clipboard-clear-delay" className="text-sm font-medium">
                {t("security.clearDelay")}
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="clipboard-clear-delay"
                  type="number"
                  min="5"
                  max="3600"
                  value={delayValue}
                  onChange={(e) => setDelayValue(Number(e.target.value))}
                  className="w-24 text-sm"
                />
                <span className="text-sm text-gray-400">{t("security.seconds")}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {t("security.clearDelayDesc")}
              </p>
            </div>
          )}
          
          <div className="flex justify-end pt-2">
            <Button
              variant="default"
              onClick={handleSave}
              className="bg-success hover:bg-success/80 text-black"
            >
              {t("common.save")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;