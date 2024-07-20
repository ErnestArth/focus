// handlers/vehicles.js

import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/connect';
import Vehicle from '@/model/vehicle.model';

export const PATCH = async (req: NextRequest) => {
  try {
    // Parse incoming JSON data from the request body
    const requestData = await req.json();
    const { deviceId, ...updateData } = requestData;
    
    // Connect to MongoDB database
    await connectToDB();

    // Find the vehicle by deviceId
    const vehicle = await Vehicle.findOne({ deviceId });

    if (!vehicle) {
      return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
    }

    // Update the vehicle fields
    Object.keys(updateData).forEach(key => {
      vehicle[key] = updateData[key];
    });

    // Save the updated vehicle to the database
    await vehicle.save();

    // Respond with success message and updated vehicle data
    return NextResponse.json({ message: 'Vehicle updated successfully', vehicle });
  } catch (error) {
    // Handle errors
    console.error('Error updating vehicle:', error);
    return NextResponse.json({ message: 'Failed to update vehicle' }, { status: 500 });
  }
};
