export interface Bartender {
    firstName: string;
    lastName: string;
    telephone: string; //primary key
}

export interface Drink {
    name: string; //primary key
    price: number;
}

export interface Ingredient {
    type: string; //primary key
}

export interface contains {
    drinkName: string;
    ingredientType: string;
    milliliters: number;
}

export interface Stock {
    type: string; //primary key references ingredient(type)
    name: string; //primary key
    price: number;
    stockCount: number;
}

export interface sell {
    drinkName: string;
    sellerNumber: string
    datetime: number
}