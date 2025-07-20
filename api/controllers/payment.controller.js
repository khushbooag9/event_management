const Razorpay = require("razorpay");
const instance = require("../config/razorpay.js");
const crypto=require('crypto');
require('dotenv').config({path:'./.env'});
const Event= require('../models/Event.js');
const Booking= require('../models/Booking.js');
module.exports.checkout = async (req, res) => {
  try{
    let amount=req.body.amount;
    const options = {
        amount: amount, // amount in the smallest currency unit
        currency: "INR",
      };
      let result= await instance.orders.create(options);
        res.status(200).send(result);
  }
  catch(e){
    console.log(e);
    res.status(400).send("Error");
  }
};

module.exports.verification = async (req, res) => {
  try{
      const{razorpay_payment_id,razorpay_order_id,razorpay_signature, eventId,userId}=req.body;

      const body=razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');


      if(expectedSignature===razorpay_signature){
        await Booking.create({
        user: userId,
        event: eventId,
        paymentId: razorpay_payment_id,
        status: 'booked'
      });
        res.status(200).json({ success: true, message: "Payment verified" });

        
      }
      else{
        res.status(400).send("Error");
      }
  }
  catch(e){
    console.log(e);
    res.status(400).send("Error");
  }
};
