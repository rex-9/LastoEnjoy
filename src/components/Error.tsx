const Error = ({ message }: { message: string }) => {
  console.log(message);
  return <div>Error: {message}</div>;
};

export default Error;
