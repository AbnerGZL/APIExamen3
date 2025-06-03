import Carrito from "../models/Carrito.js";
import Producto from "../models/Productos.js";
import Usuario from "../models/Usuario.js";


export const getProducts = async (req, res) => {
  try {
    const productos = await Producto.findAll({});
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Producto.findByPk(parseInt(req.params.id));
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto', error });
  }
};

export const getCarActive = async (req, res) => {
  try {
    const car = await Carrito.findAll({
      where: {
        id_usuario: parseInt(req.params.id),
        estado: 1,
      },
    });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener carrito', error });
  }
};

export const postProducts = async (req, res) => {
  const { name } = req.body;
  const { price } = req.body;

  try {
    if (!name || !price) {
      return res.status(400).json({ message: 'Ingreso datos incompletos' });
    }
    req.body.estado = 1;
    req.body.image_url = "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI";
    
    const nuevoProducto = await Producto.create(req.body);
    return res.status(201).json(nuevoProducto);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear nuevo producto', error });
  }
};

export const postCar = async (req, res) => {
  const { id } = req.params;
  const id_producto  = req.body.id_producto;

  try {
    if (!id || !id_producto) {
      return res.status(400).json({ message: 'Ingreso datos incompletos' });
    }
    req.body.estado = 1;
    
    const nuevoCarrito = await Carrito.create({
      id_usuario: parseInt(id),
      id_producto: parseInt(id_producto),
      estado: 1
    });

    const [updated] = await Producto.update(
        {
          stock: sequelize.literal(`stock - 1`),
        },
        { where: { id: id_producto } }
      );

    return res.status(201).json(nuevoCarrito);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear nuevo carrito', error });
  }
};

export const putProducts = async (req, res) => {
  const { name } = req.body;
  const { price } = req.body;
  const { id } = req.body;

  try {
      if (!name || !price) {
        return res.status(400).json({ message: 'Ingreso datos incompletos' });
      }

      const [updated] = await Producto.update(
        {
          name: name,
          description: req.body.description,
          price: price,
          stock: req.body.stock,
        },
        { where: { id: id } }
      );
  
      if (updated === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      return res.status(200).json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al actualizar producto', error });
    }
  };


export const patchCar = async (req, res) => {
  const { id } = req.params;

  try {
      if (!id) {
        return res.status(400).json({ message: 'Ingreso datos incompletos' });
      }

      const [updated] = await Carrito.update(
        {
          estado: 0
        },
        { where: { id_usuario: id, estado: 1 } }
      );
  
      if (updated === 0) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }
  
      return res.status(200).json({ message: 'Carrito actualizado correctamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al actualizar carrito', error });
    }
  };

export const deleteProducts = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await Producto.destroy({
        where: { id: id }
      });
  
      if (deleted === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      return res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
  };

  export const deleteCar = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await Carrito.destroy({
        where: { id: id }
      });
  
      if (deleted === 0) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }
  
      return res.status(200).json({ message: 'Carrito eliminado correctamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar el carrito', error });
    }
  };

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Ingreso datos incompletos' });
    }

    const usuario = await Usuario.findOne({ where: { email: email, password: password } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
}

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Ingreso datos incompletos' });
    }

    const nuevoUsuario = await Usuario.create({
      name: name,
      email: email,
      password: password
    });

    return res.status(201).json(nuevoUsuario);
  } catch (error) {
    return res.status(500).json({ message: 'Error al registrar usuario', error });
  }
}

export const users = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({});
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
}
