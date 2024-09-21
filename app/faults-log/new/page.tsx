import dynamic from "next/dynamic";
import FaultFormSkeleton from "./loading";
import { Metadata } from "next";

const FaultForm = dynamic(
  () => import("@/app/faults-log/_componenets/FaultForm"),
  { ssr: false, loading: () => <FaultFormSkeleton /> }
);

const NewFaultPage = () => {
  return <FaultForm />;
};

export const metadata: Metadata = {
  title: "Create New Fault Log",
  description: "Fill in the details to log a new fault or issue in the system.",
};

export default NewFaultPage;
