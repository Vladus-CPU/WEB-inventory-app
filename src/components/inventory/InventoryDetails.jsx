import styles from './InventoryDetails.module.css';

export default function InventoryDetails({ item }) {
    if (!item) return <div>Немає даних</div>;

    return (
        <div className={styles.card}>
            <img 
                src={item.photo || 'https://via.placeholder.com/400x400?text=Немає+фото'} 
                alt={item.inventory_name} 
                className={styles.image}/>   
            <div className={styles.info}>
                <h2 className={styles.title}>{item.inventory_name}</h2>
                <div className={styles.description}>
                    <strong>Опис:</strong> {item.description || 'Опис відсутній.'}
                </div>
            </div>
        </div>
    );
}