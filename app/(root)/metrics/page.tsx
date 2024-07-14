'use client'
import React from 'react';
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
  return (
    <div style={{ width: '100%', height: 400 }}>
      <h1 className=' font-bold text-[2rem] text-white mb-5'>Fatigue Detection Metric </h1>
      <ResponsiveContainer>
        <BarChart data={data}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name">
            <Label value="Months of the Year" offset={-5} position="insideBottom" />
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
