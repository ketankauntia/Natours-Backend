/* eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

// const stripe = Stripe(
//   'pk_test_51K9l2aSA8AWcps43dv9QLYMhGWlRXIUNyR8PbWKnslw1kciu6cLHV5Q2H4gnQraddUvXpQMrI8hDW920lV2ngDrI00OTT1Mxhy'
// );

export const bookTour = async tourId => {
  const stripe = Stripe(
    'pk_test_51K9l2aSA8AWcps43dv9QLYMhGWlRXIUNyR8PbWKnslw1kciu6cLHV5Q2H4gnQraddUvXpQMrI8hDW920lV2ngDrI00OTT1Mxhy'
  );

  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge the credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
