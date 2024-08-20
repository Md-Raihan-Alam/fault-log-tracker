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

export default EditFaultPage;
