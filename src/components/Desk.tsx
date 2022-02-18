import React from "react";
import styled from "styled-components";

import { useStateValue } from "../state";
import tableImg from "../assets/table.jpg";
import pizzaImg from "../assets/pizza.jpg";

const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Table = styled.div`
  width: 500px;
  height: 360px;
  display: flex;
  background-image: url(${tableImg});
  background-size: contain;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
  box-shadow: 0 0 10px 0 #e2dfe1 inset, 0 0 5px 2px #f137a6;
  border-radius: 150px;
`;
const Pizza = styled.div`
  background-image: url(${pizzaImg});
  background-position: center center;
  background-size: 130%;
  position: relative;
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 80px;
`;
const Line = styled.div`
  position: absolute;
  height: 75px;
  width: 1px;
  left: 50%;
  top: 50%;
  transform-origin: 0 0;
  transform: rotate(30deg);
  background: rgb(185, 125, 14);
`;

const Desk = ({ pizzaEaters }: { pizzaEaters: number}) => {
  const [{ guests }] = useStateValue();

  const content = [];

  for (let i = 0; i < pizzaEaters; i++) {
    content.push(
      <Line
        key={i}
        style={{ transform: `rotate(${(360 / pizzaEaters) * i}deg)` }}
      ></Line>
    );
  }

  return (
    <Wrapper>
      <Table>
        <Pizza>{content}</Pizza>
        <p>The number of party participants- {guests.length}</p>
        <p>Pizza eaters-{pizzaEaters}</p>
      </Table>
    </Wrapper>
  );
};

export default Desk;
