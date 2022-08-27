import { Router } from 'https://deno.land/x/oak/mod.ts';
import * as controller from './controller.ts';

const router = new Router();

router.get('/drinks', controller.getDrinks);
router.get('/bartenders', controller.getBartenders);
router.get('/ingredients', controller.getIngredients);
router.get('/ingredients/:drinkName', controller.getIngredientsOfDrink);
router.get('/sells/all', controller.getSells);

router.post('/addDrink', controller.addDrink);
router.post('/addIngredientsToDrink', controller.addIngredientsToDrink);
router.post('/addBartender', controller.addBartender);
router.post('/addSell', controller.addSell)
router.post('/addIngredient/:type', controller.addIngredient)
router.delete('/removeDrink/:name', controller.removeDrink);
router.delete('/removeBartender/:telephone', controller.removeBartender);
router.delete('/removeSells/:telephone', controller.removeAllSells);

export default router;