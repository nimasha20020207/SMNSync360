const express = require("express");
const router = express.Router();
const twilio = require("twilio");
require("dotenv").config(); // Ensure .env is loaded

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_NUMBER,
  TWILIO_TEMPLATE_SID,
} = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

router.post("/send-whatsapp-message", async (req, res) => {
  const { phoneNumber, templateData } = req.body;

  console.log(`Received phone number: ${phoneNumber}`);
  console.log(`Received message: ${templateData}`);

  try {
    if (!phoneNumber || !templateData) {
      return res
        .status(400)
        .json({ success: false, templateData: "Missing phone number or data" });
    }

    const contentVariables =({
      pid: templateData.P_ID,
      expenses: templateData.totalExpenses,
      budget: templateData.budgetAmount,
    });

    console.log("Content Variables:", contentVariables);
    // Send the message using Twilio API
    const response = await client.messages.create({
      from: TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${phoneNumber}`,
      contentSid: TWILIO_TEMPLATE_SID,
      contentVariables: contentVariables,
    });

    console.log("WhatsApp message sent successfully:", response.sid);
    res
      .status(200)
      .send({ success: true, message: "WhatsApp message sent successfully" });
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    res
      .status(500)
      .send({ success: false, message: "Failed to send WhatsApp message" });
  }
});

module.exports = router;
