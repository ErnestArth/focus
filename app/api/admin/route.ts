
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/connect';
import User from '@/model/user.model';
import Admin from '@/model/admin.model'; // Adjust the import to match your admin model

export const POST = async (req: NextRequest) => {
  try {
    // Parse incoming JSON data from the request body
    const requestData = await req.json();
    const { userId } = requestData
    // console.log(userId,'HDDHHD');
    

    // Extract userId from session claims (assuming you're using Clerk for authentication)
    // const { sessionClaims } = auth();

    // const sessionId = sessionClaims?.userId as string;

    // // Connect to MongoDB database
    await connectToDB();
    // console.log(sessionClaims);
    

    // Find the user based on sessionId (userId)
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Create a new admin profile
    const newAdminProfile = new Admin({
      userId, // Link admin profile to the user
      phone: requestData.phone,
      agencyName: requestData.agencyName,
      usertype:'driver',
     
    });

    // Save the new admin profile to the database
    await newAdminProfile.save();

    // Respond with success message
    return NextResponse.json({ message: 'Admin profile created successfully',newAdminProfile });
  } catch (error) {
    // Handle errors
    console.error('Error creating admin profile:', error);
    return NextResponse.json({ message: 'Failed to create admin profile' }, { status: 500 });
  }
};
