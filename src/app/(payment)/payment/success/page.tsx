// app/payment/success/page.tsx

import { Suspense } from "react";
import PaymentSuccessPage from "@/components/payment-success";

export default function Page() {
  return (
    <Suspense
      fallback={<div className="p-8 text-center">Verifying payment...</div>}
    >
      <PaymentSuccessPage />
    </Suspense>
  );
}
