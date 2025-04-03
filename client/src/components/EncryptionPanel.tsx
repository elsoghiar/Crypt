import { useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Eraser, HelpCircle, Eye, EyeOff } from "lucide-react";
import { encryptText } from "@/lib/utils";

interface EncryptionPanelProps {
  onEncrypt: (result: string) => void;
  showNotification: (message: string, type: "success" | "danger") => void;
}

const EncryptionPanel = ({ onEncrypt, showNotification }: EncryptionPanelProps) => {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState<string>("");
  const [passwordProtected, setPasswordProtected] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [algorithm, setAlgorithm] = useState<string>("AES-256");

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClearInput = () => {
    setInputText("");
    showNotification(t("encrypt.cleared"), "success");
  };

  const handleShowHelp = () => {
    showNotification(t("encrypt.helpMessage"), "success");
  };

  const handleEncrypt = () => {
    if (!inputText.trim()) {
      showNotification(t("encrypt.noInputError"), "danger");
      return;
    }

    try {
      const encryptionKey = passwordProtected ? password : undefined;
      const encryptedText = encryptText(inputText, encryptionKey, algorithm);
      onEncrypt(encryptedText);
      showNotification(t("encrypt.success"), "success");
    } catch (error) {
      console.error("Encryption error:", error);
      showNotification(t("encrypt.error"), "danger");
    }
  };

  return (
    <div className="w-full">
      <div className="h-full">
        <h2 className="text-lg font-semibold mb-4">{t("encrypt.title")}</h2>
        
        {/* Text input section */}
        <div className="mb-4">
          <Label className="block text-xs font-medium mb-1">{t("encrypt.inputLabel")}</Label>
          <Textarea 
            value={inputText}
            onChange={handleTextChange}
            className="w-full h-32 neu-input p-3 resize-none text-xs font-mono"
            placeholder={t("encrypt.inputPlaceholder")}
          />
        </div>
        
        {/* Options section */}
        <div className="bg-accent bg-opacity-30 rounded-lg p-3 mb-4">
          <h3 className="text-xs font-medium mb-2">{t("encrypt.optionsTitle")}</h3>
          
          {/* Password protection */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs">{t("encrypt.passwordProtection")}</span>
            <Switch 
              checked={passwordProtected}
              onCheckedChange={setPasswordProtected}
              className="data-[state=checked]:bg-success"
            />
          </div>
          
          {/* Password input - hidden by default */}
          {passwordProtected && (
            <div className="mb-3">
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full neu-input text-xs pr-10 rtl:pr-4 rtl:pl-10"
                  placeholder={t("encrypt.passwordPlaceholder")}
                />
                <Button 
                  variant="ghost"
                  size="icon"
                  className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 px-2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="h-3 w-3 text-gray-400 hover:text-white" /> : <Eye className="h-3 w-3 text-gray-400 hover:text-white" />}
                </Button>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                {t("encrypt.passwordNote")}
              </p>
            </div>
          )}
          
          {/* Encryption algorithm */}
          <div className="flex justify-between items-center">
            <span className="text-xs">{t("encrypt.algorithm")}</span>
            <Select value={algorithm} onValueChange={setAlgorithm}>
              <SelectTrigger className="bg-secondary text-white w-[140px] text-xs h-8 neu-input">
                <SelectValue placeholder={t("encrypt.algorithmPlaceholder")} />
              </SelectTrigger>
              <SelectContent className="bg-secondary text-white border-accent">
                <SelectItem value="AES-256" className="text-xs">AES-256</SelectItem>
                <SelectItem value="AES-192" className="text-xs">AES-192</SelectItem>
                <SelectItem value="AES-128" className="text-xs">AES-128</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-between">
          <Button 
            onClick={handleEncrypt}
            className="bg-accent hover:bg-highlight custom-transition rounded-lg py-2 px-4 text-xs font-medium neu-card"
          >
            <Lock className="mr-2 h-3 w-3 rtl:order-1 rtl:mr-0 rtl:ml-2" /> {t("encrypt.button")}
          </Button>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Button 
              variant="ghost"
              onClick={handleClearInput}
              className="bg-secondary hover:bg-accent custom-transition rounded-lg p-2 neu-card"
              title={t("encrypt.clearTooltip")}
            >
              <Eraser className="h-3 w-3" />
            </Button>
            <Button 
              variant="ghost"
              onClick={handleShowHelp}
              className="bg-secondary hover:bg-accent custom-transition rounded-lg p-2 neu-card"
              title={t("encrypt.helpTooltip")}
            >
              <HelpCircle className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncryptionPanel;
