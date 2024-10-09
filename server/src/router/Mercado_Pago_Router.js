import { Router } from "express";
import mercadopago from "mercadopago";
import dotenv from "dotenv";
dotenv.config();

const Mercado_Pago = Router();

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN || "",
});

Mercado_Pago.post("/", async (req, res) => {

    const productos = req.body;
    try{
        const preference = {
            items: [{
                title: productos.name, 
                picture_url: productos.image,
                unit_price: Number(productos.price),
                currency_id: "ARS",
                quantity: 1,
            }],
            back_urls: {
                success: "https://youtube.com",
                failure: "https://youtube.com"
            },
            auto_return: "approved",
        }

        const response = await mercadopago.preferences.create(preference);
        console.log(response)
        res.status(200).json(response.response.init_point);
    }
    catch(error){
        console.error(error.message);
        res.status(500).json(error.message);
    }
})

export default Mercado_Pago;