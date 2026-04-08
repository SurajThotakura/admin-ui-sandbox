"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { topProducts } from "../data/mockData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "./ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./ui/table";

function TrendIcon({ trend }) {
  if (trend === "up") return <span className="inline-flex ml-1.5" style={{ color: "var(--color-status-good)" }}><TrendingUp size={13} /></span>;
  if (trend === "down") return <span className="inline-flex ml-1.5" style={{ color: "var(--color-status-critical)" }}><TrendingDown size={13} /></span>;
  return <span className="inline-flex ml-1.5" style={{ color: "var(--color-gray-300)" }}><Minus size={13} /></span>;
}

export default function TopProducts() {
  return (
    <Card className="animate-slide-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
      <CardHeader>
        <div>
          <CardTitle>Top Products</CardTitle>
          <CardDescription>By page views this week</CardDescription>
        </div>
        <CardAction>All products</CardAction>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: 36 }}>#</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Conv. Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topProducts.map((p) => (
              <TableRow key={p.rank}>
                <TableCell>
                  <div
                    className="w-6 h-6 flex items-center justify-center text-[11px] font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      background: p.rank <= 3 ? "var(--color-accent-pale)" : "var(--color-sand-100)",
                      color: p.rank <= 3 ? "var(--color-gray-700)" : "var(--color-gray-400)",
                    }}
                  >
                    {p.rank}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-gray-800)" }}>
                    {p.name}
                  </div>
                  <div className="text-[11px] mt-px" style={{ color: "var(--color-gray-300)" }}>{p.category}</div>
                </TableCell>
                <TableCell className="tabular-nums">{p.views}</TableCell>
                <TableCell className="text-right font-semibold tabular-nums">
                  {p.conversions}
                  <TrendIcon trend={p.trend} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
