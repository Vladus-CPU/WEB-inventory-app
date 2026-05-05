import React from 'react';
import styles from './InventoryQuickView.module.css';

export default function InventoryQuickView({ item, onClose, isFavorite = false, onToggleFavorite }) {
  if (!item) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          x
        </button>
        <button
          type="button"
          className={styles.favBtn}
          onClick={() => onToggleFavorite && onToggleFavorite(item)}>
          {isFavorite ? '❤' : '♡'}
        </button>
        <h2 className={styles.title}>{item.inventory_name}</h2>
        <img
          src={item.photo && item.photo.trim() ? item.photo : '/icons.svg'}
          alt={item.inventory_name}
          className={styles.largeImage}
        />
        <p className={styles.description}>{item.description}</p>
      </div>
    </div>
  );
}