import React from "react";
import { Table } from "@radix-ui/themes";
import { FaultStatusBadge, Link } from "@/app/componenets";
import prisma from "@/prisma/client";
import FaultActions from "./FaultActions";
const FaultsLog = async () => {
  const faults = await prisma.faults.findMany();
  return (
    <div>
      <FaultActions />
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
                <Link href={`/faults-log/${fault.id}`}>{fault.title}</Link>

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

export const dynamic = "force-dynamic";
// export const revalidate = 0;

export default FaultsLog;
