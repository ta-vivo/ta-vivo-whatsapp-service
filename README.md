# Ta-vivo WhatsApp service

This is a WhatsApp service for Ta-vivo or any other project to send and receive messages via WhatsApp business.

:warning: For developments, you need HTTPS to work, at this point I recommend using ngrok to make an HTTPS tunnel (Check the docs below).

## Get started

```bash
yarn
```

Create the `.env` file into `api` directory, use the `example.env` file;

```bash
cp example.env .env
```

Now follow the Meta documentation to get the `WHATSAPP_PHONE_ID` and `WHATSAPP_TOKEN`;

From the documentation follow the steps;

- 1. Set up Developer Assets and Platform Access
- 3. Configure a Webhook

[https://developers.facebook.com/docs/whatsapp/cloud-api/get-started](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started)


Note: The `WHATSAPP_PHONE_ID` is on `Send and receive messages` section inside the `WhatsApp` product in `Meta for developers` page. The `VERIFY_TOKEN` is a string create by yourself, this can be any string, this is used to verify the callback URL.

### Start the server

```bash
yarn dev
```

WhatsApp business no accepted callback url without HTTPS, so you can use ngrok [https://ngrok.com/download](https://ngrok.com) login and get the token for ngrok, now you can install ngrok and start it;

```bash
ngrok http 5009 # or the port of this service
```

Now you get a callback url with HTTPS mapped to the port of this service, now you can use this url as callback url;

---

## Endpoints

The principal functions of the service are:
- **POST** `/messages/send-message`: Send a message to a WhatsApp user;
  
```json

{
    "phone": "18099982632",
    "message": "Test the endpoint"
}
```

---
:heart: