import mongoose from "mongoose";
import express from "express";

export default async function ConnectMongoDb(
  app: express.Express
): Promise<void> {
  mongoose
    .connect(process.env.MONGO_CONNECTION_STRING!)
    .then(() => {
      app.listen(process.env.port, () => {
        console.log(
          `Mongo DB Connected and Express Server running on ${process.env.port}`
        );
      });
    })
    .catch(console.error);
}
