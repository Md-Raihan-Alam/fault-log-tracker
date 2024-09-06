import React from "react";
import { Table } from "@radix-ui/themes";
import { FaultStatusBadge, Link } from "@/app/componenets";
import NextLink from "next/link";
import prisma from "@/prisma/client";
import FaultActions from "./FaultActions";
import { Faults, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: { status: Status; orderBy: keyof Faults };
}

const FaultsLog = async ({ searchParams }: Props) => {
  const columsn: {
    label: string;
    value: keyof Faults;
    className?: string;
  }[] = [
    { label: "Faults-Log", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columsn
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const faults = await prisma.faults.findMany({
    where: {
      status: status,
    },
    orderBy,
  });
  return (
    <div>
      <FaultActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columsn.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
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
