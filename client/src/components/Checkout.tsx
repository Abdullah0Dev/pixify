import { useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { Pressable, View } from "react-native";




export default function CheckoutScreen() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
  
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`http://10.0.2.2:4000/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { paymentIntent, ephemeralKey, customer, publishableKey} = await response.json();
  
      return {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey
      };
    };
  
    const initializePaymentSheet = async () => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      } = await fetchPaymentSheetParams();
  
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        }
      });
      if (!error) {
        setLoading(true);
      }
    };
  
    const openPaymentSheet = async () => {
      // see below
    };
  
    useEffect(() => {
      initializePaymentSheet();
    }, []);
  
    return (
      <View className="flex flex-1 justify-center items-center ">
        <Pressable disabled={!loading} onPress={openPaymentSheet}>
            <Text className='text-white bg-action py-3 px-5 rounded-lg self-center'>Checkout</Text>
        </Pressable>
      </View>
    );
  }