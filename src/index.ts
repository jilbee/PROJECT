import { Elysia } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";

const app = new Elysia()
  .get("/", () => ({ message: "Hello World from Elysia + Bun!" }))
  .get("/users", async () => {
    try {
      return await db.select().from(users);
    } catch (error: any) {
      return { error: error.message };
    }
  })
  .post("/users", async ({ body }: { body: any }) => {
    try {
      const { name, email } = body;
      if (!name || !email) {
        return { error: "Name and email are required" };
      }
      await db.insert(users).values({ name, email });
      return { success: true, message: "User created successfully!" };
    } catch (error: any) {
      return { error: error.message };
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
