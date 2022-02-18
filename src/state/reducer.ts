import { State } from "./state";
import { GuestWithOrder } from "../types";

export type Action =
  | {
      type: "SET_GUESTS_LIST";
      payload:  GuestWithOrder[];
    }
  | {
      type: "SET_ORDER";
      payload: {
        pizzaOrder: number,
        pizzaEaters: number,
        colaOrder: number
      };
    }
  |  {
      type: "SET_PAID";
      payload: {
        name: string,
        money: number
    };
    }

export const reducer =(state: State, action: Action): State => {
    switch (action.type) {
        case "SET_GUESTS_LIST":
            return {
                ...state,
                guests: action.payload
            };
        case "SET_ORDER":
            const totalOrder = action.payload.pizzaOrder + action.payload.colaOrder;
            const pizzaPaiment = action.payload.pizzaOrder / action.payload.pizzaEaters;
            const colaPaiment = action.payload.colaOrder / state.guests.length;
            return {
                order: {
                    collectedMoney: 0,
                    totalOrder: totalOrder,
                    moneyToCollect: totalOrder
                },
                guests: state.guests.map(guest => guest.eatsPizza === true ?
                    { ...guest, order: pizzaPaiment + colaPaiment } : { ...guest, order: colaPaiment }),

            };
        case "SET_PAID":
            return {
                order: {
                    ...state.order,
                    moneyToCollect: state.order.moneyToCollect - action.payload.money,
                    collectedMoney: state.order.collectedMoney + action.payload.money
                },
                guests: state.guests.map(guest => {
                    if (guest.name === action.payload.name)
                        guest = { ...guest, order: 0 };
                    return guest;
                })
            };
        default:
            return state;
    }
};

export const setGuestsList = (guests: GuestWithOrder[]): Action => {
    return {
        type: "SET_GUESTS_LIST",
        payload: guests
    };
};

export const setOrder = (pizzaOrder: number, colaOrder: number, pizzaEaters: number): Action => {
    return {
        type: "SET_ORDER",
        payload: {
            pizzaOrder,
            colaOrder,
            pizzaEaters
        }
    };
};

export const setPaid = (money: number, name: string): Action => {
    return {
        type: "SET_PAID",
        payload: {
            money: money,
            name: name
        }
    };
};