import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

export default function Gallery() {
  const [items, setItems] = useState([]);

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
      {items.map(item => (
        <div key={item.id}>
          {item.inventory_name}
        </div>
      ))}
    </div>
  );
}