// ... existing code ...
    // Make sure PAYEER_MERCHANT_ID is properly defined and formatted
    const PAYEER_MERCHANT_ID = process.env.PAYEER_MERCHANT_ID;
    
    // Verify merchant ID is not empty
    if (!PAYEER_MERCHANT_ID) {
        throw new Error('Payeer Merchant ID is not configured');
    }

    // Remove any whitespace from merchant ID
    const cleanMerchantId = PAYEER_MERCHANT_ID.trim();

    const signData = [
        cleanMerchantId,
        order_id,
        amount,
        currency,
        description,
        PAYEER_SECRET_KEY
    ].join(':');

    const sign = crypto.createHash('sha256').update(signData).digest('hex').toUpperCase();

    const paymentUrl = `${PAYEER_PAYMENT_URL}?m_shop=${cleanMerchantId}&m_orderid=${encodeURIComponent(order_id)}&m_amount=${encodeURIComponent(amount)}&m_curr=${encodeURIComponent(currency)}&m_desc=${encodedDescription}&m_sign=${encodeURIComponent(sign)}`;
// ... existing code ...