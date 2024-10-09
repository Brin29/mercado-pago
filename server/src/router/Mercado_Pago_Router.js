import { Router } from "express";
import mercadopago from "mercadopago";
import dotenv from "dotenv";
dotenv.config();

const Mercado_Pago = Router();

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN || "",
});

Mercado_Pago.post("/", async (req, res) => {

    const ArrayProductos = req.body;

    const NuevoArray =  ArrayProductos.map(e => {
        return {
            title: e.name, 
                picture_url: "http://fgsfd",
                unit_price: e.price,
                currency_id: "ARS",
                quantity: e.cantidad,
        };
    })

    try{
        const preference = {
            items: NuevoArray,
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