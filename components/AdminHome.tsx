'use client'
import { useEffect, useState } from "react";  
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";

import { Separator } from "@/components/ui/separator";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import axios from "axios";

import useStore from "@/lib/store";
export default function AdminHome() {
  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false);
  const [isViewDriverOpen, setIsViewDriverOpen] = useState(false);
  // const [selectedDriver, setSelectedDriver] = useState<any>(null);
const {user} = useUser()
  
  const [vehicleData, setVehicleData] = useState<any>({
    numberPlate: '',
    vehicleType: '',
    deviceId: '',
    userId:user?.publicMetadata.userId
  });
  const [vehicles, setVehicles] = useState<any>([]);
  const {vehicle,setVehicle}= useStore()
  useEffect(() => {
    // Fetch vehicles when component mounts
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/vehicle'); // Replace with your backend API endpoint to fetch vehicles

      if (response.status === 200) {
        setVehicles(response.data.vehicles);
        console.log(response);
         // Update vehicles state with fetched data
      } else {
        console.error('Failed to fetch vehicles');
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleAddVehicle = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/vehicle', vehicleData); // Send vehicleData to backend API

      if (response.status === 200) {
        alert('Vehicle added successfully');
      
        // Optionally, you can update the local state or fetch updated data
      } else {
        alert('Failed to add vehicle');
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
      alert('An error occurred while adding the vehicle');
    }
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setVehicleData((prevState:any) => ({
      ...prevState,
      [name]: value
    }));
    console.log(value);
    
  };
  // const drivers = [
  //   { name: "Number Plate 1", vehicle: "Sedan", status: "Active", device: "Smartphone", lastUpdated: "2h ago" },
  //   { name: "Number Plate 2", vehicle: "SUV", status: "Offline", device: "Tablet", lastUpdated: "1 day ago" },
  //   { name: "Number Plate 3", vehicle: "Pickup Truck", status: "Active", device: "GPS", lastUpdated: "3h ago" },
  //   { name: "Number Plate 4", vehicle: "Van", status: "Offline", device: "Other", lastUpdated: "2 days ago" },
  // ];

  const handleViewDriver = (driver:any) => {
    // setSelectedDriver(driver);
    setIsViewDriverOpen(true);
    setVehicle(driver)
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="max-w-6xl w-full mx-auto flex items-center gap-4">
        
          <Button onClick={() => setIsAddDriverOpen(true)}>Add New Vehicle</Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full mx-auto">
          {vehicles?.map((driver:any, index:any) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="grid gap-1">
                  <CardTitle>{driver.numberPlate}</CardTitle>
                  <CardDescription>{driver.deviceId}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <MoveHorizontalIcon className="w-4 h-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewDriver(driver)}>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Vehicle</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="grid gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Badge className="text-xs" variant={driver.status === "Active" ? "secondary" : "outline"}>
                    {driver.status}
                  </Badge>
                  <span className="text-muted-foreground">Last updated {driver.lastUpdated}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Dialog open={isAddDriverOpen} onOpenChange={setIsAddDriverOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <PlusIcon className="w-6 h-6" />
            <span className="sr-only">Add new vehicle</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Vehicle</DialogTitle>
            <DialogDescription>Fill out the form to add a new vehicle to the system.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Number Plate
              </Label>
              <Input
                id="numberPlate"
                name="numberPlate"
                value={vehicleData.numberPlate}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              
              {/* <Select  >
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="pickup">Pickup Truck</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="deviceId" className="text-right">
                DeviceId
              </Label>
              
              <Input
                id="deviceId"
                name="deviceId"
                value={vehicleData.deviceId}
                onChange={handleChange}
                placeholder="Enter device ID"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button  onClick={handleAddVehicle}>Save vehicle</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isViewDriverOpen} onOpenChange={setIsViewDriverOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <UserIcon className="w-6 h-6" />
            <span className="sr-only">View vehicle details</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{vehicle?.numberPlate}</DialogTitle>
            <DialogDescription>Detailed information about the driver.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label className="text-right">Vehicle</Label>
              <div className="col-span-3">{vehicle?.numberPlate}</div>
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label className="text-right">Device</Label>
              <div className="col-span-3">{vehicle?.numberPlate}</div>
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label className="text-right">Status</Label>
              <div className="col-span-3">
                <Badge className="text-xs" variant={vehicle?.status === "Active" ? "secondary" : "outline"}>
                  {vehicle?.status}
                </Badge>
              </div>
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label className="text-right">Last Updated</Label>
              <div className="col-span-3">{vehicle?.lastUpdated}</div>
            </div>
            <Separator />
            <div className="grid gap-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Distance Driven</TableCell>
                    <TableCell>1234 km</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hours Driven</TableCell>
                    <TableCell>45 hrs</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fatigue Warnings</TableCell>
                    <TableCell>{vehicle.fatigueWarnings
              }</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsViewDriverOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


function MoveHorizontalIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 17l-3.5-3.5L8 10m8 0l3.5 3.5L16 17M4 12h16"
      />
    </svg>
  );
}

function PlusIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );
}

function UserIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.121 17.804A6 6 0 0112 15a6 6 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
