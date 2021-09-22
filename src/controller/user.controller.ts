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

    test = () => {
        return 'Test';
    }

    getAll = async (request: any, response: any) => {
        try {
            const data = await this.user.find()
            if (_.isEmpty(data)) return response.send({code: 1, message: 'không có dữ liệu'})
            return response.send({code: 'OK', message: data})
        } catch (e) {
            console.log(e)
        }
    }

    create = async (request: express.Request, response: express.Response) => {
        const data = request.body;
        try {
            const create = await this.user.create(data)
            return response.send({code: 'OK', message: create})
        } catch (e) {
            console.log(e)
        }
    }

    update = async (request: express.Request, response: express.Response) => {
        const data = request.body;
        const id = request.params.id
        try {
            const update = await this.user.findByIdAndUpdate(id, data, {new: true})
            return response.send({code: 'OK', message: update})
        } catch (e) {
            console.log(e)
        }
    }

    delete = async (request: express.Request, response: express.Response) => {

        const id = request.params.id

        try {
            const remove = await this.user.findOneAndUpdate({id: id, active: true}, {active: false}, {new: true})
            if (remove) {
                return response.send({code: 'OK', message: remove})
            }
            return response.send({code: 0, message: 'không tồn tại bản ghi này'})
        } catch (e) {
            console.log(e)
        }
    }
}

export default UserController
