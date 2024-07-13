import React from 'react';
import './styles.scss'
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
        <span key={`full-${index}`} className='star'>&#9733;</span> 
      ))}
      {halfStar && <span className='star'>&#9734;</span>} 
      {[...Array(emptyStars)].map((_, index) => (
        <span key={`empty-${index}`} className='star'>&#9734;</span> 
      ))}
    </div>
  );
};