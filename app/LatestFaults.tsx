import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import React from "react";
import Link from "next/link";
import { FaultStatusBadge } from "./componenets";

const LatestFaults = async () => {
  const faults = await prisma.faults.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Faults Log
      </Heading>
      <Table.Root>
        <Table.Body>
          {faults.map((fault) => (
            <Table.Row key={fault.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/faults-log/${fault.id}`}>{fault.title}</Link>
                    <FaultStatusBadge status={fault.status} />
                  </Flex>
                  {fault.assignedToUser && (
                    <Avatar
                      size="2"
                      radius="full"
                      fallback="?"
                      src={fault.assignedToUser?.image!}
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestFaults;
