import { Flex, Card, Box } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/componenets";

const LoadingFaultDeatilPage = () => {
  return (
    <Box className="max-w-lg">
      <Skeleton />
      <Flex gapX="3" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingFaultDeatilPage;
