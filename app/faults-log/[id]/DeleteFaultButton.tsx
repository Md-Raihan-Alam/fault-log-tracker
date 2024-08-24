"use client";
import { Spinner } from "@/app/componenets";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteFaultButton = ({ faultId }: { faultId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const deleteFaultLog = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/faults/" + faultId);
      router.push("/faults-log/list");
      router.refresh();
    } catch (error) {
      setError(true);
      setDeleting(false);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            Delete Fault-log
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delte this fault-log? This action can not
            be undone
          </AlertDialog.Description>
          <Flex mt="4" gap="4">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={deleteFaultLog}>
                Delete Fault-log
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This fault-log could not be deleted.
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteFaultButton;
