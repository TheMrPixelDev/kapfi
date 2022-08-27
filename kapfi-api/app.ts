import { Application } from 'https://deno.land/x/oak/mod.ts';
import { CORS } from "https://deno.land/x/oak_cors@v0.1.1/mod.ts";
import router from './router.ts';

const PORT = 3000;
const HOST = '127.0.0.1';

const app = new Application();

app.use(CORS())
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen(`${HOST}:${PORT}`);