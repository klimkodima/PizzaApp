import React from 'react';
import styled from 'styled-components';

import { formatMoney } from '../utils/formatMoney';
import { useStateValue, setPaid } from '../state';

const ResultTable = styled.table`
  width: 500px;
  border-collapse: collapse;
  margin: 0 auto 20px;
`
const Td = styled.td`
  border: 1px solid lightgray;
  padding: 5px;
`
const Th = styled.th`
  border: 1px solid lightgray;
  padding: 5px;
`;

const Table = () => {

  const [{ guests, order }, dispatch] = useStateValue();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, money: number, name: string) => {
    dispatch(setPaid(money, name));
    e.currentTarget.setAttribute("disabled", "true");
    e.currentTarget.innerText = 'Paid';
  }

  return (
    <ResultTable>
      <thead>
        <tr>
          <Th>Name</Th>
          <Th>Share to pay</Th>
          <Th>Pay</Th>
        </tr>
      </thead>
      <tbody>
        {guests.map(guest => {
          return (
            <tr key={guest.name}>
              {guest.isVegan === true ? <Td className="vegan">{guest.name}</Td> : <Td>{guest.name}</Td>}
              <Td>{formatMoney(guest.order)} BYN</Td>
              <Td>
                <button onClick={(e) => handleClick(e, guest.order, guest.name)}>Pay</button>
              </Td>
            </tr>
          )
        })}
        <tr>
          <Td>Total order</Td>
          <Td>{formatMoney(order.totalOrder)} BYN</Td>
          <Td></Td>
        </tr>
        <tr>
          <Td>Money to collect</Td>
          <Td>{formatMoney(order.moneyToCollect)} BYN</Td>
          <Td></Td>
        </tr>
        <tr>
          <Td>Money collected</Td>
          <Td>{formatMoney(order.collectedMoney)} BYN</Td>
          <Td></Td>
        </tr>
      </tbody>
    </ResultTable>
  );
}

export default Table;