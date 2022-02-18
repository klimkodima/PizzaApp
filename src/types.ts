export interface BaseGuest {
    name: string;
    eatsPizza: boolean;
};

export interface GuestWithDiet extends  BaseGuest  {
    isVegan: boolean;
};

export interface GuestWithOrder extends  GuestWithDiet  {
    order: number;
};

export interface Currency {
    USD: number;
    BYN: number;
    EUR: number;
};

export interface ColaOrderFromApi {
    qty: string;
    sugar: string;
    price: string;
};

export enum PizzaType {
    Vegan = "vegan",
    Meat = "meat",
    Cheese = "cheese"
};

export interface PizzaOrderFromApi {
    type: PizzaType;
    name: string,
    price: string;
};

export interface Order {
    totalOrder: number;
    moneyToCollect: number;
    collectedMoney: number;
};

export interface Diet {
    name: string;
    isVegan: boolean
};