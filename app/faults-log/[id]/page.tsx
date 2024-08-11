import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import EditFaultLogButton from "./EditFaultLogButton";
import FaultDetails from "./FaultDetails";

interface Props {
  params: { id: string };
}

const FaultDetailPage = async ({ params }: Props) => {
  //   if (typeof params.id !== "number") notFound(); - fix it
  const fault = await prisma.faults.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!fault) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <FaultDetails fault={fault} />
      </Box>
      <Box>
        <EditFaultLogButton faultId={fault.id} />
      </Box>
    </Grid>
  );
};

export default FaultDetailPage;
