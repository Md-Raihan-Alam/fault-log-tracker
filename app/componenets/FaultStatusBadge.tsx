import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  NEW: { label: "New", color: "red" },
  ACTIVE: { label: "Active", color: "violet" },
  RESOLVED: { label: "Resolved", color: "green" },
};

const FaultStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default FaultStatusBadge;
