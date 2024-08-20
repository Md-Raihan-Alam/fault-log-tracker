import dynamic from "next/dynamic";
import FaultFormSkeleton from "./loading";

const FaultForm = dynamic(
  () => import("@/app/faults-log/_componenets/FaultForm"),
  { ssr: false, loading: () => <FaultFormSkeleton /> }
);

const NewFaultPage = () => {
  return <FaultForm />;
};

export default NewFaultPage;
