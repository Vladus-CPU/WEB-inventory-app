import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryForm from '../components/inventory/InventoryForm';
import styles from './AdminPages.module.css';

export default function AdminInventoryCreate() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [globalError, setGlobalError] = useState('');
    const navigate = useNavigate();

    const handleCreate = async (formData) => {
        setIsSubmitting(true);
        setGlobalError('');
        try {
            await inventoryApi.createItem(formData);
            navigate('/admin');
        } catch (err) {
            setGlobalError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.pageTitle}>Додати новий інвентар</h1>
                </div>

                <div className={styles.headerActions}>
                    <Link to="/gallery" className={styles.secondaryLink}>
                        ← Назад до каталогу
                    </Link>
                    <Link to="/admin" className={styles.secondaryLink}>
                        ← Назад до списку
                    </Link>
                </div>
            </header>

            {globalError && (
                <div className={`${styles.stateBox} ${styles.errorBox}`}>
                    {globalError}
                </div>
            )}

            <InventoryForm onSubmit={handleCreate} isLoading={isSubmitting} />
        </div>
    );
}