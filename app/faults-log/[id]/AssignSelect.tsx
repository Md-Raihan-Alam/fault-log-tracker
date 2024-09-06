"use client";
import { Faults, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { useEffect, useState } from "react";
import { Skeleton } from "@/app/componenets";
import toast, { Toaster } from "react-hot-toast";
const AssignSelect = ({ fault }: { fault: Faults }) => {
  const { data: users, error, isLoading } = useUsers();
  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const { data } = await axios.get("/api/users");
  //     setUsers(data);
  //   };
  //   fetchUsers();
  // }, []);

  if (isLoading) return <Skeleton />;

  if (error) return null;
  const assignFault = async (userId: string) => {
    try {
      await axios.patch("/api/faults/" + fault.id, {
        assignedToUserId: userId || "unassigned",
      });
    } catch (error: any) {
      toast.error("Changes could not be saved.");
    }
  };
  return (
    <>
      <Select.Root
        defaultValue={fault.assignedToUserId || "unassigned"}
        onValueChange={assignFault}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });

export default AssignSelect;
