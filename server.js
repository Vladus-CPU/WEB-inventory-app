import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

const getDb = () => {
    const dbPath = './db.json';
    if (!fs.existsSync(dbPath)) 
        fs.writeFileSync(dbPath, JSON.stringify({ inventory: [] }));
    const data = JSON.parse(fs.readFileSync(dbPath));
    return Array.isArray(data) ? { inventory: data } : data;
};

const saveDb = (data) => fs.writeFileSync('./db.json', JSON.stringify(data, null, 2));

const upload = multer({
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
    })
});

app.get('/api/inventory', (req, res) => {
    res.json(getDb().inventory || []);
});

app.delete('/api/inventory/:id', (req, res) => {
    let db = getDb();
    if (db.inventory) {
        db.inventory = db.inventory.filter(i => i.id !== req.params.id);
        saveDb(db);
    }
    res.json({ success: true });
});

app.post('/api/register', upload.single('photo'), (req, res) => {
    const db = getDb();
    const newItem = {
        id: Date.now().toString(),
        inventory_name: req.body.inventory_name,
        description: req.body.description || '',
        photo: req.file ? `http://localhost:8080/uploads/${req.file.filename}` : null
    };

    if (!db.inventory) db.inventory = [];
    db.inventory.push(newItem);
    saveDb(db);
    
    res.status(201).json(newItem);
});

app.get('/api/inventory/:id', (req, res) => {
    const db = getDb();
    const item = (db.inventory || []).find(i => i.id == req.params.id);
    if (!item) 
        return res.status(404).json({ 
    error: 'Інвентар не знайдено' 
});
    res.json(item);
});

app.put('/api/inventory/:id', (req, res) => {
    let db = getDb();
    const index = (db.inventory || []).findIndex(i => i.id == req.params.id);
    if (index === -1) 
        return res.status(404).json({ 
    error: 'Інвентар не знайдено' 
});
    db.inventory[index].inventory_name = req.body.inventory_name || db.inventory[index].inventory_name;
    db.inventory[index].description = req.body.description !== undefined ? req.body.description : db.inventory[index].description;

    saveDb(db);

    res.json(db.inventory[index]);
});



app.put('/api/inventory/:id/photo', upload.single('photo'), (req, res) => {
    let db = getDb();
    const index = (db.inventory || []).findIndex(i => i.id == req.params.id);

    if (index === -1) 
        return res.status(404).json({ 
    error: 'Інвентар не знайдено' 
});
    if (req.file) {
        db.inventory[index].photo = `http://localhost:8080/uploads/${req.file.filename}`;
        saveDb(db);
    }
    res.json(db.inventory[index]);
});

app.listen(8080);