'use client'
import AdminHome from '@/components/AdminHome';
import Card from '@/components/Card';
import DriverHome from '@/components/DriverHome';
import useStore from '@/lib/store';


const Home = () => {
  // const now = new Date();
  // const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  // const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);
 const {name, setName}= useStore()
  return (
    <section className="flex size-full  items-center justify-center flex-wrap gap-5 text-white">
      {/* <Card/>
      <Card/>
      <Card/>
      <Card/> */}
      { name === 'driver'? <DriverHome/> : <AdminHome/> }
      


      
    </section>
  );
};

export default Home;
