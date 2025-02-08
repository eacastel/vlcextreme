import React, { useState } from "react";

const Product = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error("Checkout error:", data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <img
        src="https://vlcextreme.com/test-product.jpg"
        alt="VLCExtreme Test Product"
        className="w-full rounded-lg"
      />
      <h2 className="text-2xl font-bold mt-4">VLCExtreme Test Product</h2>
      <p className="text-gray-300 mt-2">A test product for debugging checkout.</p>
      <p className="text-green-400 text-lg font-bold mt-2">€50.00</p>
      <button
        onClick={handleCheckout}
        className={`mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>
    </div>
  );
};

export default Product;
