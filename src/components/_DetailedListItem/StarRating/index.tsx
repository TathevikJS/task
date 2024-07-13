import React from 'react';

interface StarRatingProps {
  rating: number | undefined;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = rating ? Math.floor(rating) : 0;
  const halfStar = rating ? rating % 1 !== 0 : 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, index) => (
        <span key={`full-${index}`}>&#9733;</span> 
      ))}
      {halfStar && <span>&#9734;</span>} 
      {[...Array(emptyStars)].map((_, index) => (
        <span key={`empty-${index}`}>&#9734;</span> 
      ))}
    </div>
  );
};