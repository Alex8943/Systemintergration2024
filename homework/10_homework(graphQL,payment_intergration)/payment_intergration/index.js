import express from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();
const app = express();

// read all files in public folder
app.use(express.static('public'));

const secret = process.env.SECRET_KEY;
const publishableKey = process.env.PUBLISHABLE_KEY;

const stripe = new Stripe(secret);
app.use(cors());
app.use(bodyParser.json());



app.post('/create-payment', async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

