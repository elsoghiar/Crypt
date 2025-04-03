import { useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Eraser, HelpCircle, Eye, EyeOff } from "lucide-react";
import { encryptText } from "@/lib/utils";
import { extractTextFromPDF } from "@/lib/pdfUtils";

interface EncryptionPanelProps {
  onEncrypt: (result: string) => void;
  showNotification: (message: string, type: "success" | "danger") => void;
}

const EncryptionPanel = ({ onEncrypt, showNotification }: EncryptionPanelProps) => {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState<string>("");
  const [inputMode, setInputMode] = useState<string>("text");
  const [passwordProtected, setPasswordProtected] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [algorithm, setAlgorithm] = useState<string>("AES-256");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handlePDFUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = e.target.files?.[0];
    
    if (file) {
      try {
        const text = await extractTextFromPDF(file);
        setInputText(text);
        showNotification(t("encrypt.pdfExtracted"), "success");
      } catch (error) {
        console.error("PDF extraction error:", error);
        showNotification(t("encrypt.pdfError"), "danger");
      } finally {
        setIsLoading(false);
      }
    }
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
    <div className="w-full lg:w-1/2">
      <div className="neu-card p-6 h-full">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">{t("encrypt.title")}</h2>
        
        {/* Input method tabs */}
        <Tabs defaultValue="text" value={inputMode} onValueChange={setInputMode} className="mb-6">
          <TabsList className="border-b border-accent bg-transparent w-full justify-start space-x-4 rounded-none p-0">
            <TabsTrigger 
              value="text" 
              className={`py-2 px-4 font-medium data-[state=active]:tab-active data-[state=active]:shadow-none bg-transparent`}
            >
              {t("encrypt.textTab")}
            </TabsTrigger>
            <TabsTrigger 
              value="pdf" 
              className={`py-2 px-4 font-medium data-[state=active]:tab-active data-[state=active]:shadow-none bg-transparent`}
            >
              {t("encrypt.pdfTab")}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="mt-6">
            <div className="mb-6">
              <Label className="block text-sm font-medium mb-2">{t("encrypt.inputLabel")}</Label>
              <Textarea 
                value={inputText}
                onChange={handleTextChange}
                className="w-full h-40 neu-input p-4 resize-none font-mono"
                placeholder={t("encrypt.inputPlaceholder")}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="pdf" className="mt-6">
            <div className="mb-6">
              <Label className="block text-sm font-medium mb-2">{t("encrypt.pdfLabel")}</Label>
              <div className="flex flex-col gap-4">
                <Input 
                  type="file" 
                  accept=".pdf"
                  onChange={handlePDFUpload}
                  className="neu-input cursor-pointer"
                />
                {isLoading && <div className="text-sm text-muted-foreground">{t("encrypt.pdfLoading")}</div>}
                {inputText && (
                  <Textarea 
                    value={inputText}
                    onChange={handleTextChange}
                    className="w-full h-40 neu-input p-4 resize-none font-mono"
                    placeholder={t("encrypt.extractedTextPlaceholder")}
                  />
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Options section */}
        <div className="bg-accent bg-opacity-30 rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-3">{t("encrypt.optionsTitle")}</h3>
          
          {/* Password protection */}
          <div className="flex justify-between items-center mb-4">
            <span>{t("encrypt.passwordProtection")}</span>
            <Switch 
              checked={passwordProtected}
              onCheckedChange={setPasswordProtected}
              className="data-[state=checked]:bg-success"
            />
          </div>
          
          {/* Password input - hidden by default */}
          {passwordProtected && (
            <div className="mb-4">
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full neu-input pr-10"
                  placeholder={t("encrypt.passwordPlaceholder")}
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
              <p className="text-xs text-gray-400 mt-1">
                {t("encrypt.passwordNote")}
              </p>
            </div>
          )}
          
          {/* Encryption algorithm */}
          <div className="flex justify-between items-center">
            <span>{t("encrypt.algorithm")}</span>
            <Select value={algorithm} onValueChange={setAlgorithm}>
              <SelectTrigger className="bg-secondary text-white w-[180px] neu-input">
                <SelectValue placeholder={t("encrypt.algorithmPlaceholder")} />
              </SelectTrigger>
              <SelectContent className="bg-secondary text-white border-accent">
                <SelectItem value="AES-256">AES-256</SelectItem>
                <SelectItem value="AES-192">AES-192</SelectItem>
                <SelectItem value="AES-128">AES-128</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-between">
          <Button 
            onClick={handleEncrypt}
            className="bg-accent hover:bg-highlight custom-transition rounded-lg py-3 px-6 font-medium neu-card"
          >
            <Lock className="mr-2 h-4 w-4" /> {t("encrypt.button")}
          </Button>
          <div className="flex space-x-2">
            <Button 
              variant="ghost"
              onClick={handleClearInput}
              className="bg-secondary hover:bg-accent custom-transition rounded-lg p-3 neu-card"
              title={t("encrypt.clearTooltip")}
            >
              <Eraser className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost"
              onClick={handleShowHelp}
              className="bg-secondary hover:bg-accent custom-transition rounded-lg p-3 neu-card"
              title={t("encrypt.helpTooltip")}
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncryptionPanel;
