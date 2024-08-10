import FaultStatusBadge from "@/app/componenets/FaultStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
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
    <div>
      <Heading>{fault.title}</Heading>
      <Flex gapX="3" my="2">
        <FaultStatusBadge status={fault.status} />
        <Text>{fault.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{fault.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default FaultDetailPage;
