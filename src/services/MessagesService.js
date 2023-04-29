import axios from "axios";

class MessagesService {

  static async sendMessageTemplate({ to, template }) {
    const token = process.env.WHATSAPP_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_ID;

    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: "template",
      template: { ...template, language: { code: "en" } }
    }
    const url = `https://graph.facebook.com/v14.0/${phoneNumberId}/messages`;

    try {
      return axios({
        method: "POST",
        url: url,
        data: payload,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
      })
        .then(() => {
          console.log(`message sent to ${to}`);
        })
        .catch((error) => {
          console.log('🚀 ~ file: MessagesService.js ~ line 27 ~ MessagesService ~ sendMessage ~ error', error.response.data)
          throw { message: 'Error to send message' };
        })
    } catch (error) {
      throw error;
    }
  }
  
  static async sendMessage({ to, message }) {
    const token = process.env.WHATSAPP_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_ID;
    try {
      return axios({
        method: "POST",
        url:
          "https://graph.facebook.com/v14.0/" +
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
        .then(() => {
          console.log(`message sent to ${to}`);
        })
        .catch((error) => {
          console.log('🚀 ~ file: MessagesService.js ~ line 27 ~ MessagesService ~ sendMessage ~ error', error.response.data)
          throw { message: 'Error to send message' };
        })
    } catch (error) {
      throw error;
    }
  }
}

export default MessagesService;