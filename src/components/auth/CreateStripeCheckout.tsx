"use client";
import { fetchPostJSON } from "@/functions/api";
import getStripe from "@/utils/get-stripejs";
import Stripe from "stripe";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Button from "../ui/Button";
import { useEffect } from "react";

type CreateStripeCheckoutType = {
  disabled: boolean;
  consumerId: string | undefined;
};

export default function CreateStripeCheckout({
  disabled,
  consumerId,
}: CreateStripeCheckoutType) {
  const getCheckoutSession = async () => {
    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/checkout_sessions",
      { consumerId }
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
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="">
        <Button
          onClick={getCheckoutSession}
          disabled={disabled}
          variant={disabled ? "default" : "ghost"}
        >
          Pay with Card
        </Button>
      </div>
    </>
  );
}
