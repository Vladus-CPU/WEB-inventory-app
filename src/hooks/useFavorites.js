import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('inventory_favs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('inventory_favs', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === item.id)) {
        return prev.filter(fav => fav.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isFavorite = (id) => favorites.some(fav => fav.id === id);

  return { favorites, toggleFavorite, isFavorite };
}