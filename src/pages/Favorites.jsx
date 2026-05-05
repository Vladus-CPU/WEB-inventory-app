import { Link } from 'react-router-dom';

export default function Favorites() {
  return (
    <div>
      <h1>Улюблені позиції</h1>
      <nav>
        <Link to="/gallery">Назад до галереї</Link>
      </nav>
      <p>Тут будуть улюблені товари</p>
    </div>
  );
}