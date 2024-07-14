// handlers/driver.js

import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/connect';

import { auth } from '@clerk/nextjs/server';
import User from '@/model/user.model';
import Driver from '@/model/driver.model';

export const POST = async (req: NextRequest) => {
  try {
    // Parse incoming JSON data from the request body
    const requestData = await req.json();

    // Extract userId from session claims (assuming you're using Clerk for authentication)
    const { sessionClaims } = auth();
    const sessionId = sessionClaims?.userId as string;

    // Connect to MongoDB database
    await connectToDB();

    // Find the user based on sessionId (userId)
    const user = await User.findById(sessionId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Create a new driver profile
    const newDriverProfile = new Driver({
      userId: sessionId, // Link driver profile to the user
      fullName: requestData.fullName,
      dateOfBirth: requestData.dateOfBirth,
      gender: requestData.gender,
      contactNumber: requestData.contactNumber,
      email: requestData.email,
      deviceId: requestData.deviceId,
      streetAddress: requestData.streetAddress,
      city: requestData.city,
      state: requestData.state,
      country: requestData.country,
      vehicleType: requestData.vehicleType,
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
