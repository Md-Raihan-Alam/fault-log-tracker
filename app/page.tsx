import prisma from "@/prisma/client";
import Pagination from "./componenets/Pagination";
import FaultSummary from "./FaultSummary";
import LatestFaults from "./LatestFaults";
import FaultsChart from "./FaultsChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const NEW = await prisma.faults.count({ where: { status: "NEW" } });
  const ACTIVE = await prisma.faults.count({ where: { status: "ACTIVE" } });
  const RESOLVED = await prisma.faults.count({ where: { status: "RESOLVED" } });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <FaultSummary NEW={NEW} ACTIVE={ACTIVE} RESOLVED={RESOLVED} />
        <FaultsChart NEW={NEW} ACTIVE={ACTIVE} RESOLVED={RESOLVED} />
      </Flex>
      <LatestFaults />
    </Grid>
  );
}
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Fault Log Tracker - Dashboard ",
  description:
    "Monitor and manage system faults or bugs with real-time summaries, detailed logs, and visual charts.",
};
