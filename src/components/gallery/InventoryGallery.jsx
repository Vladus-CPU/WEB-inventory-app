import React from 'react';
import { useState } from 'react';
import InventoryCard from './InventoryCard';
import InventoryQuickView from './InventoryQuickView';
import { useFavorites } from '../../hooks/useFavorites';
import styles from './InventoryGallery.module.css';

export default function InventoryGallery({ items, isLoading, isFavoritesPage = false }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedItem, setSelectedItem] = useState(null);

  if (isLoading) {
    return (
      <div className={styles.grid}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={styles.skeletonCard}>
            <div className={styles.skeletonImg}></div>
            <div className={styles.skeletonTextWrapper}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonDesc}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (!items || items.length === 0) {
    return <div className={styles.emptyState}>Список порожній.</div>;
  }

  return (
    <div>
      <div className={styles.grid}>
        {items.map(item => (
          <InventoryCard 
            key={item.id} 
            item={item} 
            onClick={setSelectedItem}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
      
      <InventoryQuickView 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
}