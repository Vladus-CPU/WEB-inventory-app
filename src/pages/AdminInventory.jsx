import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { InventoryContext } from '../store/InventoryContext';
import { inventoryApi } from '../services/inventoryApi';
import InventoryTable from '../components/inventory/InventoryTable';
import ConfirmModal from '../components/inventory/ConfirmModal';
import styles from './AdminPages.module.css';

export default function AdminInventory() {
    const { inventory, setInventory, loading, setLoading, error, setError } = useContext(InventoryContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        const fetchInventory = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await inventoryApi.getAll();
                setInventory(data);
            } catch (err) {
                console.error('Помилка API:', err);
                setError(err.message);
                setInventory([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, [setInventory, setLoading, setError]);

    const handleDeleteClick = (id) => {
        const item = inventory.find(i => i.id === id);
        if (item) {
            setItemToDelete(item);
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setItemToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;

        try {
            await inventoryApi.deleteItem(itemToDelete.id);
            setInventory(prev => prev.filter(item => item.id !== itemToDelete.id));
            handleCloseModal();
        } catch (err) {
            alert(`Помилка: ${err.message}`);
            handleCloseModal();
        }
    };

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.pageTitle}>Управління інвентарем складу</h1>
                </div>

                <div className={styles.headerActions}>
                    <Link to="/gallery" className={styles.secondaryLink}>
                        ← Назад до каталогу
                    </Link>
                    <Link to="/admin/create" className={styles.primaryLink}>
                        + Додати інвентар
                    </Link>
                </div>
            </header>

            {loading && <div className={styles.stateBox}>Завантаження даних...</div>}

            {error && !loading && (
                <div className={`${styles.stateBox} ${styles.errorBox}`}>
                    Сталася помилка: {error}. Перевірте підключення до API.
                </div>
            )}

            {!loading && !error && (
                <InventoryTable items={inventory} onDeleteClick={handleDeleteClick} />
            )}

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                itemName={itemToDelete?.inventory_name}
            />
        </div>
    );
}