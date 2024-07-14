
import User from "@/model/user.model";
import { connectToDB } from "./connect";

export async function createUser(user: any) {
    try {
      await connectToDB();
      // had to change the User type here for testing
      const newUser = await User.create(user);
      return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
      console.log(error);
    }
  }