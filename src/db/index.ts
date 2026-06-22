import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || "mysql://root:password@127.0.0.1:3306/mydatabase";

// Create a connection pool or connection
export const connection = mysql.createPool(connectionString);
export const db = drizzle(connection, { schema, mode: "default" });
