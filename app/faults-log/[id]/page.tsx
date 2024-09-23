import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React, { cache } from "react";
import EditFaultLogButton from "./EditFaultLogButton";
import FaultDetails from "./FaultDetails";
import DeleteFaultButton from "./DeleteFaultButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssignSelect from "./AssignSelect";
import StatusSelect from "./StatusUpdate";
interface Props {
  params: { id: string };
}

const fetchUser = cache((faultId: number) =>
  prisma.faults.findUnique({
    where: {
      id: faultId,
    },
  })
);

const FaultDetailPage = async ({ params }: Props) => {
  //   if (typeof params.id !== "number") notFound(); - fix it
  const session = await getServerSession(authOptions);
  const fault = await fetchUser(parseInt(params.id));
  if (!fault) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <FaultDetails fault={fault} />
      </Box>

      <Box>
        <Flex direction="column" gap="4">
          {session && fault.createdByUserId === session!.user!.id! && (
            <>
              <AssignSelect fault={fault} />
              <EditFaultLogButton faultId={fault.id} />
              <DeleteFaultButton faultId={fault.id} />
            </>
          )}
          {session && fault.assignedToUserId === session!.user!.id! && (
            <StatusSelect fault={fault} />
          )}
        </Flex>
      </Box>
    </Grid>
  );
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const fault = await fetchUser(parseInt(params.id));

  if (!fault) {
    return {
      title: "Fault Not Found",
      description: "The requested fault log does not exist.",
    };
  }

  return {
    title: `Fault: ${fault.title}`,
    description: `View detailed information about fault #${fault.id}: ${fault.title}`,
  };
}

export default FaultDetailPage;
