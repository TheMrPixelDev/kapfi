import Bar from './lib/Barview/Bar.svelte';
import Sales from './lib/Salesview/Sales.svelte';
import Stock from './lib/Stockview/Stock.svelte';
import Staff from './lib/Staffview/Staff.svelte';
import Drinks from './lib/Drinksview/Drinks.svelte';

const routes =  {
    '/': Bar,
    '/drinks': Drinks,
    '/sales': Sales,
    '/storage': Stock,
    '/staff': Staff
}

export default routes;