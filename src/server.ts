import App from './app';
import UserController from "./controller/user.controller";
import mock = jest.mock;

const app  =  new App(
    [
        new UserController(),
    ],
)

app.listen();

