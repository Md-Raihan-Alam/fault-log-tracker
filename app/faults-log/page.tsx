import React from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import FaultStatusBadge from "../componenets/FaultStatusBadge";
const FaultsLog = async () => {
  const faults = await prisma.faults.findMany();
  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/faults-log/new">New Fault</Link>
        </Button>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Faults-Log</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {faults.map((fault) => (
            <Table.Row key={fault.id}>
              <Table.Cell>
                {fault.title}
                <div className="block md:hidden">
                  <FaultStatusBadge status={fault.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <FaultStatusBadge status={fault.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {fault.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default FaultsLog;
