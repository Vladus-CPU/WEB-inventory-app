import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryDetails from '../components/inventory/InventoryDetails';
import pageStyles from './AdminPages.module.css';

export default function AdminInventoryDetails() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const data = await inventoryApi.getById(id);
                setItem(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    return (
        <div className={pageStyles.pageContainer}>
            <Link to="/admin" className={pageStyles.backLink}>
                ← Назад до списку
            </Link>

            <h1 className={pageStyles.pageTitle}>Деталі інвентарю</h1>

            {loading && <div className={pageStyles.centerMessage}>Завантаження деталей...</div>}
            
            {error && !loading && (
                <div className={`${pageStyles.centerMessage} ${pageStyles.errorMessage}`}>
                    Помилка: {error}
                </div>
            )}

            {!loading && !error && item && <InventoryDetails item={item} />}
        </div>
    );
}