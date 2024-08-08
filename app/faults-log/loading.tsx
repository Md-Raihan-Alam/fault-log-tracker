import React from "react";
import FaultStatusBadge from "../componenets/FaultStatusBadge";
import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FaultActions from "./FaultActions";
const LoadingFaultsPage = async () => {
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
                {/* {fault.title} */}
                <Skeleton />
                <div className="block md:hidden">
                  {/* <FaultStatusBadge status={fault.status} /> */}
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {/* <FaultStatusBadge status={fault.status} /> */}
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {/* {fault.createdAt.toDateString()} */}
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingFaultsPage;
