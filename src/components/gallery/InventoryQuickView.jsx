import React from 'react';
import styles from './InventoryQuickView.module.css';

export default function InventoryQuickView({ item, onClose }) {
  if (!item) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>Закрити</button>
        <h2>{item.inventory_name}</h2>
        <img
          src={item.photo}
          alt={item.inventory_name}
          className={styles.largeImage}
        />
        <p>{item.description}</p>
      </div>
    </div>
  );
}