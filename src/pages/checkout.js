import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Layout from "../components/Layout";
import { navigate } from "gatsby";

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe no está listo todavía. Intenta de nuevo.");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.GATSBY_SITE_URL}/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-dark-gray p-6 rounded-xl shadow-xl text-white"
    >
      <h2 className="text-2xl font-bold mb-4 text-neon-cyan">Finalizar compra</h2>
      <div className="border border-neon-cyan rounded-md p-4">
        <PaymentElement />
      </div>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-6 bg-neon-cyan text-carbon-black px-6 py-2 rounded-md font-bold w-full hover:opacity-90"
      >
        {loading ? "Procesando..." : "Pagar ahora"}
      </button>
    </form>
  );
}

export default function CheckoutPage({ location }) {
  const [clientSecret, setClientSecret] = useState("");

  const { state } = location;
  const { name, price, description } = state || {};

  useEffect(() => {
    if (!name || !price) {
      console.warn("Missing state info. Redirecting to home.");
      navigate("/", { replace: true });
      return;
    }

    console.log("Fetching payment intent for:", { name, price, description });

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, description }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Received client secret:", data.clientSecret);
        setClientSecret(data.clientSecret);
      })
      .catch((err) => {
        console.error("Error fetching payment intent:", err);
        navigate("/", { replace: true });
      });
  }, [name, price, description]);

  if (!clientSecret) return <p className="text-center mt-10 text-gray-300">Cargando checkout...</p>;

  return (
    <Layout>
      <div className="py-16 px-4">
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      </div>
    </Layout>
  );
}
