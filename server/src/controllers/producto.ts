import { Request, Response } from 'express';
import Producto from '../models/producto';

export const getProducts = async (req: Request, res: Response) => {
    const listProducts =  await Producto.findAll();

    res.json(listProducts)
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Producto.findByPk(id);

    if(product) {
        res.json(product);
    } else {
        res.status(404).json({
            msg: 'No existe un producto con el id ' + id
        })
    }

    
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Producto.findByPk(id);

    if(!product) {
        res.status(404).json({
            msg: 'No existe un producto con el id ' + id
        })
    } else {
        await product.destroy();
        res.json({
            msg: 'Producto eliminado'
        })
    }
}

export const postProduct = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Producto.create(body);

    res.json({
        msg: 'Producto agregado con exito',
    })
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrio un error',
        })
        
    }

    
    
}

export const updateProduct = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const product = await Producto.findByPk(id);
    if(product) {
        await product.update(body);
        res.json({
            msg: 'Producto actualizado con exito',})

    } else {
        res.status(404).json({
            msg: 'No existe un producto con el id ' + id
        })
    }

        
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrio un error',
        })
        
    }

    

   
}

