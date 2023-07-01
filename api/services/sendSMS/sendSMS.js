import AfricasTalking from "africastalking";

const africastalking = AfricasTalking({
  apiKey: "53db89223760e368b68d63296898cc0f22c707ddeefb7498632329e1e7348d6c",
  username: "cymstar",
});

const sms = africastalking.SMS

const options = {
    to: ['+255'],
    message: "Umefanikiwa kutumia mfumo wa AFRICASTALKING"
}

const sendSMS = async () => {
  try {
    await sms.send(options).then(res => {
        console.log(res);
        res.status(200).json({ Message: "SMS Sent Successfully" });
    });
  } catch (err) {
    console.error(err);
  }
};

export default sendSMS;
