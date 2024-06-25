
const stripe = require('stripe')('sk_test_51PV2WAP61eirRjyiexAktaXqA3cjXOf13LJQEKwpG7418UheGDKntv7CXWHVqk43XP9RbFcO05jjxb2nZXt2rScn0012yPTWVR');
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const PayWithStripe = async (req, res) => {
    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2024-04-10' }
    );
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'usd',
        customer: customer.id,
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter
        // is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
    });
// $0.000725 per second +  $0.00115 per second + $0.00115 per second  it take 13 second to create image and I will give the user 400 credits
    res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: 'pk_test_51PV2WAP61eirRjyiDx0FUPqnvrBRrGhEb9uGAtkScsg5JuT20h7SD6ZXnDoPMinzxYPfD7G5NhI7sLavCSQ6c3O700eGFklfsE'
    });
}

module.exports = { PayWithStripe }