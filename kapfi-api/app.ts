import { Application, Context } from 'https://deno.land/x/oak/mod.ts';
import { CORS } from "https://deno.land/x/oak_cors@v0.1.1/mod.ts";
import router from './router.ts';
import { getBartenderByEmail } from './model.ts'

const PORT = 3000;
const HOST = '127.0.0.1';

const app = new Application();

app.use(CORS())
app.use(async (ctx: Context, next) => {
    const headers: Headers = ctx.request.headers

    const encodedCredentials = headers.get("authorization")?.split(" ")[1];

    if(encodedCredentials != undefined) {
        const decodedCredentials = atob(encodedCredentials).split(":");
        console.log(decodedCredentials)
        const email = decodedCredentials[0];
        decodedCredentials[0] = "";
        const password = decodedCredentials.join(":").slice(1)
        
        const actualPassword = getBartenderByEmail(email);

        if(actualPassword != undefined && password == actualPassword.password) {
            await next()
            return;
        }
    }
    ctx.response.status = 401;
    ctx.response.body = { message: "You are not authorized." };
})
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen(`${HOST}:${PORT}`);