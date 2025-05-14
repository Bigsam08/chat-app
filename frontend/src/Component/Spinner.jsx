const Spinner = ({ size = "18px", color = "white" }) => {
  return (
    <div
      className="animate-ping rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
    ></div>
  );
};

export default Spinner;
