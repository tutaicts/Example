import App from './app';
import UserController from "./controller/user.controller";

const app  =  new App(
    [
        new UserController(),
    ],
)

app.listen();

