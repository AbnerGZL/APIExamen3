import express from 'express';
import cors from 'cors';
import db from './app/config/db.config.js';
import ecommerceRoutes from './app/routes/ecommerce.routes.js';

const app = express();
const corsOptions = {
    origin: ['https://frontexamen3.onrender.com', 'http://localhost:3000', 'http://localhost:8080'],
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the application.' });
});

app.use('/api', ecommerceRoutes);

const PORT = process.env.PORT || 8080;

// db.sequelize.sync({ force: false })
//   .then(() => {
//     console.log('Tablas creadas exitosamente.');
//     console.log(`Server is running on port ${PORT}.`);
//   })
//   .catch(err => {
//     console.error('Error al crear las tablas:', err);
//   });

db.sync({ force: false }).then(() => {
    console.log('Database synchronized successfully.');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});