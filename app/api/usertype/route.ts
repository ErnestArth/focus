// handlers/user.js

import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/connect';
import Driver from '@/model/driver.model';
import Admin from '@/model/admin.model';

export const GET = async (req: NextRequest) => {
  try {
    // Parse query parameters from the request
    await connectToDB();
    const url = new URL(req.url);

    const userId = url.searchParams.get('userId');
   console.log(userId);
   
    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    // Connect to MongoDB database

    // Check if the user is a driver
    const driver = await Driver.findOne({ userId })  
    if (driver) {
      return NextResponse.json({ userType: 'driver', driver });
    }

    // If not a driver, check if the user is an admin
    const admin = await Admin.findOne({ userId });
    
    
    if (admin) {
      return NextResponse.json({ userType: 'admin', admin });
    }

    // If neither, respond with user not found
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  } catch (error) {
    // Handle errors
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Failed to fetch user' }, { status: 500 });
  }
};
