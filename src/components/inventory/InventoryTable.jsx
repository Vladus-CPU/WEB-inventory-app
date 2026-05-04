import { Link } from 'react-router-dom';
import styles from './InventoryTable.module.css';

const PHOTO_BASE = '/icons.svg';

export default function InventoryTable({ items, onDeleteClick }) {
    if (!items || items.length === 0) {
        return <div className={styles.emptyState}>Інвентар відсутній. Додайте першу позицію.</div>;
    }

    return (
        <div className={styles.tableContainer}>
            <table className={styles.inventoryTable}>
                <thead>
                    <tr>
                        <th>Фото</th>
                        <th>Назва інвентарю</th>
                        <th>Опис</th>
                        <th>Дії</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <img
                                    src={item.photo || PHOTO_BASE}
                                    alt={item.inventory_name}
                                    className={styles.photoPreview}
                                />
                            </td>
                            <td>{item.inventory_name}</td>
                            <td>{item.description}</td>
                            <td className={styles.actions}>
                                <Link
                                    to={`/admin/details/${item.id}`}
                                    className={`${styles.actionBtn} ${styles.btnView}`}>
                                    Переглянути
                                </Link>

                                <Link
                                    to={`/admin/edit/${item.id}`}
                                    className={`${styles.actionBtn} ${styles.btnEdit}`}>
                                    Редагувати
                                </Link>

                                <button
                                    onClick={() => onDeleteClick(item.id)}
                                    className={`${styles.actionBtn} ${styles.btnDelete}`}
                                    type="button">
                                    Видалити
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}