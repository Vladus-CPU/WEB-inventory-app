import { Link } from 'react-router-dom';

export default function Gallery() {
  return (
    <div>
      <h1>Каталог інвентарю</h1>
      <nav>
        <Link to="/favorites">Улюблені</Link> | <Link to="/admin">Адмін-панель</Link>
      </nav>
      <p>Тут буде список інвентарю</p>
    </div>
  );
}