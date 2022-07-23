import MessagesService from './MessagesService';

class Webhook {
  // Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
  // info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests 
  static async setup(req, res) {
    /**
     * UPDATE YOUR VERIFY TOKEN
     *This will be the Verify Token value when you set up webhook
    **/
    const verify_token = process.env.VERIFY_TOKEN;

    // Parse params from the webhook verification request
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode were sent
    if (mode && token) {
      // Check the mode and token sent are correct
      if (mode === "subscribe" && token === verify_token) {
        // Respond with 200 OK and challenge token from the request
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }
  }

  static async listenMessages(req, res) {
    try {
      // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
      if (req.body.object) {
        if (isValidBodyEntry(req.body)) {

          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          let message = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload

          // Send back the same message
          MessagesService.sendMessage({ to: from, message: message });
        }
        res.sendStatus(200);
      } else {
        // Return a '404 Not Found' if event is not from a WhatsApp API
        res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const isValidBodyEntry = (body) => {
  if (
    body.entry &&
    body.entry[0].changes &&
    body.entry[0].changes[0] &&
    body.entry[0].changes[0].value.messages &&
    body.entry[0].changes[0].value.messages[0]) {
    return true;
  }
  return false;
}
export default Webhook;