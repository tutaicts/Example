import app from "../app";
import * as supertest from "supertest";



test("Test", async () => {
    await supertest(app).get("/api/users/test")
        .expect(200)
        .then((response) => {
            expect(response.body);
        });
});
