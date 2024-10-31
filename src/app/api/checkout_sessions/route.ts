import Stripe from "stripe";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

function createParams() {
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: "payment",
    line_items: [
      {
        price: "price_1QD3DfDdBbiTQ6WNi4ocBwF4",
        quantity: 1,
      },
    ],
    success_url: "https://hlasem.com/edit", //`${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: "https://hlasem.com", //`${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
  };

  return params;
}

async function createCheckoutSession(
  params: Stripe.Checkout.SessionCreateParams
) {
  try {
    // Initialize Stripe with your secret key
    // @ts-ignore
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);
    return checkoutSession;
  } catch (error: any) {
    // Log the error and any available information from the Stripe API response
    console.error("Error creating Checkout Session:", error);

    if (error?.raw?.message) {
      console.error("Stripe Error:", error.raw.message);
    }

    // Optionally, you can rethrow the error if you want to handle it further up
    throw new Error(
      error.message || "An error occurred while creating Checkout Session"
    );
  }
}

export async function POST() {
  try {
    const params = createParams();
    const session = await createCheckoutSession(params);
    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
