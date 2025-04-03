import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from 'crypto-js';

// Utility function for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Encryption utility functions using CryptoJS
export function encryptText(text: string, password?: string, algorithm: string = 'AES-256'): string {
  try {
    if (!text) return '';
    
    const encryptionKey = password || 'default-key';
    
    // Choose encryption based on algorithm
    let encrypted;
    switch (algorithm) {
      case 'AES-128':
        encrypted = CryptoJS.AES.encrypt(text, encryptionKey, {
          keySize: 128 / 32
        });
        break;
      case 'AES-192':
        encrypted = CryptoJS.AES.encrypt(text, encryptionKey, {
          keySize: 192 / 32
        });
        break;
      case 'AES-256':
      default:
        encrypted = CryptoJS.AES.encrypt(text, encryptionKey);
        break;
    }
    
    return encrypted.toString();
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt text');
  }
}

export function decryptText(encryptedText: string, password?: string): string {
  try {
    if (!encryptedText) return '';
    
    const decryptionKey = password || 'default-key';
    
    const decrypted = CryptoJS.AES.decrypt(encryptedText, decryptionKey);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt text. Check your password and try again.');
  }
}

// Utility for downloading text as a file
export function downloadTextAsFile(text: string, filename: string, type: string = 'text/plain') {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

// Utility for copying text to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
}

// Utility for clearing clipboard after specified delay
export async function clearClipboard(
  delayMs: number = 60000, 
  onClear?: () => void
): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        // Write empty string to clipboard to clear it
        await navigator.clipboard.writeText('');
        console.log('Clipboard cleared for security');
        
        // Call the callback function if provided
        if (onClear) {
          onClear();
        }
        
        resolve(true);
      } catch (err) {
        console.error('Failed to clear clipboard:', err);
        resolve(false);
      }
    }, delayMs);
  });
}
