import { useState } from 'react';
import styles from './InventoryForm.module.css';

export default function InventoryForm({ onSubmit, isLoading, initialData = {} }) {
    const [name, setName] = useState(initialData.inventory_name || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError('Назва інвентарю є обов\'язковою');
            return;
        }
        
        const formData = new FormData();
        formData.append('inventory_name', name);
        formData.append('description', description);
        if (photo) {
            formData.append('photo', photo);
        }
        onSubmit(formData);
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="inventory_name">Назва інвентарю *</label>
                    <input 
                        type="text" 
                        id="inventory_name"
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введіть назву"
                    />
                    {error && <span className={styles.errorText}>{error}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="description">Опис</label>
                    <textarea 
                        id="description"
                        className={styles.textarea}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Введіть опис"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="photo">Фото</label>
                    <input 
                        type="file" 
                        id="photo"
                        className={styles.input}
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                    />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                    {isLoading ? 'Збереження...' : 'Зберегти інвентар'}
                </button>
            </form>
        </div>
    );
}