import { Box } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/componenets";
const LoadingNewFaultPage = () => {
  return (
    <Box className="max-w-lg">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingNewFaultPage;
