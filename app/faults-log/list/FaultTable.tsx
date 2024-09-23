import React from "react";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import { FaultStatusBadge, Link } from "@/app/componenets";
import NextLink from "next/link";
import { Faults, Status } from "@prisma/client";

export interface FaultQuery {
  status: Status;
  orderBy: keyof Faults;
  page: string;
}

interface Props {
  searchParams: FaultQuery;
  faults: Faults[];
}

const FaultTable = ({ searchParams, faults }: Props) => {
  console.log(faults);
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columsn.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
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
  );
};

const columsn: {
  label: string;
  value: keyof Faults;
  className?: string;
}[] = [
  { label: "Faults-Log", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columsn.map((column) => column.value);

export default FaultTable;
