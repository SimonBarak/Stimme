import { NextRequest, NextResponse } from "next/server";
import { updateUserIsPro } from "./functions";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const payload = await req.text(); // Stripe sends the payload as raw text
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (endpointSecret && signature) {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      );
    } else {
      throw new Error("Webhook signature verification failed.");
    }
  } catch (err: any) {
    console.error(`⚠️ Webhook signature verification failed.`, err.message);
    return new NextResponse(`Webhook error: ${err.message}`, { status: 400 });
  }

  console.log(event.type);

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      const stripeCustomerId = checkoutSession.customer as string;

      try {
        await updateUserIsPro(stripeCustomerId);
      } catch (error) {
        console.error("Error updating user:", error);
        return new NextResponse("Error updating user.", { status: 500 });
      }
      break;

    case "checkout.session.expired":
      console.error("Checkout session expired");
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return new NextResponse("Webhook received.", { status: 200 });
}
