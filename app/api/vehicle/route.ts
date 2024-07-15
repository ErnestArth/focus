// handlers/vehicle.js

import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/connect';
import Vehicle from '@/model/vehicle.model'; // Import your Vehicle model

export const POST = async (req: NextRequest) => {
  try {
    // Parse incoming JSON data from the request body
    const requestData = await req.json();

    // Connect to MongoDB database
    await connectToDB();

    // Create a new vehicle instance
    const newVehicle = new Vehicle({
      numberPlate: requestData.numberPlate,
      vehicleType: requestData.vehicleType,
      deviceId: requestData.deviceId,
    });

    // Save the new vehicle to the database
    await newVehicle.save();

    // Respond with success message
    return NextResponse.json({ message: 'Vehicle created successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error creating vehicle:', error);
    return NextResponse.json({ message: 'Failed to create vehicle' }, { status: 500 });
  }
};


// handlers/vehicles.js

export const GET = async (req: NextRequest) => {
  try {
    // Connect to MongoDB database
    await connectToDB();

    // Fetch all vehicles from the database
    const vehicles = await Vehicle.find();

    // Respond with the fetched vehicles
    return NextResponse.json({ vehicles });
  } catch (error) {
    // Handle errors
    console.error('Error fetching vehicles:', error);
    return NextResponse.json({ message: 'Failed to fetch vehicles' }, { status: 500 });
  }
};
