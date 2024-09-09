"use client";
import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import React from "react";

interface Props {
  NEW: number;
  ACTIVE: number;
  RESOLVED: number;
}

const FaultsChart = ({ NEW, ACTIVE, RESOLVED }: Props) => {
  const data = [
    { label: "New", value: NEW },
    { label: "Active", value: ACTIVE },
    { label: "RESOLVED", value: RESOLVED },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default FaultsChart;
