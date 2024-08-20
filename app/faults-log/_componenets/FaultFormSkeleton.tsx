import { Box } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/componenets";

const FaultFormSkeleton = () => {
  return (
    <Box className="max-w-lg">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default FaultFormSkeleton;
