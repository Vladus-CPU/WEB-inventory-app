import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { inventoryApi } from '../services/inventoryApi';
import InventoryGallery from '../components/gallery/InventoryGallery';
import styles from './Gallery.module.css';

export default function Favorites() {
  const [allItems, setAllItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { favorites } = useFavorites();

  useEffect(() => {
    const loadItems = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await inventoryApi.getAll();
        setAllItems(data);
      } catch (err) {
        setError(err.message || 'Помилка завантаження інвентарю');
        setAllItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, []);
  
  const favoriteItems = allItems.filter(item => 
    favorites.some(fav => fav.id === item.id)
  );

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Улюблені позиції</h1>
          <nav className={styles.nav}>
            <Link to="/gallery" className={styles.navLinkAdmin}>← Назад до галереї</Link>
          </nav>
        </div>
      </header>

      {error && <div className={styles.errorState}>{error}</div>}

      <InventoryGallery items={isLoading ? [] : favoriteItems} isLoading={isLoading} isFavoritesPage={true} />
    </div>
  );
}