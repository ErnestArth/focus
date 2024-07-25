'use client'


import DriverHome from '@/components/DriverHome';
import AdminHome from '@/components/AdminHome';
// import useStore from '@/lib/store';
import { useUser } from '@clerk/nextjs';
import { useEffect,useState } from 'react';


const Home = () => {
  // const now = new Date();
  // const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  // const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);
  const {user }:any= useUser() 
  console.log(user)
  const [state,setState]=useState<any>([])
  
  useEffect(() => {
    // Self-calling function to fetch user type and data
    (async () => {
      try {
        // Make the request to fetch user type and data
        const response = await fetch(`api/usertype?userId=${user?.publicMetadata?.userId}`);
        
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data:any = await response.json();
        setState(data)
        console.log(data)
        console.log('Fetched data:', data); // For debugging

       
      } catch (err) {
        console.error('Error fetching user:', err);
      
      } 
    })(); // Self-calling function
  }, [user?.publicMetadata?.userId])
 // const {name}= useStore()
  return (
    <section className="flex size-full  items-center justify-center flex-wrap gap-5 text-white">
      {/* <Card/>
      <Card/>
      <Card/>
      <Card/> */}
      { state.userType === 'driver'? <DriverHome/> :  <AdminHome/> }
      


      
    </section>
  );
};

export default Home;
