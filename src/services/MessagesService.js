import axios from "axios";

class MessagesService {
  static async sendMessage({to, message}) {
    const token = process.env.WHATSAPP_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_ID;
    
    axios({
      method: "POST",
      url:
        "https://graph.facebook.com/v12.0/" +
        phoneNumberId +
        "/messages?access_token=" +
        token,
      data: {
        messaging_product: "whatsapp",
        to: to,
        text: { body: message },
      },
      headers: { "Content-Type": "application/json" },
    });
  }
}

export default MessagesService;