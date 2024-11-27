import Stripe from "stripe";
import { NextResponse } from "next/server";

function createParams(customerId: string) {
  const price = process.env.AUTH_BASE_PRICE_ID ?? "";

  const params: Stripe.Checkout.SessionCreateParams = {
    customer: customerId,
    mode: "payment",
    line_items: [
      {
        price: price,
        quantity: 1,
      },
    ],
    success_url: "https://stimme.studio/checkout",
    cancel_url: "https://stimme.studio/checkout",
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

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    const consumerId: string = requestData.consumerId;
    if (!consumerId) {
      return NextResponse.json(
        { error: "consumerId is required" },
        { status: 400 }
      );
    }

    const params = createParams(consumerId);
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
