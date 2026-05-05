import React from 'react';
import styles from './InventoryCard.module.css';

export default function InventoryCard({ item }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{item.inventory_name}</h3>
    </div>
  );
}