'use client'

import DriverHome from '@/components/DriverHome';
import AdminHome from '@/components/AdminHome';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import useStore from '@/lib/store';

const Home = () => {
  const { user }: any = useUser();
  const { setUser } = useStore();
  const [state, setState] = useState<any>({ userType: '' }); // Initialize with a default value

  useEffect(() => {
    // Self-calling function to fetch user type and data
    (async () => {
      try {
        if (!user?.publicMetadata?.userId) return; // Prevent fetch if userId is not available
        
        // Make the request to fetch user type and data
        const response = await fetch(`http://localhost:3000/api/usertype?userId=${user.publicMetadata.userId}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data: any = await response.json();
        const res = await fetch(`http://localhost:3000/api/vehicle/${data.driver.vehicle}`);
        const results: any = await res.json();
        setUser(results?.vehicle || data?.admin); // Update user state
        setState(data); // Update local state with fetched data
        console.log('Fetched data:', results); // For debugging

      } catch (err) {
        console.error('Error fetching user:', err);
      }
    })(); // Self-calling function
  }, [user?.publicMetadata?.userId, setUser]);

  // Render different components based on userType
  if (state.userType === 'driver') {
    return <DriverHome />;
  } else if (state.userType === 'admin') {
    return <AdminHome />;
  }

  // Optionally, render a loading indicator or placeholder while fetching data
  return (
    <section className="flex size-full items-center justify-center flex-wrap gap-5 text-white">
      <p>Loading...</p>
    </section>
  );
};

export default Home;
