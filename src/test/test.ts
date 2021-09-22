import UserController from "../controller/user.controller";
import * as express from 'express';
import * as mongoose from "mongoose";


// describe('mongodb test', () => {
//
//     beforeAll(async () => {
//         await mongoose.connect('mongodb://localhost:27017/example');
//         await mongoose.connection.on('error', () => {
//             throw new Error(`unable to connect to database`);
//         });
//     });
//
//     afterAll(async () => {
//         try {
//             await mongoose.connection.close();
//         } catch (e) {
//             console.log(e)
//         }
//     });
// });

test('test functions', () => {
    const user = new UserController()
    expect(user.test()).toBe('Test');
});

const mockRequest = (sessionData, body) => ({
    session: {data: sessionData},
    body,
});

const mockResponse = () => {
    const res = {
        status: undefined,
        json: undefined
    };
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

test('test getAll', async () => {

    const req = mockRequest(
        {},
        {name: 'tu', fullName: 'Anh To'})
    const res = mockResponse();

    const user = new UserController()
    await user.create(req, res)
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.code).toHaveBeenCalledWith({
        code : 'OK'
    });
});
