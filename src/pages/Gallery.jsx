import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryCard from '../components/gallery/InventoryCard';
import InventoryQuickView from '../components/gallery/InventoryQuickView';
import styles from './Gallery.module.css';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    inventoryApi.getAll()
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Каталог інвентарю</h1>
      <nav>
        <Link to="/favorites">Улюблені</Link> | <Link to="/admin">Адмін-панель</Link>
      </nav>
      <hr />
      <div className={styles.list}>
        {items.map(item => (
          <InventoryCard 
            key={item.id} 
            item={item} 
            onClick={setSelectedItem} 
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