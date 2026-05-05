import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryGallery from '../components/gallery/InventoryGallery';
import FavoritesBar from '../components/gallery/FavoritesBar';
import styles from './Gallery.module.css';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadItems = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await inventoryApi.getAll();
        setItems(data);
      } catch (err) {
        setError(err.message || 'Помилка завантаження інвентарю');
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Каталог інвентарю</h1>
          <nav className={styles.nav}>
            <Link to="/favorites" className={styles.navLink}>Улюблені</Link>
            <Link to="/admin" className={styles.navLinkAdmin}>Адмін-панель</Link>
          </nav>
        </div>
      </header>

      <FavoritesBar />

      {error && <div className={styles.errorState}>{error}</div>}

      <InventoryGallery items={items} isLoading={isLoading} />
    </div>
  );
}