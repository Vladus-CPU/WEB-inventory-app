import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryForm from '../components/inventory/InventoryForm';

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
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <div style={{ marginBottom: '20px' }}>
                <Link to="/admin" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                    ← Назад до списку
                </Link>
            </div>
            
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Додати новий інвентар</h1>
            
            {globalError && (
                <div style={{ color: '#ef4444', textAlign: 'center', marginBottom: '20px' }}>
                    {globalError}
                </div>
            )}

            <InventoryForm onSubmit={handleCreate} isLoading={isSubmitting} />
        </div>
    );
}