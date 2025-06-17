"use client";

import api from "../../utils/axios";
import React from "react";

type Props = {
  productName: string;
  amount: number;
  userId: string;
};

const CheckoutButton = ({ productName, amount, userId }: Props) => {
  const handleCheckout = async () => {
    try {
      const res = await api.post("/payment/create-checkout-session", {
        productName,
        amount,
        userId,
      });

      if (res.data?.data?.url) {
        window.location.href = res.data.data.url;
      }
    } catch (err) {
      console.error("Stripe checkout error:", err);
    }
  };

  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      onClick={handleCheckout}
    >
      Pay ${amount / 100}
    </button>
  );
};

export default CheckoutButton;
