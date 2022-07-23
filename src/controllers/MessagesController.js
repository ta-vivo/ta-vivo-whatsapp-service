import MessageService from '../services/MessagesService';

class MessageController {

  static async sendMessage(req, res) {
    try {
      const phone = req.body.phone;
      const message = req.body.message;

      if (!phone || !message) {
        res.status(400).json({
          status: 400,
          error: "Missing parameters"
        });
        return;
      }

      await MessageService.sendMessage({ to: phone, message });
      res.status(200).json({
        status: 200,
        message: "Message sent"
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }

}

export default MessageController;