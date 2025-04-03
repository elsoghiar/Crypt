import { useState } from "react";
import { encryptText, decryptText } from "@/lib/utils";

interface UseEncryptionOptions {
  onError?: (error: Error) => void;
}

export function useEncryption(options?: UseEncryptionOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encrypt = async (text: string, password?: string, algorithm: string = 'AES-256') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = encryptText(text, password, algorithm);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      options?.onError?.(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const decrypt = async (encryptedText: string, password?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = decryptText(encryptedText, password);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      options?.onError?.(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    encrypt,
    decrypt,
    isLoading,
    error
  };
}
