import './Payment.css';
import { useTenant } from '../tenantContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Payment() {
  const { tenant } = useTenant();
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error('Event Fetch Error:', err));
  }, [id]);

async function handlePayment(e) {
  e.preventDefault();
  if (!event) return;

  try {
    const orderRes = await axios.post('https://event-management-y1ne.onrender.com/payment/checkout', {
      amount: event.price * 100,
    });

    const { id: order_id, amount } = orderRes.data;
    const keyRes = await axios.get('https://event-management-y1ne.onrender.com/payment/key');
    const { key_id } = keyRes.data;

    const options = {
      key: key_id,
      amount,
      currency: 'INR',
      name: 'Event Booking',
      description: event.name,
      image: 'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa-mastercard.png',
      order_id,
      prefill: {
        name: tenant.name,
        email: tenant.email,
        contact: tenant.phone_no,
      },
      notes: {
        eventId: id,
        tenantId: tenant._id,
      },
      theme: {
        color: '#528FF0',
      },
      handler: async function (response) {
        try {
          console.log("Sending userId:", tenant._id);
          const verifyRes = await axios.post(
            'https://event-management-y1ne.onrender.com/payment/verification',
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              eventId: id,
              userId: tenant._id,
            },
            {
              withCredentials: true,
            }
          );

          if (verifyRes.data.success) {
            window.location.href = "/UserPage";
          } else {
            alert('Payment verification failed!');
          }
        } catch (error) {
          alert('Payment verification failed!');
          console.error(error);
        }
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  } catch (error) {
    console.error('Payment Error:', error);
    alert('Payment initiation failed. Try again.');
  }
}


  return (
    <div className="payment_container app_container p-10 pt-4  color:rgb(202, 199, 199)">
      <form onSubmit={handlePayment}>
        <div className="row">
          <div className="col">
            <h3 className="title font-serif font-bold text-3xl">Billing Address</h3>
            <div className="inputBox mt-9">
              <span>Full Name :</span>
              <input type="text" placeholder="John Doe" required />
            </div>
            <div className="inputBox mt-9">
              <span>Email :</span>
              <input type="email" placeholder="john@example.com" required />
            </div>
            <div className="inputBox mt-9">
              <span>Address :</span>
              <input type="text" placeholder="House No, Street, City" required />
            </div>
            <div className="inputBox mt-9">
              <span>City :</span>
              <input type="text" placeholder="Delhi" required />
            </div>
            <div className="flex gap-2">
              <div className="inputBox mt-9">
                <span>State :</span>
                <input type="text" placeholder="Maharashtra" required />
              </div>
              <div className="inputBox mt-9">
                <span>Zip Code :</span>
                <input type="text" placeholder="400001" required />
              </div>
            </div>
          </div>

          <div className="col">
            <h3 className="title text-3xl font-serif font-bold">Payment</h3>
            <div className="inputBox flex items-center gap-2 mt-9">
              <span>Cards Accepted :</span>
              <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
              <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" />
              <img src="https://img.icons8.com/color/48/000000/amex.png" alt="AMEX" />
              <img src="https://img.icons8.com/color/48/000000/discover.png" alt="Discover" />
            </div>
            <div className="inputBox mt-6">
              <span>Name on Card :</span>
              <input type="text" placeholder="John Doe" required className='ml-3'/>
            </div>
            <div className="inputBox mt-9">
              <span>Card Number :</span>
              <input type="text" placeholder="1111-2222-3333-4444" required className='ml-3' />
            </div>
            <div className="inputBox mt-9">
              <span>Exp Month :</span>
              <input type="text" placeholder="January" required />
            </div>
            <div className="flex gap-3">
              <div className="inputBox mt-9">
                <span>Exp Year :</span>
                <input type="number" placeholder="2028" required />
              </div>
              <div className="inputBox mt-9">
                <span>CVV :</span>
                <input type="text" placeholder="123" required />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="mt-8 ml-96 bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600 hover:text-green-950">
          Proceed to Checkout
        </button>
      </form>
    </div>
  );
}
