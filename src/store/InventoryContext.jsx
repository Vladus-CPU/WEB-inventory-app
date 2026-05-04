import { createContext, useState } from 'react';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <InventoryContext.Provider value={{ 
            inventory, setInventory, 
            loading, setLoading, 
            error, setError 
        }}>
            {children}
        </InventoryContext.Provider>
    );
};