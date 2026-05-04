import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { InventoryContext } from '../store/InventoryContext';
import { inventoryApi } from '../services/inventoryApi';
import InventoryTable from '../components/inventory/InventoryTable';
import styles from '../components/inventory/InventoryTable.module.css';
import ConfirmModal from '../components/inventory/ConfirmModal';

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
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Управління інвентарем складу</h1>
                <Link
                    to="/admin/create"
                    style={{
                        padding: '10px 16px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px'
                    }}>
                    + Додати інвентар
                </Link>
            </div>

            {loading && <div className={styles.loadingState}>Завантаження даних...</div>}

            {error && !loading && (
                <div className={styles.errorState}>
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