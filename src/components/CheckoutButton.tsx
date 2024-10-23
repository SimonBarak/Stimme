"use client";

import { fetchPostJSON } from "@/functions/api";
import getStripe from "@/utils/get-stripejs";
import Stripe from "stripe";
import Button from "./ui/Button";

export default function CheckoutButton() {
  const getCheckoutSession = async () => {
    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/checkout_sessions"
    );

    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    if (error) {
      console.error("we have a error");
      console.warn(error.message);
    }
  };

  return (
    <div className="-">
      <Button onClick={getCheckoutSession}>Checkout</Button>
    </div>
  );
}
