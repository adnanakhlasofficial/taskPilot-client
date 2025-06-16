"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // ✅ Import Button
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  User,
  PhoneCall,
  MapPin,
  Component as DesignIcon,
  DollarSign as DollarIcon,
  Receipt,
} from "lucide-react";

/**
 * Member record shape
 */
interface Member {
  name: string;
  phone: string;
  address: string;
  Role: string;
  amountToBePaid: string;
  lastPaidAmount: string;
}

/**
 * Sample data
 */
const members: Member[] = [
  {
    name: "John Doe",
    phone: "01234567890",
    address: "123 Main St",
    Role: "Leader",
    amountToBePaid: "৳5,000",
    lastPaidAmount: "৳2,000",
  },
  {
    name: "Jane Smith",
    phone: "01987654321",
    address: "456 Park Ave",
    Role: "Co-Leader",
    amountToBePaid: "৳3,000",
    lastPaidAmount: "৳3,000",
  },
  {
    name: "Shoeb Akhter",
    phone: "0152365855",
    address: "Las Vegas",
    Role: "Team Member",
    amountToBePaid: "৳3,000",
    lastPaidAmount: "৳3,000",
  },
  {
    name: "Nasir Uddin",
    phone: "01687745569",
    address: "Lahore, Pakistan",
    Role: "Viewer",
    amountToBePaid: "৳3,000",
    lastPaidAmount: "৳3,000",
  },
];

export default function BonusMembersTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = members.filter((m) => {
    const q = searchTerm.toLowerCase().trim();
    return (
      m.name.toLowerCase().includes(q) ||
      m.phone.toLowerCase().includes(q) ||
      m.address.toLowerCase().includes(q) ||
      m.Role.toLowerCase().includes(q) ||
      m.amountToBePaid.toLowerCase().includes(q) ||
      m.lastPaidAmount.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                Bonus Management Dashboard
              </CardTitle>
              <p className="mt-1 text-muted-foreground">
                Track bonuses across teams
              </p>
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search members…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Member Name
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <PhoneCall className="h-4 w-4" />
                      Phone
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Address
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <DesignIcon className="h-4 w-4" />
                      Role
                    </div>
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <DollarIcon className="h-4 w-4" />
                      Amount to be Paid
                    </div>
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Receipt className="h-4 w-4" />
                      Last Paid Amount
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredMembers.map((m) => (
                  <TableRow
                    key={m.phone}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <TableCell>{m.name}</TableCell>
                    <TableCell>{m.phone}</TableCell>
                    <TableCell>{m.address}</TableCell>
                    <TableCell>{m.Role}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{m.amountToBePaid}</span>

                        <Button
                          onClick={() =>
                            alert(`Initiating payment for ${m.name}`)
                          }
                        >
                          Pay Now
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{m.lastPaidAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredMembers.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No members found.
            </div>
          )}

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredMembers.length} of {members.length} members
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
