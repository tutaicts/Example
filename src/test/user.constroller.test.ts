import UserController from "../controller/user.controller";

describe("test UserController", () => {
    const controller = new UserController()

    beforeEach(() => {
        // Trước khi test case sẽ như nào
        return controller.test()
    });

    afterEach(() => {
        // Sau mỗi test case thì làm gì?
        return 'test process success'
    });

    beforeAll(() => {
        // Trước khi chạy test case đầu tiên, thì làm gì?

    });

    afterAll(() => {
        // Sau khi chạy hết test case thì làm gì?
    })

    describe("test UserController.test method", () => {
        it("should ... when create successfully", () => {
            // Khi thành công thì thế nào
            expect(controller.test()).toBe('Test');
        });

        it("should ... when test unsuccessfully", () => {
            // Khi lỗi thì thế nào?
            expect(controller.test()).toBe('OK');
        })
    })
})
