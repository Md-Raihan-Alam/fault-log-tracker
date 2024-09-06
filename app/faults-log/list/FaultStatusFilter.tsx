"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "ALL" },
  { label: "New", value: "NEW" },
  { label: "Active", value: "ACTIVE" },
  { label: "Resolved", value: "RESOLVED" },
];

const FaultStatusFilter = () => {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status !== "ALL" ? "?status=" + status : "";
        router.push("/faults-log/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || "ALL"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default FaultStatusFilter;
