const BASE_URL = 'http://localhost:8080/api'; 

export const inventoryApi = {
    async getAll() {
        try {
            const response = await fetch(`${BASE_URL}/inventory`); 
            if (!response.ok) {
                throw new Error(`Сервер повернув помилку: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Помилка при запиті:", error.message);
            throw error;
        }
    },
    async deleteItem(id) {
        try {
            const response = await fetch(`${BASE_URL}/inventory/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Сервер повернув помилку: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Помилка при запиті:", error.message);
            throw error;
        }
    },
    async createItem(formData) {
        try {
            const response = await fetch(`${BASE_URL}/register`, {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error(`Сервер повернув помилку: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Помилка при запиті:", error.message);
            throw error;
        }
    },
    async getById(id) {
        try {
            const response = await fetch(`${BASE_URL}/inventory/${id}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`Сервер повернув помилку: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Помилка при запиті:", error.message);
            throw error;
        }
    },
    async updateDetails(id, data) {
        try {
            const response = await fetch(`${BASE_URL}/inventory/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`Сервер повернув помилку: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Помилка при запиті:", error.message);
            throw error;
        }
    },
    async updatePhoto(id, photoFile) {
        try {
            const formData = new FormData();
            formData.append('photo', photoFile);
            const response = await fetch(`${BASE_URL}/inventory/${id}/photo`, {
                method: 'PUT',
                body: formData
            });
            if (!response.ok) {
                throw new Error(`Сервер повернув помилку: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Помилка при запиті:", error.message);
            throw error;
        }
    }
};