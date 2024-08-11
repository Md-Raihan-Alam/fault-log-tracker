import React from "react";
import FaultForm from "../../_componenets/FaultForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

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
