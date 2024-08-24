import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditFaultLogButton = ({ faultId }: { faultId: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/faults-log/edit/${faultId}`}>Edit Fault-Log</Link>
    </Button>
  );
};

export default EditFaultLogButton;
