import dotenv from 'dotenv';
import express from 'express';
import body_parser from 'body-parser';
import router from './routes/routes';
import Webhook from './services/Webhook';
dotenv.config()

const app = express().use(body_parser.json());
app.listen(process.env.PORT, () => console.log("webhook/API is listening in port " + process.env.PORT));

// Whatsapp routes, Accepts POST requests at /webhook endpoint
app.post("/webhook", Webhook.listenMessages);
app.get("/webhook", Webhook.setup);
// Custom routes
app.use('/', router);