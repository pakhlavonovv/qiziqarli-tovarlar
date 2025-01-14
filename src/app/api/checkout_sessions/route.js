import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { name, price, email } = await req.json();

    const totalAmount = price * 100; 

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name,
            },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      billing_address_collection: 'required',
      customer_email: email,
      phone_number_collection: {
        enabled: true,
      },
      custom_fields: [
        {
          key: 'delivery_instructions',
          label: { type: 'custom', custom: 'Delivery Instructions' },
          type: 'text',
          optional: false,
        },
      ],
    });

    console.log('Stripe Session:', session);
    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
