import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import EncryptionPanel from "./components/EncryptionPanel";
import DecryptionPanel from "./components/DecryptionPanel";
import OutputPanel from "./components/OutputPanel";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Unlock, ShieldAlert, X } from "lucide-react";

type OutputType = "encrypted" | "decrypted" | null;

function App() {
  const { t, i18n } = useTranslation();
  const [appLoaded, setAppLoaded] = useState(false);
  
  // State for notification system
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "danger";
    visible: boolean;
  }>({
    message: "",
    type: "success",
    visible: false,
  });
  
  // State for output display
  const [outputContent, setOutputContent] = useState<string>("");
  const [outputType, setOutputType] = useState<OutputType>(null);
  
  // Set HTML direction based on language
  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
  }, [i18n.language]);
  
  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  // State for security notice visibility
  const [securityNoticeVisible, setSecurityNoticeVisible] = useState(true);
  
  // Show notification function
  const showNotification = (message: string, type: "success" | "danger") => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 3000);
  };
  
  // Handle encryption output
  const handleEncryptionOutput = (result: string) => {
    setOutputContent(result);
    setOutputType("encrypted");
  };
  
  // Handle decryption output
  const handleDecryptionOutput = (result: string) => {
    setOutputContent(result);
    setOutputType("decrypted");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-primary font-sans flex flex-col overflow-hidden">
        <Header />
        
        <main className="container mx-auto py-6 px-3 md:px-8 flex-grow flex flex-col gap-5">
          {/* Main container with tabs */}
          <div 
            className={`w-full bg-secondary rounded-lg p-4 neu-card transition-all duration-700 ${
              appLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
            }`}
          >
            <Tabs defaultValue="encrypt" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 reverse-for-rtl">
                <TabsTrigger 
                  value="encrypt" 
                  className="rounded-md py-2 text-xs font-medium flex items-center justify-center gap-2 border border-gray-700"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>{t("header.encrypt")}</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="decrypt" 
                  className="rounded-md py-2 text-xs font-medium flex items-center justify-center gap-2 border border-gray-700"
                >
                  <Unlock className="h-3.5 w-3.5" />
                  <span>{t("header.decrypt")}</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="relative">
                {/* Glow effect behind content */}
                <div className="absolute -inset-2 bg-success/5 blur-2xl rounded-full opacity-10"></div>
                
                {/* Actual content */}
                <TabsContent value="encrypt" className="mt-0 relative z-10">
                  <EncryptionPanel 
                    onEncrypt={handleEncryptionOutput} 
                    showNotification={showNotification}
                  />
                </TabsContent>
                <TabsContent value="decrypt" className="mt-0 relative z-10">
                  <DecryptionPanel 
                    onDecrypt={handleDecryptionOutput}
                    showNotification={showNotification}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
          
          {/* Output section (shows up after encryption/decryption) */}
          {outputType && (
            <div 
              className={`transition-all duration-500 ${
                outputType ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
              }`}
            >
              <OutputPanel 
                content={outputContent} 
                type={outputType} 
                showNotification={showNotification}
              />
            </div>
          )}
        </main>
        
        <div 
          className={`transition-all duration-1000 ${
            appLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          }`}
        >
          <Footer />
        </div>
        
        <Notification 
          message={notification.message}
          type={notification.type}
          visible={notification.visible}
        />
        
        {/* Security disclaimer */}
        {securityNoticeVisible && (
          <div 
            className={`fixed bottom-4 right-4 bg-secondary/30 backdrop-blur-md p-3 rounded-lg border border-accent/20 
            text-xs max-w-[200px] shadow-lg transition-all duration-1000 flex items-start gap-2 ${
              appLoaded ? "opacity-70 transform-none" : "opacity-0 translate-x-8"
            } hover:opacity-100 relative`}
          >
            <button 
              onClick={() => setSecurityNoticeVisible(false)}
              className="absolute top-1 right-1 p-1 hover:bg-gray-700/50 rounded-full transition-colors"
              aria-label={t("common.close")}
            >
              <X className="h-3 w-3 text-gray-400" />
            </button>
            <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-amber-300 mb-1">{t("security.title")}</div>
              <div className="text-gray-300 text-xs">{t("security.message")}</div>
            </div>
          </div>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
