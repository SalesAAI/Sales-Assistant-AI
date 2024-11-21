import React, { useCallback, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Button, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import trainingService from '../services/trainingService';
import * as pdfjsLib from 'pdfjs-dist';

// Initialize pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const UploadBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  border: '2px dashed #ccc',
  backgroundColor: '#fafafa',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#f0f0f0',
    borderColor: theme.palette.primary.main,
  },
  '&.dragActive': {
    backgroundColor: '#e3f2fd',
    borderColor: theme.palette.primary.main,
  }
}));

const IconBox = styled(Box)({
  marginBottom: '16px',
  '& svg': {
    fontSize: 48,
    color: '#666',
  }
});

interface PDFUploaderProps {
  onUploadComplete?: () => void;
}

const PDFUploader: React.FC<PDFUploaderProps> = ({ onUploadComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [knowledgeBaseStatus, setKnowledgeBaseStatus] = useState<{
    totalDocuments: number;
    lastUpdated: Date | null;
  }>({ totalDocuments: 0, lastUpdated: null });
  const [uploadProgress, setUploadProgress] = useState(0);

  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await pdfDoc;
      let fullText = '';
      
      const totalPages = pdf.numPages;
      
      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
        
        setUploadProgress((i / totalPages) * 100);
      }

      return fullText.trim();
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF');
    }
  };

  const processPDF = useCallback(async (file: File) => {
    if (file.type !== 'application/pdf') {
      setError('Please upload only PDF files');
      return;
    }

    setIsLoading(true);
    setError(null);
    setUploadedFile(file);
    setUploadProgress(0);

    try {
      const pdfText = await extractTextFromPDF(file);
      
      if (!pdfText || pdfText.trim().length === 0) {
        throw new Error('No text content found in PDF');
      }

      const success = await trainingService.addTrainingData({
        type: 'pdf',
        content: pdfText,
        metadata: {
          title: file.name,
          dateAdded: new Date()
        }
      });

      if (!success) {
        throw new Error('Failed to process PDF');
      }

      const status = trainingService.getKnowledgeBaseStatus();
      setKnowledgeBaseStatus(status);

      console.log('PDF processed successfully:', file.name);
      setProcessingComplete(true);
      setShowSuccess(true);
      
      onUploadComplete?.();
    } catch (error) {
      console.error('Error processing PDF:', error);
      setError(error instanceof Error ? error.message : 'Failed to process PDF. Please try again.');
      setUploadedFile(null);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  }, [onUploadComplete]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files[0];

    if (pdfFile) {
      processPDF(pdfFile);
    }
  }, [processPDF]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processPDF(files[0]);
    }
  }, [processPDF]);

  const handleDone = () => {
    if (processingComplete) {
      onUploadComplete?.();
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
      {!uploadedFile ? (
        <input
          type="file"
          accept=".pdf"
          style={{ display: 'none' }}
          id="pdf-upload"
          onChange={handleFileSelect}
        />
      ) : null}
      <label htmlFor="pdf-upload" style={{ width: '100%' }}>
        <UploadBox
          className={isDragging ? 'dragActive' : ''}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {isLoading ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <CircularProgress variant="determinate" value={uploadProgress} />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Processing PDF... {Math.round(uploadProgress)}%
              </Typography>
            </Box>
          ) : uploadedFile && processingComplete ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <IconBox>
                <CheckCircleIcon sx={{ color: 'success.main' }} />
              </IconBox>
              <Typography variant="h6" gutterBottom>
                PDF Processed Successfully
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {uploadedFile.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Knowledge Base: {knowledgeBaseStatus.totalDocuments} document(s)
              </Typography>
              {knowledgeBaseStatus.lastUpdated && (
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Last Updated: {knowledgeBaseStatus.lastUpdated.toLocaleString()}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleDone}
                sx={{ mt: 2 }}
              >
                Done
              </Button>
            </Box>
          ) : (
            <>
              <IconBox>
                <CloudUploadIcon />
              </IconBox>
              <Typography variant="h6" gutterBottom>
                Drag & Drop PDF Here
              </Typography>
              <Typography variant="body2" color="textSecondary">
                or click to select PDF file
              </Typography>
              {error && (
                <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </>
          )}
        </UploadBox>
      </label>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          PDF processed and knowledge base updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PDFUploader;
