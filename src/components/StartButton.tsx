import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px auto;
`;

const StartButton = ({ handleClick }: { handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined }) => {
  return (
    <Wrapper>
      <button onClick={handleClick}>Load party</button>
      <p>
        Click{" "}
        <span role="img" aria-labelledby="click">
          👆
        </span>{" "}
        this button
      </p>
    </Wrapper>
  );
};

export default StartButton;
