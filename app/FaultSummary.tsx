import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  NEW: number;
  ACTIVE: number;
  RESOLVED: number;
}

const FaultSummary = ({ NEW, ACTIVE, RESOLVED }: Props) => {
  const statuses: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    {
      label: "Opens Faults-Log",
      value: NEW,
      status: "NEW",
    },
    {
      label: "Actives Faults-Log",
      value: ACTIVE,
      status: "ACTIVE",
    },
    {
      label: "Resolveds Faults-Log",
      value: RESOLVED,
      status: "RESOLVED",
    },
  ];
  return (
    <Flex gap="4">
      {statuses.map((status) => (
        <Card key={status.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/faults-log/list?status=${status.status}`}
            >
              {status.label}
            </Link>
            <Text>{status.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default FaultSummary;
