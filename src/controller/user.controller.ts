import * as express from 'express';
import UserModel from "../model/user.model";
import Controller from "../interface/controller.interface";
import * as _ from "lodash";


class UserController implements Controller {
    public path = '/api/users';
    public router = express.Router();
    private user = UserModel;

    constructor() {
        this.initRouter();
    }

    private initRouter() {
        this.router.get(`${this.path}/test`, this.test);
        this.router.get(this.path, this.getAll);
        this.router.post(this.path, this.create);
        this.router.put(`${this.path}/:id`, this.update);
        this.router.delete(`${this.path}/:id`, this.delete);
    }

    private test = async (request: express.Request, response: express.Response) => {
        response.send('Test')
    }

    private getAll = async (request: express.Request, response: express.Response) => {
        try {
            const data = await this.user.find()
            if (_.isEmpty(data)) response.send({code: 1, message: 'không có dữ liệu'})
            response.send({code: 'OK', message: data})
        } catch (e) {
            console.log(e)
        }
    }

    private create = async (request: express.Request, response: express.Response) => {
        const data = request.body;
        try {
            const create = await this.user.create(data)
            response.send({code: 'OK', message: create})
        } catch (e) {
            console.log(e)
        }
    }

    private update = async (request: express.Request, response: express.Response) => {
        const data = request.body;
        const id = request.params.id
        try {
            const update = await this.user.findByIdAndUpdate(id, data, {new: true})
            response.send({code: 'OK', message: update})
        } catch (e) {
            console.log(e)
        }
    }

    private delete = async (request: express.Request, response: express.Response) => {

        const id = request.params.id

        try {
            const remove = await this.user.findOneAndUpdate({id: id, active: true}, {active: false}, {new: true})
            if (remove) {
                response.send({code: 'OK', message: remove})
            }
            response.send({code: 0, message: 'không tồn tại bản ghi này'})
        } catch (e) {
            console.log(e)
        }
    }
}

export default UserController;
