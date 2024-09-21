import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import FaultFormSkeleton from "./loading";

const FaultForm = dynamic(
  () => import("@/app/faults-log/_componenets/FaultForm"),
  {
    ssr: false,
    loading: () => <FaultFormSkeleton />,
  }
);

interface Props {
  params: {
    id: string;
  };
}

const EditFaultPage = async ({ params }: Props) => {
  const fault = await prisma.faults.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!fault) notFound();
  return <FaultForm fault={fault} />;
};

export async function generateMetadata({ params }: Props) {
  const fault = await prisma.faults.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!fault) {
    return {
      title: "Fault Not Found",
      description: "The fault you are trying to edit does not exist.",
    };
  }

  return {
    title: `Edit Fault: ${fault.title}`,
    description: `Edit the details of fault #${fault.id} - ${fault.title}`,
  };
}

export default EditFaultPage;
