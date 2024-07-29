'use client'
import useStore from '@/lib/store';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Label } from 'recharts';

const data = [
  { name: 'January', fatigueRate: 30 },
  { name: 'February', fatigueRate: 25 },
  { name: 'March', fatigueRate: 35 },
  { name: 'April', fatigueRate: 40 },
  { name: 'May', fatigueRate: 45 },
  { name: 'June', fatigueRate: 50 },
  { name: 'July', fatigueRate: 55 },
  { name: 'August', fatigueRate: 60 },
  { name: 'September', fatigueRate: 50 },
  { name: 'October', fatigueRate: 45 },
  { name: 'November', fatigueRate: 40 },
  { name: 'December', fatigueRate: 35 },
];

const Page = () => {
  const {userDetails} = useStore()
  const [value, setData]= useState([])
 

  useEffect(() => {
    
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/vehicle/metrics/${userDetails.deviceId}`); // Replace with your backend API endpoint to fetch vehicles
        console.log(response);
  
        if (response.status === 200) {
          setData(response.data)
           // Update vehicles state with fetched data
        } else {
          console.error('Failed to fetch vehicles');
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
      // Fetch vehicles when component mounts
      fetchVehicles();
    }, [])
  return (
    <div style={{ width: '100%', height: 400 }}>
      <h1 className=' font-bold text-[2rem] text-white mb-5'>Fatigue Detection Metric </h1>
      <ResponsiveContainer>
        <BarChart data={value.metric}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="month">
            <Label value="month" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Fatigue Rate" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="fatigueRate" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Page;
