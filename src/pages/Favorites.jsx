import React from 'react'; 
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import InventoryCard from '../components/gallery/InventoryCard';
import InventoryQuickView from '../components/gallery/InventoryQuickView';
import styles from './Gallery.module.css';

export default function Favorites() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div>
      <h1>Улюблені позиції</h1>
      <nav>
        <Link to="/gallery">Назад до галереї</Link>
      </nav>
      <hr />
      
      {favorites.length === 0 ? (
        <p>Список порожній.</p>
      ) : (
        <div className={styles.list}>
          {favorites.map(item => (
            <InventoryCard 
              key={item.id} 
              item={item} 
              onClick={setSelectedItem}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
      
      <InventoryQuickView 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
}