"use client";

import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <XCircle className="text-red-500 mb-4" size={64} />
      <h1 className="text-2xl font-semibold mb-2">Payment Cancelled</h1>
      <p className="text-gray-600 mb-6">
        Your payment was canceled. No worries—you can try again whenever you're
        ready.
      </p>
      <Link href="/bonus">
        <Button variant="outline">Back to Bonus</Button>
      </Link>
    </div>
  );
}
