// components/AdminProfileSetup.tsx
'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useStore from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  agencyName: string;
  agencyAddress: string;
  agencyType: string;
  agencySize: string;
}

export default function AdminProfileSetup() {
  const { register, handleSubmit,watch, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const {setName}= useStore()
  const router = useRouter();
  const {user }:any= useUser()  
const formData = watch();

  const onSubmit = async (data: FormData) => {
    console.log(formData);
    const mergedData = {
      ...formData,
     userId: user?.publicMetadata?.userId// Merge publicMetadata with form data
    };
    console.log(mergedData);
    
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/admin', mergedData);
      setLoading(false);
      
      if (response.status === 200) {
        alert('Profile updated successfully');
        // Redirect to a specific route, e.g., dashboard

        setName('admin')
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

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 sm:p-8 md:p-10">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Admin Profile Setup</CardTitle>
        <CardDescription>Complete your profile to manage your transport agency.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" {...register('phone', { required: 'Phone number is required' })} placeholder="Enter your phone number" />
              {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="agencyName">Agency Name</Label>
              <Input id="agencyName" {...register('agencyName', { required: 'Agency name is required' })} placeholder="Enter your agency name" />
              {errors.agencyName && <p className="text-red-500">{errors.agencyName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="agencyAddress">Agency Address</Label>
              <Textarea id="agencyAddress" {...register('agencyAddress', { required: 'Agency address is required' })} placeholder="Enter your agency address" />
              {errors.agencyAddress && <p className="text-red-500">{errors.agencyAddress.message}</p>}
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* <div className="space-y-2">
                <Label htmlFor="agencyType">Agency Type</Label>
                <Select  {...register('agencyType', { required: 'Agency type is required' })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select agency type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="taxi">Taxi</SelectItem>
                    <SelectItem value="rideshare">Rideshare</SelectItem>
                    <SelectItem value="delivery">Delivery</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.agencyType && <p className="text-red-500">{errors.agencyType.message}</p>}
              </div> */}
              {/* <div className="space-y-2">
                <Label htmlFor="agencySize">Agency Size</Label>
                <Select  {...register('agencySize', { required: 'Agency size is required' })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select agency size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (1-10 vehicles)</SelectItem>
                    <SelectItem value="medium">Medium (11-50 vehicles)</SelectItem>
                    <SelectItem value="large">Large (51+ vehicles)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.agencySize && <p className="text-red-500">{errors.agencySize.message}</p>}
              </div> */}
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? 'loading...' : 'Submit'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
