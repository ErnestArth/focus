'use client'
import React, { useState } from 'react';
import {  useForm } from 'react-hook-form';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useStore from '@/lib/store';
import { useRouter } from 'next/navigation';


interface FormData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  email: string;
  deviceId: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  vehicleType: string;
  licenseNumber: string; // Assuming this is part of your form
  vehicleRegistration: string; // Assuming this is part of your form
}

export default function DriverProfileSetup() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const { setName } = useStore()
  const router = useRouter();

  const formData = watch();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      console.log("Form Data:", formData); // Log the form data
      const response = await axios.post('https://focuss-main.vercel.app/api/driver', formData);

      setLoading(false);

      if (response.status === 200) {
        alert('Profile updated successfully');
        setName('driver');
        router.push('/dashboard');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile');
    }
  };

  // Watch all fields to log changes
  
 

  return (
    <Card className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Driver Profile Setup</CardTitle>
        <CardDescription>Provide your personal, address, license, and vehicle details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Gender is required' }}
                  render={({ field }) => (
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.country && <p className="text-red-500">{errors.country.message as string}</p>}
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input id="dateOfBirth" type="date" {...register('dateOfBirth', { required: 'Date of birth is required' })} />
                {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message as string}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select {...register('gender', { required: 'Gender is required' })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-red-500">{errors.gender.message as string}</p>}
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input id="contactNumber" type="tel" {...register('contactNumber', { required: 'Contact number is required' })} placeholder="+1 (123) 456-7890" />
                {errors.contactNumber && <p className="text-red-500">{errors.contactNumber.message as string}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deviceId">Device ID</Label>
              <Input id="deviceId" {...register('deviceId', { required: 'Device ID is required' })} placeholder="Mac-address" />
              {errors.deviceId && <p className="text-red-500">{errors.deviceId.message as string}</p>}
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="streetAddress">Street Address</Label>
              <Input id="streetAddress" {...register('streetAddress', { required: 'Street address is required' })} placeholder="123 Main St" />
              {errors.streetAddress && <p className="text-red-500">{errors.streetAddress.message as string}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register('city', { required: 'City is required' })} placeholder="San Francisco" />
                {errors.city && <p className="text-red-500">{errors.city.message as string}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input id="state" {...register('state', { required: 'State/Province is required' })} placeholder="CA" />
                {errors.state && <p className="text-red-500">{errors.state.message as string}</p>}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {/* <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select {...register('vehicleType', { required: 'Vehicle type is required' })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="bus">Bus</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="motorcycle">Motorcycle</SelectItem>
                </SelectContent>
              </Select>
              {errors.vehicleType && <p className="text-red-500">{errors.vehicleType.message as string}</p>}
            </div> */}
            
            
          </div>
          <CardFooter className="flex justify-end gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Submit'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

