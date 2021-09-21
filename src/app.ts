import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from "mongoose";
import Controller from "./interface/controller.interface";


class App {

    public  app : express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();

        this.openConnect();
        this.config();
        this.initController(controllers);
    }

    public listen(){
        this.app.listen(8080, ()=>{
            console.log('server running port 8080 !!')
        })
    }

    private config(): void {
        this.app.use(bodyParser.json());
    }

    private openConnect(){
        const url = 'mongodb://localhost:27017/example';
        try {
            mongoose.connect(url).then(() => console.log('mongodb connected'))
        } catch (error) {
            console.log(error)
        }
    }

    private initController(controller : Controller[]){
        controller.forEach((controller)=> {
            this.app.use('/', controller.router)
        })
    }
}

export default App;
