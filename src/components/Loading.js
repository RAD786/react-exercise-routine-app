import { Spinner } from "reactstrap";

const Loading = () => {
  return (
    <div className="text-center my-4">
      <Spinner color="primary" />
      <p>Loading exercises...</p>
    </div>
  );
};

export default Loading;
