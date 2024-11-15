import { NextResponse } from "next/server";
import Stripe from "stripe";
import { updateUserIsPro } from "./functions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret)
      return new Response("Webhook secret not found.", { status: 400 });
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`🔔  Webhook received: ${event.type}`);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.info(`Event is constructed`);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionPaymentSucceeded = event.data
        .object as Stripe.Checkout.Session;
      const stripeCustomerId =
        checkoutSessionPaymentSucceeded.customer as string;

      try {
        const response = await updateUserIsPro(stripeCustomerId);
      } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
          { error: "Error updating user" },
          { status: 500 }
        );
      }

      break;
    case "checkout.session.expired":
      console.error("Error in checkout: ", "checkout session expired");
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Respond to Stripe
  return NextResponse.json({ received: true }, { status: 200 });
}
