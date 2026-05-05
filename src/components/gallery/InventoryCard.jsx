import React from 'react';
import styles from './InventoryCard.module.css';

export default function InventoryCard({ item }) {
  return (
    <div className={styles.card}>
    <img
    src={item.photo || ''}
    alt={item.inventory_name}
    className={styles.image}
    />
      <h3 className={styles.title}>{item.inventory_name}</h3>
    </div>
  );
}