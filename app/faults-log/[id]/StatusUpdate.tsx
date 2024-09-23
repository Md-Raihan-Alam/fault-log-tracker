"use client";
import { Faults, Status } from "@prisma/client";
import { Select, Text } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

// Component for Updating Status
const StatusSelect = ({ fault }: { fault: Faults }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(fault.status || ""); // Initialize with an empty value

  const updateStatus = async (newStatus: Status) => {
    setLoading(true);
    try {
      await axios.patch(`/api/faults/status/${fault.id}`, {
        status: newStatus,
      });
      setStatus(newStatus);
      setLoading(false);
      toast.success("Status updated successfully.");
    } catch (error: any) {
      toast.error("Failed to update status.");
      setLoading(false);
    }
  };

  return (
    <>
      <Select.Root
        disabled={loading}
        value={status}
        onValueChange={updateStatus}
      >
        <Text>Update the fault status</Text>
        <Select.Trigger>
          {status ? status : <span className="text-gray-500">Status...</span>}
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            <Select.Item value="ACTIVE">Active</Select.Item>
            <Select.Item value="RESOLVED">Resolved</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export const dynamic = "force-dynamic";

export default StatusSelect;
