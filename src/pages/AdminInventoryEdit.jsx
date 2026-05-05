import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryForm from '../components/inventory/InventoryForm';
import pageStyles from './AdminPages.module.css';

export default function AdminInventoryEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [item, setItem] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const data = await inventoryApi.getById(id);
                setItem(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoadingData(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleUpdate = async (formData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            const inventory_name = formData.get('inventory_name');
            const description = formData.get('description');
            const photo = formData.get('photo');

            await inventoryApi.updateDetails(id, { inventory_name, description });
            if (photo && photo instanceof File && photo.size > 0) {
                await inventoryApi.updatePhoto(id, photo);
            }
            navigate('/admin');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={pageStyles.pageContainer}>
            <Link to="/admin" className={pageStyles.backLink}>
                ← Назад до списку
            </Link>

            <div className={pageStyles.titleWrap}>
                <h1 className={pageStyles.pageTitle}>Редагування предмету</h1>
            </div>

            {loadingData && <div className={pageStyles.centerMessage}>Завантаження даних...</div>}
            
            {error && (
                <div className={`${pageStyles.centerMessage} ${pageStyles.errorMessage}`}>
                    Помилка: {error}
                </div>
            )}

            {!loadingData && item && !error && (
                <InventoryForm 
                    initialData={item} 
                    onSubmit={handleUpdate} 
                    isLoading={isSubmitting}/>
            )}
        </div>
    );
}