import crypto from 'crypto';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, price, count } = body;

    if (!name || isNaN(price) || isNaN(count)) {
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }

    const amount = (parseFloat(price) * parseInt(count)).toFixed(2);
    const currency = 'USD';
    const order_id = `order_${Date.now()}`;

    const PAYEER_MERCHANT_ID = process.env.NEXT_PUBLIC_PAYEER_MERCHANT_ID;
    const PAYEER_SECRET_KEY = process.env.PAYEER_SECRET;
    const PAYEER_SUCCESS_URL = process.env.NEXT_PUBLIC_PAYEER_SUCCESS_URL;
    const PAYEER_FAIL_URL = process.env.NEXT_PUBLIC_PAYEER_FAIL_URL;
    const PAYEER_PAYMENT_URL = 'https://payeer.com/merchant/';

    const description = Buffer.from(name).toString('base64');

    const signData = [
      PAYEER_MERCHANT_ID,
      order_id,
      amount,
      currency,
      description,
      PAYEER_SECRET_KEY
    ].join(':');

    const sign = crypto.createHash('sha256').update(signData).digest('hex').toUpperCase();

    const paymentUrl = `${PAYEER_PAYMENT_URL}?m_shop=${PAYEER_MERCHANT_ID}&m_orderid=${order_id}&m_amount=${amount}&m_curr=${currency}&m_desc=${description}&m_sign=${sign}&m_success_url=${PAYEER_SUCCESS_URL}&m_fail_url=${PAYEER_FAIL_URL}`;

    return Response.json({ url: paymentUrl }, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
