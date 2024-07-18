// handlers/driver.js

import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/connect';


import User from '@/model/user.model';
import Driver from '@/model/driver.model';

export const POST = async (req: NextRequest) => {
  try {
    // Parse incoming JSON data from the request body
    const requestData = await req.json();
    const { userId } = requestData
    // console.log(userId,'HDDHHD');
    // const userId= "669885e7cc60666595c63187"
    
    // Extract userId from session claims (assuming you're using Clerk for authentication)
    // const { sessionClaims } = auth();
    // console.log(sessionClaims,'id');
    
    // const sessionId = sessionClaims?.userId as string;
    // console.log(sessionId);
    

    // Connect to MongoDB database
    await connectToDB();

    // Find the user based on sessionId (userId)
    const user = await User.findById(userId);
    console.log(user);
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Create a new driver profile
    const newDriverProfile = new Driver({
      userId, // Link driver profile to the user
      fullName: requestData.fullName,
      dateOfBirth: requestData.dateOfBirth,
      contactNumber: requestData.contactNumber,
     
      deviceId: requestData.deviceId,
      streetAddress: requestData.streetAddress,
      city: requestData.city,
      state: requestData.state,
     
    });

    // Save the new driver profile to the database
    await newDriverProfile.save();

    // Respond with success message
    return NextResponse.json({ message: 'Driver profile created successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error creating driver profile:', error);
    return NextResponse.json({ message: 'Failed to create driver profile' }, { status: 500 });
  }
};
