"use client";
import { Button, Callout, Spinner, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { faultSchema } from "@/app/createFaultSchema";
import { z } from "zod";
import ErrorMessage from "@/app/componenets/ErrorMessage";
import { Faults } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";

type FaultFormData = z.infer<typeof faultSchema>;

const FaultForm = ({ fault }: { fault?: Faults }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FaultFormData>({
    resolver: zodResolver(faultSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (fault) await axios.patch("/api/faults/" + fault.id, data);
      else await axios.post("/api/faults", data);
      router.push("/faults-log/list");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      console.log(error);
      setError("A unexpected error occurred");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-6">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={fault?.title}
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={fault?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {fault ? "Update Fault " : "Submit New Fault "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default FaultForm;
