# Ta-vivo WhatsApp service

This is a WhatsApp service for Ta-vivo or any other project to send and receive messages via WhatsApp business.

:warning: For developments, you need HTTPS to work, at this point I recommend using ngrok to make an HTTPS tunnel (Check the docs below).

---

# Table of content

  - [Get started](#get-started)
    - [Get the access token from Meta](#get-the-access-token-from-meta)
    - [Start the server](#start-the-server)
  - [Endpoints](#endpoints)
  - [Docker](#docker)

---

## Get started

```bash
yarn
```

Create the `.env` file into `api` directory, use the `example.env` file;

```bash
cp example.env .env
```

Create a simple JWT to make requests;

```bash
node src/utils/createJWT.js
```

### Get the access token from Meta

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

- **POST** `/messages/send-message-template`: Send a template message;

```json
  {
      "phone": "18099982632",
      "template": {
        "name": "unique_code_request",
        "components": [
          {
            "type": "body",
            "parameters": [
              {
                "type": "text",
                "text": "unicode or the message"
              }
            ]
          }
        ]
      }
  }
  ```
Read more about the templates [here](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-message-templates#text-based)

## Docker

For development you can use the `docker-compose.dev.yml` file;

```bash
docker-compose -f docker-compose.dev.yml up
```

For production you can use the `docker-compose.yml` file;

```bash
docker-compose up
```

---
:heart: