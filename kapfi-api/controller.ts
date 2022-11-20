import * as model from './model.ts';

 import { Request, Response } from 'https://deno.land/x/oak/mod.ts';
 import { Drink, contains, Bartender, sell } from './interfaces.ts'

export const getDrinks = ({ response }: { response: any }) => {
    response.body = model.getDrinks();
}

export const getBartenders = ({ response }: { response: any }) => {
    response.body = model.getBartenders();
}

export const getIngredients = ({ response }: { response: any }) => {
    response.body = model.getIngredients();
}

export const getSells = ({ response }: { response: any }) => {
    response.body = model.getSells();
}

export const getSellsOfBartender = ({ params, response }: { params: { email: string }, response: any }) => {
    response.body = model.getSellsOfBartender({ firstName: "", lastName: "", email: params.email, password: "" });
}

export const getIngredientsOfDrink = ({ params, response }: { params: { drinkName: string }, response: any }) => {
    response.body = model.getIngredientsOfDrink(params.drinkName);
}

export const addDrink = async ({ request, response }: { request: Request, response : Response }) => {

    try {
        const submittedDrink: Drink = await request.body({ type: "json" }).value;
        console.log(submittedDrink)
        model.addDrink(submittedDrink);
        sendResponse(response, "Successfully added drin to database.", 200)
    }catch(e) {
        sendResponse(response, "Something went wrong.", 500)
    }    
}

export const addIngredientsToDrink = async ({ request, response }: {request: Request, response: Response }) => {
    try {
        const submittedIngredients: Array<contains> = await request.body({ type: "json" }).value;
        submittedIngredients.forEach((ingredient) => {
            model.addIngredientToDrink(ingredient);
        })
        sendResponse(response, "Successfully added ingredients to database.", 200)
    }catch(e: any) {
        sendResponse(response, "Something went wrong.", 500);
    }
}

export const addIngredient = ({ params, response }: { params: {  type: string }, response: Response }) => {
    try {
        model.addIngredient(params)
        sendResponse(response, "Added ingredient successfully.", 200)
    }catch(e: any){
        console.log(e);
        sendResponse(response, "Something went wrong.", 500)
    }
}

export const removeDrink = ({ params, response }: { params: { name: string }, response: Response}) => {
    try {
        model.removeDrink(params.name)
        sendResponse(response, "Successfully removed drink " + params.name, 200)    
    }catch{
        sendResponse(response, "Something went wrong.", 500)
    }
}

export const addBartender = async ({ request, response }: { request: Request, response: Response }) => {
    try{
        const bartender: Bartender = await request.body({ type: 'json' }).value;
        model.addBartender(bartender)
        sendResponse(response, "Successfully added bartender " + bartender.firstName+ " " + bartender.lastName, 200)
    }catch{
        sendResponse(response, "Something went wrong", 500);
    }
}

export const removeBartender = ({ params, response }: { params: { telephone: string }, response: Response }) => {
    try{
        model.removeBartender(params.telephone);
        sendResponse(response, "Bartender has successfully been removed.", 200);
    }catch(e: any){
        console.log(e)
        sendResponse(response, "Something went wrong.", 500);
    }
}

export const removeAllSells = ({ params, response }: { params: { telephone: string }, response: Response }) => {
    try{
        model.removeSells(params.telephone);
        sendResponse(response, "Sells have successfully been removed.", 200)
    }catch(e: any){
        console.log(e)
        sendResponse(response, "Something went wrong.", 500);
    }
}

export const addSell = async ({ request, response }: { request: Request, response: Response }) => {
    try{
        const sell: sell = await request.body({ type: 'json' }).value;
        console.log(sell)
        model.addSell(sell);
        sendResponse(response, "Sells have successfully been added.", 200)
    }catch(e: any){
        console.log(e)
        sendResponse(response, "Something went wrong.", 500);
    }
    
}

export const handleLogin = ({ request, response }: { request: Request, response: Response}) => {
    response.status = 200;
    response.body = { message: "You are authorized." }
}

function sendResponse(response: Response, message: string, statusCode: number) {
    response.headers.set("Content-Type", "application/json");
    response.status = statusCode;
    response.body = JSON.stringify({ message: message })
}

