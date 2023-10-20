import { useUser } from "@/hooks/useUser";
import { DetailComponent } from "./DetailComponent";
import { Profile } from "./Profile";
import TransferComponent from "./TransferComponent";
import { NftComponent } from "./NftComponent";
import { PulsarPageForm } from "./PulsarPageForm";

export const PulsarPage = () => {
  const { isLoading, isError, data, error } = useUser();
  const showForm = !data;

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    // ToDo: De mutat in App
    <div className="relative p-6">
      <div
        style={{
          position: "absolute",
          display: "block",
          content: " ",
          background: "#4200FF",
          width: "150px",
          height: "150px",
          mixBlendMode: "screen",
          filter: "blur(177px)",
          top: "200px",
          left: "500px",
          WebkitBackfaceVisibility: "hidden",
          MozBackfaceVisibility: "hidden",
          WebkitTransform: "translate3d(0, 0, 0)",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          display: "block",
          content: " ",
          background: "#4FDBEE",
          width: "150px",
          height: "150px",
          mixBlendMode: "screen",
          filter: "blur(177px)",
          top: "100px",
          right: "500px",
          WebkitBackfaceVisibility: "hidden",
          MozBackfaceVisibility: "hidden",
          WebkitTransform: "translate3d(0, 0, 0)",
        }}
      ></div>
      {!showForm && (
        <>
          <Profile data={data} />
          <TransferComponent />
          <DetailComponent />
          <NftComponent />
        </>
      )}
      {showForm && <PulsarPageForm></PulsarPageForm>}
    </div>
  );
};
