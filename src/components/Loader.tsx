import React from "react";
import { Oval } from "react-loader-spinner";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Loader = () => {
  return (
    <Container>
      <Oval color="#F137A6" secondaryColor="#000" />
      <p>Loading...</p>
    </Container>
  );
};

export default Loader;
