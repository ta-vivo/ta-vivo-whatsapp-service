import axios from "axios";

class MessagesService {
  static async sendMessage({to, message}) {
    const token = process.env.WHATSAPP_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_ID;
    try {
      return axios({
        method: "POST",
        url:
          "https://graph.facebook.com/v13.0/" +
          phoneNumberId +
          "/messages",
        data: {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: to,
          type: "text",
          text: { preview_url: false, body: message },
        },
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
      })
      .then(response => {
        console.log(`message sent to ${to}`);
      })
      .catch(() => {
        throw { message: 'Error to send message' };
      })
    } catch (error) {
      throw error;
    }
  }
}

export default MessagesService;