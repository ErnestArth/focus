import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/connect';
import { auth } from '@clerk/nextjs/server';
import User from '@/model/user.model';
import Driver from '@/model/driver.model';
import { createUser } from '@/lib/user.util';

export const POST = async (req: NextRequest) => {
  try {
    // Parse incoming JSON data from the request body
    const requestData = await req.json();
    const { clerkId, firstName, lastName, image, userName, email } = requestData;
    console.log(requestData);
    

   

 

    // Connect to MongoDB database
    

    

    // Create a new user
    const newUser:any = {
      clerkId,
      firstName,
      lastName,
      image,
      userName,
      email,
    };
await createUser(newUser)
    



    // Respond with the created user
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
