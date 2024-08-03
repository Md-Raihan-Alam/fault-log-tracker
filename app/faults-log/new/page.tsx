"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FaultForm {
  title: string;
  description: string;
}

const NewFaultPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<FaultForm>();
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-6">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/faults", data);
            router.push("/faults-log");
          } catch (error) {
            console.log(error);
            setError("A unexpected error occurred");
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <Button>Submit New Fault</Button>
      </form>
    </div>
  );
};

export default NewFaultPage;
