import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Download } from "lucide-react";
import { copyToClipboard, downloadTextAsFile } from "@/lib/utils";

interface OutputPanelProps {
  content: string;
  type: "encrypted" | "decrypted";
  showNotification: (message: string, type: "success" | "danger") => void;
}

const OutputPanel = ({ content, type, showNotification }: OutputPanelProps) => {
  const { t } = useTranslation();

  const handleCopy = async () => {
    const copied = await copyToClipboard(content);
    if (copied) {
      showNotification(t("common.copied"), "success");
    } else {
      showNotification(t("common.copyFailed"), "danger");
    }
  };

  const handleDownload = () => {
    const filename = type === "encrypted" ? "encrypted_text.txt" : "decrypted_text.txt";
    downloadTextAsFile(content, filename);
    showNotification(t("common.downloaded"), "success");
  };

  return (
    <div className="mt-8 neu-card p-6">
      <div className="flex justify-between items-center mb-4 reverse-for-rtl">
        <h2 className="text-xl font-semibold">{t("output.title")}</h2>
        <Badge 
          variant={type === "encrypted" ? "default" : "secondary"}
          className={`${type === "encrypted" ? "bg-success bg-opacity-20 text-success hover:bg-success hover:bg-opacity-30" : "bg-blue-500 bg-opacity-20 text-blue-400 hover:bg-blue-500 hover:bg-opacity-30"} px-3 py-1 rounded-full text-sm`}
        >
          {type === "encrypted" ? t("output.encrypted") : t("output.decrypted")}
        </Badge>
      </div>
      
      <div className="w-full neu-input p-4 font-mono bg-secondary mb-4 overflow-auto max-h-48 whitespace-pre-wrap break-words">
        {content}
      </div>
      
      <div className="flex justify-end space-x-3 rtl:space-x-reverse">
        <Button
          variant="secondary"
          onClick={handleCopy}
          className="bg-highlight hover:bg-accent custom-transition rounded-lg py-2 px-4 neu-card"
        >
          <Copy className="mx-2 h-4 w-4 rtl:mirror-for-rtl" /> {t("output.copy")}
        </Button>
        <Button
          variant="secondary"
          onClick={handleDownload}
          className="bg-highlight hover:bg-accent custom-transition rounded-lg py-2 px-4 neu-card"
        >
          <Download className="mx-2 h-4 w-4 rtl:mirror-for-rtl" /> {t("output.download")}
        </Button>
      </div>
    </div>
  );
};

export default OutputPanel;
