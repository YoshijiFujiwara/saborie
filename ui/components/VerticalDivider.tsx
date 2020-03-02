import React from "react";

export type Props = {
  height: number;
  left: number;
  border: string;
  marginTop?: number;
};

const VerticalDivider: React.FC<Props> = ({
  height,
  left,
  border,
  marginTop
}) => {
  return (
    <>
      <div
        style={{
          height,
          width: 0,
          border,
          position: "absolute",
          marginTop: marginTop ? marginTop : 0,
          left
        }}
      />
    </>
  );
};

export default VerticalDivider;
