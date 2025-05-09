const express = require('express');
const router = express.Router();
const twilio = require('twilio');
require('dotenv').config(); // Ensure .env is loaded

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_NUMBER
} = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

router.post('/send-whatsapp-message', async (req, res) => {
  const { phoneNumber, message } = req.body;

  console.log(`Received phone number: ${phoneNumber}`);
  console.log(`Received message: ${message}`);

  try {
    // Validate phone number and message
    if (!phoneNumber || !message) {
      return res.status(400).send({ success: false, message: 'Phone number or message is missing' });
    }

    // Send the message using Twilio API
    const response = await client.messages.create({
      body: message,
      from: TWILIO_WHATSAPP_NUMBER, // Twilio WhatsApp number
      to: `whatsapp:${phoneNumber}`, // Recipient's phone number
    });

    console.log('WhatsApp message sent successfully:', response.sid);
    res.status(200).send({ success: true, message: 'WhatsApp message sent successfully' });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    res.status(500).send({ success: false, message: 'Failed to send WhatsApp message' });
  }
});

module.exports = router;
