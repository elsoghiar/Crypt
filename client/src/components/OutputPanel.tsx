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
    <div className="neu-card p-4">
      <div className="flex justify-between items-center mb-3 reverse-for-rtl">
        <h2 className="text-md font-semibold">{t("output.title")}</h2>
        <Badge 
          variant={type === "encrypted" ? "default" : "secondary"}
          className={`${type === "encrypted" ? "bg-success bg-opacity-20 text-success hover:bg-success hover:bg-opacity-30" : "bg-blue-500 bg-opacity-20 text-blue-400 hover:bg-blue-500 hover:bg-opacity-30"} px-2 py-0.5 rounded-full text-xs`}
        >
          {type === "encrypted" ? t("output.encrypted") : t("output.decrypted")}
        </Badge>
      </div>
      
      <div className="w-full neu-input p-3 font-mono text-xs bg-secondary mb-3 overflow-auto max-h-40 whitespace-pre-wrap break-words">
        {content}
      </div>
      
      <div className="flex justify-end space-x-2 rtl:space-x-reverse">
        <Button
          variant="secondary"
          onClick={handleCopy}
          className="bg-highlight hover:bg-accent custom-transition rounded-lg py-1.5 px-3 text-xs neu-card"
        >
          <Copy className="mr-1.5 h-3 w-3 rtl:mirror-for-rtl rtl:mr-0 rtl:ml-1.5" /> {t("output.copy")}
        </Button>
        <Button
          variant="secondary"
          onClick={handleDownload}
          className="bg-highlight hover:bg-accent custom-transition rounded-lg py-1.5 px-3 text-xs neu-card"
        >
          <Download className="mr-1.5 h-3 w-3 rtl:mirror-for-rtl rtl:mr-0 rtl:ml-1.5" /> {t("output.download")}
        </Button>
      </div>
    </div>
  );
};

export default OutputPanel;
