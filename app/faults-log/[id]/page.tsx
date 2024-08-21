import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import EditFaultLogButton from "./EditFaultLogButton";
import FaultDetails from "./FaultDetails";
import DeleteFaultButton from "./DeleteFaultButton";

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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <FaultDetails fault={fault} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditFaultLogButton faultId={fault.id} />
          <DeleteFaultButton faultId={fault.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default FaultDetailPage;
