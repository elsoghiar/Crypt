// Using PDF.js for PDF text extraction
import * as pdfjsLib from 'pdfjs-dist';
// Set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Extract text from a PDF file
 */
export async function extractTextFromPDF(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    
    fileReader.onload = async (event) => {
      try {
        const typedArray = new Uint8Array(event.target?.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        
        let extractedText = '';
        
        // Extract text from each page
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const textItems = textContent.items;
          
          // Combine text items into single string
          let lastY;
          let text = '';
          
          for (const item of textItems) {
            if ('str' in item) {
              // Add newline if y-position changed significantly
              if (lastY !== undefined && Math.abs(item.transform[5] - lastY) > 5) {
                text += '\n';
              }
              text += item.str + ' ';
              lastY = item.transform[5];
            }
          }
          
          extractedText += text + '\n\n'; // Add double newline between pages
        }
        
        resolve(extractedText.trim());
      } catch (error) {
        reject(error);
      }
    };
    
    fileReader.onerror = (error) => {
      reject(error);
    };
    
    fileReader.readAsArrayBuffer(file);
  });
}
