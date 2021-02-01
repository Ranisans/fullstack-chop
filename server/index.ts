import express, { Request, Response } from "express";
import next from "next";
import getConnection, { User } from "./db";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;
(async () => {
  try {
    await app.prepare();
    const server = express();
    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
    const connection = await getConnection();
    const user = await connection.getRepository(User).find();
    console.log(user);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
