"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function checkoutCredits(amountInTaka: number) {
  const amountInPaisa = amountInTaka * 100; // Convert BDT to paisa (assuming no decimals)

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "bdt",
          product_data: {
            name: "Team Member Bonus",
          },
          unit_amount: amountInPaisa,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/canceled`,
  });

  redirect(session.url!);
}
