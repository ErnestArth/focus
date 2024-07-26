// handlers/vehicle.js

import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/connect';
import Vehicle from '@/model/vehicle.model'; // Import your Vehicle model
import User from '@/model/user.model';



// handlers/vehicles.js

export const GET = async (req: NextRequest,{params}:any) => {
  try {
    // Connect to MongoDB database

    await connectToDB();
    // check if  user first 
    const {getById}= params
    const user = await User.findById(getById)
    if(!user){
        
    return NextResponse.json({ message:"user not found" })
    }
    // Fetch all vehicles from the database
    const vehicles = await Vehicle.findById(getById);
    if (!vehicles){
      
    return NextResponse.json({ message:"vehicle not found" })  
    }
    // Respond with the fetched vehicles
    return NextResponse.json({ vehicles });
  } catch (error) {
    // Handle errors
    console.error('Error fetching vehicles:', error);
    return NextResponse.json({ message: 'Failed to fetch vehicles' }, { status: 500 });
  }
};
