


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItemById } from '../../../services/api';
import { Loading } from '../../../shared/Loading';
import { StarRating } from '../StarRating';
import { Item } from '../../../types/ItemTypes';

import './styles.scss'


const DetailedListItemPage = () => {
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

export default DetailedListItemPage