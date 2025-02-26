import request from "supertest";
import app from "../index"; // Import the app instance

describe("GET /", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/");  // Test the root route
    expect(res.status).toBe(200);  // Expect status 200
  });
});

