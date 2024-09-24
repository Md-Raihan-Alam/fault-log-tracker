"use client";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { faultSchema } from "@/app/createFaultSchema"; // Ensure this is correctly defined
import { z } from "zod";
import ErrorMessage from "@/app/componenets/ErrorMessage";
import { Faults } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";
import { useSession } from "next-auth/react";
import FaultFormSkeleton from "./FaultFormSkeleton";

type FaultFormData = z.infer<typeof faultSchema>;

const FaultForm = ({ fault }: { fault?: Faults }) => {
  const { status, data: session } = useSession();
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

  const onSubmit = handleSubmit(async (formData) => {
    try {
      formData = {
        ...formData,
        id: session!.user!.id!, // Adding user ID
        name: session!.user!.name!, // Adding user name
      };

      setSubmitting(true);

      if (fault) {
        await axios.patch("/api/faults/" + fault.id, formData);
      } else {
        await axios.post("/api/faults", formData);
      }

      router.push("/faults-log/list");
      router.refresh();
    } catch (error) {
      setSubmitting(false);

      setError("An unexpected error occurred");
    }
  });

  if (status === "loading") return <FaultFormSkeleton />;

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-6">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        {/* Hidden fields for id and name */}
        <input
          type="hidden"
          value={session?.user?.id || ""}
          {...register("id", { required: true })}
        />
        <input
          type="hidden"
          value={session?.user?.name || ""}
          {...register("name", { required: true })}
        />

        <TextField.Root
          defaultValue={fault?.title}
          placeholder="Title"
          {...register("title")}
        />
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

        <Button type="submit" disabled={isSubmitting}>
          {fault ? "Update Fault " : "Submit New Fault "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default FaultForm;
