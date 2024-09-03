"use client";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryClientProider client={queryClient}>
      {children}
    </ReactQueryClientProider>
  );
};

export default QueryClientProvider;
