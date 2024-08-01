import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewFaultPage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title"></TextField.Root>
      <TextArea placeholder="Description"></TextArea>
      <Button>Submit New Fault</Button>
    </div>
  );
};

export default NewFaultPage;
