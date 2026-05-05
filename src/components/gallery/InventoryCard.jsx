import React from 'react';
import styles from './InventoryCard.module.css';

export default function InventoryCard({ item, onClick }) {
  return (
    <div className={styles.card} onClick={() => onClick(item)}>
      <img 
        src={item.photo || ''} 
        alt={item.inventory_name} 
        className={styles.image} 
      />
      <h3 className={styles.title}>{item.inventory_name}</h3>
    </div>
  );
}