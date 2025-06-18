"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  useCreateCheckoutSessionMutation,
  useGetUsersQuery,
} from "@/store/api/usersApi";

export default function BonusTable() {
  const { data, isLoading } = useGetUsersQuery();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const [amounts, setAmounts] = useState<{ [key: string]: number }>({});

  const users = data?.data || [];

  const handleGiveBonus = async (userId: string) => {
    const amount = amounts[userId];
    if (!amount) return;

    try {
      const { data } = await createCheckoutSession({
        productName: "Football",
        amount,
        userId,
      }).unwrap();

      // console.log(data.url);
      window.location.href = data.url;
    } catch (err) {
      console.error("Failed to create checkout session:", err);
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">User</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Bonus</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any, i: number) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{i + 1}</td>
              <td className="p-2 flex items-center gap-2">
                <Image
                  src={user.image}
                  alt={user.userName}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                {user.userName}
              </td>
              <td className="p-2">{user.email}</td>
              <td className="p-2 capitalize">{user.role}</td>
              <td className="p-2">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={amounts[user.id] || ""}
                  onChange={(e) =>
                    setAmounts({
                      ...amounts,
                      [user.id]: Number(e.target.value),
                    })
                  }
                />
              </td>
              <td className="p-2">
                <Button onClick={() => handleGiveBonus(user.id)}>
                  Give Bonus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isLoading && (
        <p className="mt-4 text-center text-sm">Loading users...</p>
      )}
    </div>
  );
}
