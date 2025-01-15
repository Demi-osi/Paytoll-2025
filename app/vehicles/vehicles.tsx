"use client";

import { useEffect, useState } from "react";
import { Vehicle } from "@/app/lib/definitions";
import { createVehicles, handlePayToll } from "@/app/lib/action";
//import userData from "../dummy_user";
import { getSession, useSession } from "next-auth/react";
import { Session, User } from "next-auth";

type PaymentMethod = "appBalance" | "linkedCard";

export default function VehiclesPage() {
  const { data: session } = useSession()
  const [showForm, setShowForm] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [newVehiclePlate, setNewVehiclePlate] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("appBalance");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  //const [session, setSession] = useState<Session | null>(null);

  //const { data: session, status } = useSession();



  useEffect(() => {
    
        const fetchSession = async () => {
          const session = await getSession();
          //console.log(session?.user)
          //setSession(session);
    
        };
    
        const fetchVehicles = async () => {
          try {
            const response = await fetch("/api/vehicles");
            if (response.ok) {
              const data = await response.json();
              const vehi: Vehicle[] = data.map((item: any) => {
                //console.log('Raw tolls string:', item.tolls); // Log the raw string
                
                 
                
                return {
                  id: item.id,
                  licensePlate: item.license_plate,
                  tollIncurred: isNaN(Number(item.toll_balance)) ? 0 : Number(item.toll_balance),
                  tolls: item.tolls,
                  make: item.make,
                  model: item.model,
                  year: item.year
                };
              });
              
              //console.log(vehi);
              setVehicles(vehi);
            } else {
              console.error("Failed to fetch vehicles, status:", response.status);
            }
          } catch (error) {
            console.error("Error fetching vehicles:", error);
          }
        };

    fetchSession();
    fetchVehicles();
    //console.log("vehicles", vehicles);
  }, [])

  useEffect(() => {
    //console.log("Updated vehicles:", vehicles); // Log the vehicles whenever they update
    //vehicles.forEach(vehicle => {
    //  console.log(`Tolls for vehicle ${vehicle.licensePlate}:`, vehicle.tolls);
   // });
  }, [vehicles]);

  const handleSelectVehicle = (vehicle: Vehicle) => {
    // If the vehicle is already selected, deselect it, otherwise select it
    setSelectedVehicle((prevSelected) =>
      prevSelected && prevSelected.id === vehicle.id ? null : vehicle
    );
  };
  
  
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData(e.target as HTMLFormElement);
  
    try {
      // Call the createVehicles function with formData
      await createVehicles(formData);
  
      // Reset the form fields after successful submission
      setNewVehiclePlate("");
      setMake("");
      setModel("");
      setYear("");
  
      // Fetch updated vehicles list
      const response = await fetch("/api/vehicles");
      if (response.ok) {
        const updatedVehicles = await response.json();
        const vehic: Vehicle[] = updatedVehicles.map((item: any) => ({
          id: item.id,
          licensePlate: item.license_plate,
          tollIncurred: isNaN(Number(item.toll_balance)) ? 0 : Number(item.toll_balance),
          tolls: item.tolls,
          make: item.make,
          model: item.model,
          year: item.year,
        }));
  
        setVehicles(vehic);
        alert("Vehicle successfully added!");
      } else {
        console.error("Failed to fetch updated vehicles, status:", response.status);
        alert("Vehicle added but failed to fetch updated list.");
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
      alert("An error occurred while adding the vehicle.");
    }
  };
  

  const tollsArray: { id: number; name: string; amount: number; date: string; location: string }[] = 
  selectedVehicle?.tolls  
    ? Object.entries(selectedVehicle.tolls).map(([id, toll]: [string, string]) => { 
        const [name, amount, date, location] = toll.split('/');
        
        return { 
          id: parseInt(id),  // Include the original ID from the object
          name, 
          amount: parseFloat(amount),  // Ensure amount is parsed as a number
          date, 
          location 
        };  
      }) 
    : [];

  
    const handlePayToll_button = async (toll: {id: number; name: string; amount: number; date: string; location: string }, selectedVehicleId: string) => {
      
      if (!session || !session.user || typeof session.user.balance === "undefined") {
        alert("User session not found. Please log in to continue.");
        return;
      }
      const userBalance = parseFloat(session?.user.balance.toString());

    
      if (userBalance < toll.amount) {
        alert("Your balance is too low. Please top up your account and try again.");
        return; 
      }
    
      const formData = new FormData();
      formData.append('id', toll.id.toString());
      formData.append('name', toll.name.toString());
      formData.append('amount', toll.amount.toString());
      formData.append('date', toll.date.toString());
      formData.append('location', toll.location);
      formData.append('selectedVehicleId', selectedVehicleId.toString());
    
      try {
        // Call the handlePayToll function to process the payment
        await handlePayToll(formData);
        
        // After successful payment, fetch the updated session
       
        //update({...session!.user, balance: userBalance - toll.amount});
        const updatedTolls = { ...selectedVehicle?.tolls };
        delete updatedTolls[toll.id]; // Remove the toll using its ID as key
        
        // Update the selected vehicle with the new tolls
        if (selectedVehicle) {
          setSelectedVehicle({
            ...selectedVehicle,
            tolls: updatedTolls,
          });
        }
        // Optionally update the session state if needed
        // setSession(updatedSession); // Uncomment if you're using a session state variable
    
        // Refetch the vehicles list to reflect changes
        const response = await fetch("/api/vehicles");
        if (response.ok) {
          const updatedVehicles = await response.json();
          const vehic: Vehicle[] = updatedVehicles.map((item: any) => ({
            id: item.id,
            licensePlate: item.license_plate,
            tollIncurred: isNaN(Number(item.toll_balance)) ? 0 : Number(item.toll_balance),
            tolls: item.tolls,
            make: item.make,
            model: item.model,
            year: item.year,
          }));
    
          setVehicles(vehic);
        }
    
        // Close the payment popup after successful payment
        setShowPaymentPopup(false);  
      } catch (error) {
        console.error("Error processing toll payment:", error);
        alert("An error occurred while processing the payment.");
      }
    };
    


  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Manage Vehicles</h1>

        {/* Button to toggle form visibility */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none mb-6"
        >
          {showForm ? "Cancel" : "Add New Vehicle"}
        </button>

        {/* Add New Vehicle */}
        {showForm && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">License Plate</label>
            <input
              type="text"
              name="licensePlate"
              placeholder="Enter license plate"
              value={newVehiclePlate}
              onChange={(e) => setNewVehiclePlate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500 bg-white text-gray-800"
              required
            />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Make</label>
              <input
                type="text"
                name="Make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="Enter vehicle make"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500 bg-white text-gray-800"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Model</label>
              <input
                type="text"
                name="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Enter vehicle model"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500 bg-white text-gray-800"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Year</label>
              <input
                type="number"
                name="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Enter vehicle year"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500 bg-white text-gray-800"
                required
              />
            </div>
          
            <button
              type="submit"
              className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none"
            >
              Add Vehicle
            </button>
        </form>
        )}

        {/* Vehicle List */}
        <div className="space-y-6">
          {vehicles.map((Vehicle) => (
            <div key={Vehicle.id} className="flex justify-between items-center p-4 border rounded-lg bg-gray-50">
              <div>
                <p className="text-gray-700 font-semibold">{Vehicle.licensePlate}</p>
                <p className="text-gray-500">Toll Incurred: R{Vehicle.tollIncurred !== undefined ? Vehicle.tollIncurred.toFixed(2) : "0.00"}</p>
              </div>
              <button
                onClick={() => handleSelectVehicle(Vehicle)}
                className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none"
              >
                {selectedVehicle && selectedVehicle.id === Vehicle.id ? "Selected" : "Select"}
              </button>
            </div>
          ))}
        </div>

        {/* Toll Payment Options */}
        {selectedVehicle && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700">Pay Toll for {selectedVehicle.licensePlate}</h2>

            <div className="flex items-center mt-4 space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="appBalance"
                  checked={paymentMethod === "appBalance"}
                  onChange={() => setPaymentMethod("appBalance")}
                  className="mr-2"
                />
                App Balance
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="linkedCard"
                  checked={paymentMethod === "linkedCard"}
                  onChange={() => {
                    alert("Functionality Coming Soon");
                    setPaymentMethod("appBalance");  // Automatically select appBalance
                  }}
                  className="mr-2"
                />
                Linked Card
              </label>
            </div>

            <button
              onClick={() => setShowPaymentPopup(true)}
              className="mt-6 w-full bg-teal-500 text-white py-3 px-4 rounded-lg hover:bg-teal-600 focus:outline-none"
            >
              Pay Toll
            </button>
          </div>
        )}

        {/* Payment Popup */}

        {showPaymentPopup && selectedVehicle && tollsArray.length > 0 && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4">Tolls for {selectedVehicle.licensePlate}</h2>

      <div className="max-h-64 overflow-y-scroll space-y-4 mb-4">
      {tollsArray.map((toll, index) => (
        <div key={toll.id} className="mb-4 pb-4 border-b border-gray-200">
          <h3 className="font-bold text-lg mb-2">{toll.name}</h3>
          <div className="space-y-1">
            <p><span className="font-semibold">Amount:</span> R{toll.amount.toFixed(2)}</p>
            <p><span className="font-semibold">Date:</span> {toll.date.split('T')[0]}</p>
            <p><span className="font-semibold">Location:</span> {toll.location}</p>
          </div>
          <button 
            onClick={() => {
              if (selectedVehicle?.id) {
                handlePayToll_button(toll, selectedVehicle.id);
              }
            }} 
            className="mt-3 bg-teal-500 text-white py-1 px-4 rounded-lg hover:bg-teal-600 focus:outline-none"
          >
            Pay
          </button>
        </div>
      ))}
      </div>

              <button
                onClick={() => setShowPaymentPopup(false)}
                className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        )}
        

      </div>
    </div>
  );
}
