import React from "react";

export type Props = {
  height: number;
  left: number;
  border: string;
};

const VerticalDivider: React.FC<Props> = ({ height, left, border }) => {
  return (
    <>
      <div
        style={{
          height,
          width: 0,
          border,
          position: "absolute",
          left
        }}
      />
    </>
  );
};

export default VerticalDivider;
