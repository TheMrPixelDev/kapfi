import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { Bartender, Ingredient, Drink, contains, sell } from './interfaces.ts'

const db = new DB("database.db");

function createDatabaseStructure() {

    db.query(`CREATE TABLE IF NOT EXISTS ingredient (
        type TEXT PRIMARY KEY
    )`);

    db.query(`CREATE TABLE IF NOT EXISTS stock (
        type TEXT REFERENCES ingredient(type), 
        name TEXT,
        price REAL,
        stockCount INTEGER,
        PRIMARY KEY(type, name)
    );`);
    
    db.query(`CREATE TABLE IF NOT EXISTS drink (
        name TEXT NOT NULL PRIMARY KEY,
        price REAL NOT NULL
    );`);

    db.query(`CREATE TABLE IF NOT EXISTS bartender (
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL PRIMARY KEY
    );`);

    db.query(`CREATE TABLE IF NOT EXISTS contains (
        drinkName TEXT NOT NULL,
        ingredientType TEXT NOT NULL,
        milliliters INTEGER,
        FOREIGN KEY (drinkName) REFERENCES drink(name),
        FOREIGN KEY (ingredientType) REFERENCES ingredient(type)
    );`);

    db.query(`CREATE TABLE IF NOT EXISTS sells (
        sellerNumber TEXT NOT NULL,
        drinkName TEXT NOT NULL,
        datetime INTEGER NOT NULL,
        FOREIGN KEY (sellerNumber) REFERENCES bartender(email) ON DELETE CASCADE,
        FOREIGN KEY (drinkName) REFERENCES drink(name)
    );`);    

}

/**
 * Add things to database
 */

export function addBartender(bartender: Bartender) {
    db.query(`INSERT INTO bartender VALUES (?, ?, ?);`, [bartender.firstName, bartender.lastName, bartender.email])
}

export function addIngredient(ingredient: Ingredient) {
    db.query(`INSERT INTO ingredient VALUES (?);`, [ingredient.type]);
}

export function addDrink(drink: Drink) {
    db.query(`INSERT INTO drink VALUES (?, ?)`, [drink.name, drink.price])
}

export function addIngredientToDrink(ingredient: contains) {
    db.query(`INSERT INTO contains VALUES (?,?,?);`, [ingredient.drinkName, ingredient.ingredientType, ingredient.milliliters])
}

export function addSell(sell: sell) {
    db.query(`INSERT INTO sells VALUES (?, ?, ?);`, [sell.sellerNumber, sell.drinkName, sell.datetime])
}

/**
 * Delete things from database
 */

export function removeDrink(name: string) {
    db.query(`DELETE FROM drink WHERE name = ?;`, [name])
}

export function removeBartender(email: string) {
    db.query(`DELETE FROM bartender WHERE email = ?;`, [email])
}

export function removeIngredientFromDrink(drink: Drink, ingredient: Ingredient) {
    db.query(`DELETE FROM contains WHERE drinkName = ? AND ingredientName = ?;`, [drink.name, ingredient.type])
}

export function removeSells(email: string) {
    db.query(`DELETE FROM sells WHERE sellerNumber = ?;`, [email])
}

/**
 * Getting all rows of the main relation tables
 */

export function getDrinks() {
    const drinks: Array<Drink> = db.queryEntries<{ name: string, price: number }>(`SELECT name, price FROM drink;`);
    return drinks;
}

export function getBartenders() {
    let bartenders: Array<Bartender> = db.queryEntries<{ firstName: string, lastName: string, email: string, password: string }>(`SELECT * FROM bartender;`);
    bartenders.map(b => {
        b.password = "";
        return b;
    })
    return bartenders;
}

export function getIngredients() {
    const ingredients: Array<Ingredient> = db.queryEntries<{ type: string}>(`SELECT * FROM ingredient;`)
    return ingredients;
}

export function getSells() {
    const sells = db.queryEntries<{ sellerNumber: string, drinkName: string, datetime: Date }>(`SELECT * FROM sells;`)
    return sells;
}

export function getIngredientsOfDrink(drinkName: string) {
    const ingredientsOfDrink: Array<contains> = db.queryEntries<{ ingredientType: string, drinkName: string, milliliters: number }>(`SELECT * FROM contains WHERE drinkName = ?;`, [drinkName])
    return ingredientsOfDrink;
}

export function getSellsOfBartender(bartender: Bartender) {
    const sells = db.queryEntries<{ sellerFirstName: string, sellerLastName: string, drinkName: string }>(`SELECT * FROM sells WHERE email = ?;`, [bartender.email])
    return sells;
}

export function getBartenderByEmail(searchedEmail: string) {
    const bartender: Bartender = db.queryEntries<{ firstName: string, lastName: string, password: string, email: string }>(`SELECT * FROM bartender WHERE email = ?`, [searchedEmail])[0];
    return bartender;
}

createDatabaseStructure();