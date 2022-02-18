import React, { useState, useEffect, Fragment } from "react";
import { createGlobalStyle } from "styled-components";

import partyServise from "./services/party";
import StartButton from "./components/StartButton";
import Loader from "./components/Loader";
import Desk from "./components/Desk";
import Table from "./components/Table";
import useFetch from "./hooks/useFetch";
import { useStateValue, setGuestsList, setOrder } from "./state";
import { formatToBYN } from "./utils/formatToBYN";
import { setDietsQuerry } from "./utils/setDietsQuerry";
import { getPizzaType } from "./utils/getPizzaType";
import { BaseGuest, Diet } from "./types";

const GlobalStyle = createGlobalStyle`
  *{
      margin: 0;
      padding: 0;
      outline:0;
      text-align: center;
      box-sizing:border-box;
      font-family: 'Open Sans', sans-serif; 
  }
  #root{
      margin:0 auto;
  }
  .button-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
  }
  button {
    text-decoration: none;
    padding: 15px 30px;
    margin: 10px auto;
    border-radius: 10px;
    box-shadow: 0 0 40px 40px #F137A6 inset, 0 0 0 0 #F137A6;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    letter-spacing: 2px;
    color: white;
    transition: .15s ease-in-out;
    cursor: pointer;
  }
  button:hover {
    box-shadow: 0 0 10px 0 #F137A6 inset, 0 0 10px 4px #F137A6;
    color: #F137A6;
  }
  button:disabled {
    opacity: 0.5;
    background-color: #F137A6;
    color: white;
    box-shadow: none;
    cursor: default;
  }
  .vegan {
    color: green; 
  }
`;

export default function App() {
  const [isResults, setIsResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pizzaEaters, setPizzaEaters] = useState(0);
  const [currency, getCurrency] = useFetch(null);
  const [colaAccount, getColaAccount] = useFetch(null);
  const [pizzaAccount, setPizzaAccount] = useState<any>();
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const pizzaAccountBYN = formatToBYN(pizzaAccount?.price, currency);
    const colaAccountBYN = formatToBYN(colaAccount?.price, currency);
    dispatch(setOrder(pizzaAccountBYN, colaAccountBYN, pizzaEaters));
  }, [colaAccount, currency, pizzaAccount, dispatch, pizzaEaters]);

  const showResults: React.MouseEventHandler<HTMLButtonElement> | undefined = async () => {
    setIsResults(false);
    setLoading(true);
    const { party } = await partyServise.getResource("guests");
    const pizzaEatersNumber = party.filter((eater: { eatsPizza: boolean; }) => eater.eatsPizza === true)
      .length;
    setPizzaEaters(pizzaEatersNumber);
    const querry = setDietsQuerry(party);
    const { diet } = await partyServise.getResource(
      "world-diets-book/" + querry
    );
    const guestsWithDietAndOrder = party.map((guest: BaseGuest) => { 
      const eater = diet.find((member: Diet) => member.name === guest.name);
      return { ...guest, isVegan: eater.isVegan, order: 0 };
    });
    dispatch(setGuestsList(guestsWithDietAndOrder));
    const typePizza = getPizzaType(diet);
    getCurrency("currency");
    getColaAccount(`order-cola/${party.length}`);
    const pizzaCheck = await partyServise.getResource(
      `order/${typePizza}/${pizzaEatersNumber}`
    );
    setPizzaAccount(pizzaCheck);
    setLoading(false);
    setIsResults(true);
  };

  return (
    <Fragment>
      <GlobalStyle/>
      <StartButton handleClick={showResults}/>
      {loading && <Loader/>}
      {isResults && (
        <>
          <Table/>
          <Desk pizzaEaters={pizzaEaters}/>
        </>
      )}
    </Fragment>
  );
}
