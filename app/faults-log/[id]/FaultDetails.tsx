import { FaultStatusBadge } from "@/app/componenets";
import { Faults } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const FaultDetails = ({ fault }: { fault: Faults }) => {
  return (
    <>
      <Heading>{fault.title}</Heading>
      <Flex gapX="3" my="2">
        <FaultStatusBadge status={fault.status} />
        <Text>{fault.createdAt.toDateString()}</Text>
        {fault.createdByUser && (
          <Text>Created by: {fault.createdByUser || "Unknown User"}</Text>
        )}
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{fault.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default FaultDetails;
