import React from "react";
import prisma from "@/prisma/client";
import FaultActions from "./FaultActions";
import { Faults, Status } from "@prisma/client";
import Pagination from "@/app/componenets/Pagination";
import FaultTable, { columnNames, FaultQuery } from "./FaultTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: FaultQuery;
}

const FaultsLog = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const where = { status };

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const faults = await prisma.faults.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const faultCount = await prisma.faults.count({ where });

  return (
    <Flex direction="column" gap="3">
      <FaultActions />
      <FaultTable searchParams={searchParams} faults={faults} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={faultCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";
// export const revalidate = 0;

export const metadata: Metadata = {
  title: "Fault Log Tracker - Fault Log List",
  description:
    "Browse and manage detailed logs of project faults and system issues, with filtering and sorting options.",
};

export default FaultsLog;
