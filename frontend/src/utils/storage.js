const STORAGE_KEY = 'codeReviews';

export const saveReview = (review) => {
  try {
    const reviews = getAllReviews();
    const newReview = {
      id: Date.now(),
      ...review,
    };
    
    reviews.unshift(newReview);
    
    if (reviews.length > 50) {
      reviews.pop();
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    console.log('💾 Review saved to localStorage');
    return newReview;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getAllReviews = () => {
  try {
    const reviews = localStorage.getItem(STORAGE_KEY);
    return reviews ? JSON.parse(reviews) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const clearReviews = () => {
  localStorage.removeItem(STORAGE_KEY);
};
