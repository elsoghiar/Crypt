import { useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UnlockKeyhole, Copy, Download, Eye, EyeOff } from "lucide-react";
import { decryptText, copyToClipboard } from "@/lib/utils";

interface DecryptionPanelProps {
  onDecrypt: (result: string) => void;
  showNotification: (message: string, type: "success" | "danger") => void;
}

const DecryptionPanel = ({ onDecrypt, showNotification }: DecryptionPanelProps) => {
  const { t } = useTranslation();
  const [encryptedText, setEncryptedText] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputMode, setInputMode] = useState<string>("text");

  const handleEncryptedTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEncryptedText(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setEncryptedText(content);
      };
      reader.onerror = () => {
        showNotification(t("decrypt.fileReadError"), "danger");
      };
      reader.readAsText(file);
    }
  };

  const handleDecrypt = () => {
    if (!encryptedText.trim()) {
      showNotification(t("decrypt.noInputError"), "danger");
      return;
    }

    try {
      const decryptedText = decryptText(encryptedText, password);
      
      if (!decryptedText) {
        showNotification(t("decrypt.passwordError"), "danger");
        return;
      }
      
      onDecrypt(decryptedText);
      showNotification(t("decrypt.success"), "success");
    } catch (error) {
      console.error("Decryption error:", error);
      showNotification(t("decrypt.error"), "danger");
    }
  };

  const handleCopy = async () => {
    if (!encryptedText) {
      showNotification(t("decrypt.nothingToCopy"), "danger");
      return;
    }

    const copied = await copyToClipboard(encryptedText);
    if (copied) {
      showNotification(t("common.copied"), "success");
    } else {
      showNotification(t("common.copyFailed"), "danger");
    }
  };

  return (
    <div className="w-full">
      <div className="h-full">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">{t("decrypt.title")}</h2>
        
        {/* Input method tabs */}
        <Tabs defaultValue="text" value={inputMode} onValueChange={setInputMode} className="mb-6">
          <TabsList className="border-b border-accent bg-transparent w-full justify-start space-x-4 rounded-none p-0">
            <TabsTrigger 
              value="text" 
              className={`py-2 px-4 font-medium data-[state=active]:tab-active data-[state=active]:shadow-none bg-transparent`}
            >
              {t("decrypt.textTab")}
            </TabsTrigger>
            <TabsTrigger 
              value="file" 
              className={`py-2 px-4 font-medium data-[state=active]:tab-active data-[state=active]:shadow-none bg-transparent`}
            >
              {t("decrypt.fileTab")}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="mt-6">
            <div className="mb-6">
              <Label className="block text-sm font-medium mb-2">{t("decrypt.inputLabel")}</Label>
              <Textarea 
                value={encryptedText}
                onChange={handleEncryptedTextChange}
                className="w-full h-40 neu-input p-4 resize-none font-mono"
                placeholder={t("decrypt.inputPlaceholder")}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="file" className="mt-6">
            <div className="mb-6">
              <Label className="block text-sm font-medium mb-2">{t("decrypt.fileLabel")}</Label>
              <Input 
                type="file"
                accept=".txt,.json"
                onChange={handleFileUpload}
                className="neu-input cursor-pointer mb-4"
              />
              {encryptedText && (
                <Textarea 
                  value={encryptedText}
                  onChange={handleEncryptedTextChange}
                  className="w-full h-40 neu-input p-4 resize-none font-mono"
                  placeholder={t("decrypt.fileContentPlaceholder")}
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Password input for decryption */}
        <div className="mb-6">
          <Label className="block text-sm font-medium mb-2">{t("decrypt.passwordLabel")}</Label>
          <div className="relative">
            <Input 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className="w-full neu-input pr-10"
              placeholder={t("decrypt.passwordPlaceholder")}
            />
            <Button 
              variant="ghost"
              size="icon"
              className="absolute inset-y-0 right-0 px-3"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff className="h-4 w-4 text-gray-400 hover:text-white" /> : <Eye className="h-4 w-4 text-gray-400 hover:text-white" />}
            </Button>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-between">
          <Button 
            onClick={handleDecrypt}
            className="bg-accent hover:bg-highlight custom-transition rounded-lg py-3 px-6 font-medium neu-card"
          >
            <UnlockKeyhole className="mr-2 h-4 w-4" /> {t("decrypt.button")}
          </Button>
          <div className="flex space-x-2">
            <Button 
              variant="ghost"
              onClick={handleCopy}
              className="bg-secondary hover:bg-accent custom-transition rounded-lg p-3 neu-card"
              title={t("decrypt.copyTooltip")}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost"
              className="bg-secondary hover:bg-accent custom-transition rounded-lg p-3 neu-card"
              title={t("decrypt.downloadTooltip")}
              onClick={() => {
                if (encryptedText) {
                  const element = document.createElement('a');
                  const file = new Blob([encryptedText], {type: 'text/plain'});
                  element.href = URL.createObjectURL(file);
                  element.download = 'encrypted_text.txt';
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                  showNotification(t("common.downloaded"), "success");
                } else {
                  showNotification(t("decrypt.nothingToDownload"), "danger");
                }
              }}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecryptionPanel;
