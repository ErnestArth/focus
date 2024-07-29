import Vehicle from '@/model/vehicle.model';
import Warnings from '@/model/warnings.model';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (req: NextRequest) => {
  try {
    // Parse incoming JSON data from the request body
    const requestData = await req.json();
    console.log(requestData,"my brother");
    
    const { mac } = requestData;

    // // Connect to MongoDB database
    // await connectToDB();

    // // Find the vehicle by deviceId
    // const vehicle = await Vehicle.findOne({ deviceId:prompt });
    const updatedVehicle = await Vehicle.findOneAndUpdate(
      { deviceId:mac },
      {
        $inc: { fatigueWarnings: 1 }
      },
      { new: true, runValidators: true }
    );
console.log(updatedVehicle,"hiiiiiiiii");

    if (!updatedVehicle) {
      return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
    }
    const warnings = new Warnings({
      deviceId: mac,
      warning: 1
    });
    console.log(warnings);

    await warnings.save()
    

    // if (!vehicle) {
    //   return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
    // }

    // // Update the vehicle fields
    // Object.keys(updateData).forEach(key => {
    //   vehicle[key] = updateData[key];
    // });

    // // Save the updated vehicle to the database
    // await vehicle.save();

    // Respond with success message and updated vehicle data
    const response = NextResponse.json({ message: 'Vehicle updated successfully', requestData });
    response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins
    response.headers.set('Access-Control-Allow-Methods', 'PATCH, OPTIONS'); // Allow PATCH and OPTIONS methods
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    return response;

  } catch (error) {
    // Handle errors
    console.error('Error updating vehicle:', error);
    const response = NextResponse.json({ message: 'Failed to update vehicle' }, { status: 500 });
    response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins
    response.headers.set('Access-Control-Allow-Methods', 'PATCH, OPTIONS'); // Allow PATCH and OPTIONS methods
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    return response;
  }
};

export const OPTIONS = async (req: NextRequest) => {
  const response = NextResponse.json({}, { status: 204 }); // No Content
  response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins
  response.headers.set('Access-Control-Allow-Methods', 'PATCH, OPTIONS'); // Allow PATCH and OPTIONS methods
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
  return response;
};
