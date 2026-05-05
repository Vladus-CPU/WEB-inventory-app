import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavorites';
import styles from './FavoritesBar.module.css';

export default function FavoritesBar() {
  const { favorites } = useFavorites();

  if (!favorites.length) return null;

  return (
    <div className={styles.bar}>
      <div className={styles.info}>
        <span className={styles.label}>Улюблені</span>
        <span className={styles.text}>Позицій: {favorites.length}</span>
      </div>

      <Link to="/favorites" className={styles.link}>
        Перейти
      </Link>
    </div>
  );
}