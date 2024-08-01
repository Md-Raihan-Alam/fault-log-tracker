import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
const FaultsLog = () => {
  return (
    <div>
      <Button>
        <Link href="/faults-log/new">New Fault</Link>
      </Button>
    </div>
  );
};

export default FaultsLog;
