import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const analyzeCodeFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('codeFile', file);

    console.log('📤 Sending file to backend:', file.name);

    const response = await api.post('/review/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('✅ Response received:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ API Error:', error);
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Failed to analyze code'
    );
  }
};

export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};
