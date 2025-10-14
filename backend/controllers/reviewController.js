import express from 'express';
import multer from 'multer';
import { analyzeCode } from '../services/reviewService.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c', '.html', '.css', '.go', '.rb', '.php'];
    const ext = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Please upload a code file.'));
    }
  }
});

router.post('/analyze', upload.single('codeFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No file uploaded' 
      });
    }

    const codeContent = req.file.buffer.toString('utf-8');
    const fileName = req.file.originalname;

    console.log(`📝 Analyzing file: ${fileName}`);

    const review = await analyzeCode(codeContent, fileName);

    const response = {
      success: true,
      fileName: fileName,
      review: review,
      timestamp: new Date().toISOString()
    };

    console.log(`✅ Analysis complete for: ${fileName}`);
    res.json(response);

  } catch (error) {
    console.error('❌ Error in review controller:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to analyze code',
      message: error.message 
    });
  }
});

export default router;
