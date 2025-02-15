import React from "react";

const PaymentMethods = () => {
  return (
    <div className="flex items-center justify-start gap-3">
      <img src="/payments/bitcoin.svg" alt="Bitcoin" className="w-8 h-auto" />
      <img src="/payments/visa.svg" alt="Visa" className="w-11 h-auto" />
      <img src="/payments/master-card.svg" alt="MasterCard" className="w-11 h-auto" />
      <img src="/payments/amex.svg" alt="American Express" className="w-11 h-auto" />
      <img src="/payments/paypal.svg" alt="PayPal" className="w-11 h-auto" />
      
    </div>
  );
};

export default PaymentMethods;