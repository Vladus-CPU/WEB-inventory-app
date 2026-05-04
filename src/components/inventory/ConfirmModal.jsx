import styles from './ConfirmModal.module.css';

export default function ConfirmModal({ isOpen, onClose, onConfirm, itemName }) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3 className={styles.title}>Підтвердження видалення</h3>
                <p className={styles.text}>
                    Ви дійсно хочете видалити <strong>{itemName || 'цей елемент'}</strong>?
                </p>
                <div className={styles.actions}>
                    <button onClick={onClose} className={`${styles.btn} ${styles.btnCancel}`}>
                        Скасувати
                    </button>
                    <button onClick={onConfirm} className={`${styles.btn} ${styles.btnConfirm}`}>
                        Видалити
                    </button>
                </div>
            </div>
        </div>
    );
}