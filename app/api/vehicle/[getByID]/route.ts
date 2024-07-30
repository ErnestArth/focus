// handlers/vehicle.js

import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/connect';
import Vehicle from '@/model/vehicle.model';
// import User from '@/model/user.model';
// Import your Vehicle model




// handlers/vehicles.js

export const GET = async (req: NextRequest,{params}:any) => {
  try {
    // Connect to MongoDB database

    console.log(req);
    
    
    await connectToDB();
    const {getByID}= params
    // check if  user first 
    
    const vehicle = await Vehicle.findById(getByID)
  
    if (vehicle){
      return NextResponse.json({ message:" vehicle found ",vehicle })
    }
    
    // if(!user){
        
    // return NextResponse.json({ message:"user not found" })
    // }
    // Fetch all vehicles from the database
    const vehicles = await Vehicle.findOne({deviceId:getByID})
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
