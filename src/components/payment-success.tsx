"use client";

import { Button } from "@/components/ui/button";
import { useGetPaymentStatusQuery } from "@/store/api/usersApi";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  const { data, isLoading, isError } = useGetPaymentStatusQuery(sessionId!, {
    skip: !sessionId,
  });

  // const data = useGetPaymentStatusQuery(sessionId!, {
  //   skip: !sessionId,
  // });

  console.log(data);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      {isLoading ? (
        <>
          <Loader2 className="animate-spin text-gray-500 mb-4" size={48} />
          <p>Verifying payment...</p>
        </>
      ) : isError || !data?.success ? (
        <>
          <p className="text-red-500 text-xl mb-2 font-semibold">
            Payment Failed
          </p>
          <p className="text-gray-600 mb-6">
            {data?.message || "Something went wrong."}
          </p>
        </>
      ) : (
        <>
          <CheckCircle2 className="text-green-500 mb-4" size={64} />
          <h1 className="text-2xl font-semibold mb-2">Payment Successful</h1>
          <p className="text-gray-600 mb-6">{data.message}</p>
        </>
      )}

      <Link href="/bonus">
        <Button>Back to Bonus</Button>
      </Link>
    </div>
  );
}
