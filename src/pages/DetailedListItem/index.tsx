import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItemById } from '../../services/api';
import { Loading } from '../../shared/Loading';
import { StarRating } from '../../components/_ItemDetails/StarRating';

import './styles.scss'

interface Item {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  fullDescription: string;
  category: string;
  rating: number;
}

const DetailedListItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const loadItem = async () => {
      const fetchedItem = await fetchItemById(Number(id));
      setItem(fetchedItem as Item);
    };

    loadItem();
  }, [id]);

  if (!item) return <Loading />;

  return (
    <div className="item-detail">
      <img src={item.thumbnail} alt={item.title} />
      <h2>{item.title}</h2>
      <p>{item.fullDescription}</p>
      <p>Category: {item.category}</p>
      <StarRating rating={item.rating} />
    </div>
  );
};

export default DetailedListItem