import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text(); // Stripe requires the raw body for signature validation

  let event;

  // If the signature is null, return an error response
  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("event.type:", event.type);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (session.customer_details) {
      console.log(session.customer_details.email);
    }

    // Retrieve the customer email
    const email = session.customer_email;

    try {
      // Call your user creation logic
      // await createUser({ email });
      // console.log("User created successfully:", email);
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        { error: "Error creating user" },
        { status: 500 }
      );
    }
  }

  // // Handle the event
  // switch (event.type) {
  //   case "payment_intent.succeeded":
  //     const paymentIntent = event.data.object;
  //     console.log("PaymentIntent was successful!", paymentIntent);
  //     break;
  //   case "invoice.payment_failed":
  //     const invoice = event.data.object;
  //     console.log("Invoice payment failed.", invoice);
  //     break;
  //   // Add more event types as needed
  //   default:
  //     console.log(`Unhandled event type ${event.type}`);
  // }

  // Respond to Stripe
  return NextResponse.json({ received: true }, { status: 200 });
}
