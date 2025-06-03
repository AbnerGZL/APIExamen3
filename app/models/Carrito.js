import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import Producto from './Productos.js';
import Usuario from './Usuario.js';

const Carrito = sequelize.define('Carrito', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Producto,
      key: 'id'
    }
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id'
    }
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'carrito',
  timestamps: false
});

Carrito.belongsTo(Producto, {
  foreignKey: 'id_producto',
  as: 'producto'
});

Carrito.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'usuario'
});

export default Carrito;
