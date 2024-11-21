declare module 'pdfjs-dist' {
  const pdfjsLib: {
    GlobalWorkerOptions: {
      workerSrc: string;
    };
    getDocument: (data: { data: ArrayBuffer }) => Promise<PDFDocumentProxy>;
    version: string;
  };

  interface PDFDocumentProxy {
    numPages: number;
    getPage: (pageNumber: number) => Promise<PDFPageProxy>;
  }

  interface PDFPageProxy {
    getTextContent: () => Promise<PDFTextContent>;
  }

  interface PDFTextContent {
    items: Array<{
      str: string;
      [key: string]: any;
    }>;
  }

  export = pdfjsLib;
}
