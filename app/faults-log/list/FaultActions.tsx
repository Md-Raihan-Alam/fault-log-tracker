import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import FaultStatusFilter from "./FaultStatusFilter";

const FaultActions = () => {
  return (
    <Flex mb="5" justify="between">
      <FaultStatusFilter />
      <Button>
        <Link href="/faults-log/new">New Fault</Link>
      </Button>
    </Flex>
  );
};

export default FaultActions;
