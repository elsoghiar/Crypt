import { useState } from "react";
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

type OutputType = "encrypted" | "decrypted" | null;

function App() {
  const { t } = useTranslation();
  
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
      <div className="min-h-screen bg-primary font-sans flex flex-col">
        <Header />
        
        <main className="container mx-auto py-8 px-4 md:px-12 flex-grow flex flex-col gap-8">
          {/* Main container with tabs */}
          <div className="w-full bg-secondary rounded-lg p-6 neu-card">
            <Tabs defaultValue="encrypt" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="encrypt">{t("header.encrypt")}</TabsTrigger>
                <TabsTrigger value="decrypt">{t("header.decrypt")}</TabsTrigger>
              </TabsList>
              <TabsContent value="encrypt" className="mt-0">
                <EncryptionPanel 
                  onEncrypt={handleEncryptionOutput} 
                  showNotification={showNotification}
                />
              </TabsContent>
              <TabsContent value="decrypt" className="mt-0">
                <DecryptionPanel 
                  onDecrypt={handleDecryptionOutput}
                  showNotification={showNotification}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Output section (shows up after encryption/decryption) */}
          {outputType && (
            <OutputPanel 
              content={outputContent} 
              type={outputType} 
              showNotification={showNotification}
            />
          )}
        </main>
        
        <Footer />
        <Notification 
          message={notification.message}
          type={notification.type}
          visible={notification.visible}
        />
      </div>
    </QueryClientProvider>
  );
}

export default App;
