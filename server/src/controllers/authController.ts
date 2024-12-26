import { Request, Response } from "express";
import connectDB from "../database/dbConn";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { responseHandler, errorHandler } from "../middlewares/responseErrorHandler";
import dotenv from 'dotenv';
dotenv.config();

const saltRounds = 10;

export const registerUser = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (email !== null && password !== null) {
      console.log({email, password});
      const conn = await connectDB();
      const usersCollection = conn.db("Blog-Application").collection("Users");
      const user = await usersCollection.findOne({ email: email });

      if (user) {
        console.log("User already exists. Please try logging in.");
        return res.status(409).json({ Message: "This user already exists. Please try logging in." });
      }

      const hashedPass = await bcrypt.hash(password, saltRounds);

      const newUser = {
        email: email,
        password: hashedPass,
      };

      const inserted = await usersCollection.insertOne(newUser);
      if (inserted.acknowledged) {
        return res.status(201).send("New user created successfully");
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("something went wrong in register user, catch");
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {

    if (!process.env.JWT_SECRET) {
      throw new Error("No jwt secret");
    }

    const conn = await connectDB();
    const usersCollection = conn.db("Blog-Application").collection("Users");

    const { email, password } = req.body;
    const user = await usersCollection.findOne({ email: email });

    if (!user) {
      return res.status(404).send({message: "No user with this email found"});
    }

    const passMatch = await bcrypt.compare(password, user.password);

    if (passMatch) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });
      return res.status(200).json({ message: "Successfully logged in!", token });
    } else {
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("something went wrong in login user, catch");
  }
};
