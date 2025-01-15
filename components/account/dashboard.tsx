"use client"

import { Section } from "@/components/craft";
import Link from "next/link";
//import userData from "@/app/dummy_user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
//import { User } from "next-auth";
import RechargePage from "@/app/(account)/recharge/page";


export default function Dashboard () {
    //const { data: session, update } = useSession();// Access session data

  const [balance, setBalance] = useState("");

   useEffect(() => {
     const fetchBalance = async () => {
             try {
               const response = await fetch("/api/balance");
               if (response.ok) {
                 const data = await response.json();
                 
                   
                 //console.log(data);
                 setBalance(data);
               } else {
                 console.error("Failed to fetch balance, status:", response.status);
               }
             } catch (error) {
               console.error("Error fetching balance:", error);
             }
           };
   
       fetchBalance();
       //console.log("vehicles", vehicles);
     }, [])
    

    const hold = parseFloat(balance).toFixed(2);
    

    
  return (
    <Section className="mb-8 p-6 bg-white rounded-lg shadow-lg text-gray-800">
            <h1 className="text-3xl font-bold mb-4 text-center">Account Dashboard</h1>
            
                {/* Account Balance */}
                <div className="mb-6 p-4 bg-teal-100 rounded-lg shadow-sm text-center">
                    <h2 className="text-xl font-semibold">Account Balance</h2>
                    <p className="text-3xl font-bold text-teal-600 mt-2">R{hold}</p>
                    <Link href="/recharge">
                        <button onClick={ RechargePage} className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition duration-300">
                            Recharge
                        </button>
                        </Link>
                   
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Transaction History */}
                <Link href="/transaction-history">
                    <button className="p-4 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 flex items-center justify-center w-full">
                        <span className="text-lg font-semibold">View Transaction History</span>
                    </button>
                </Link>

            
                {/* Connect Payment Account */}
                <Link href="payment-account" >
                    <button className="p-4 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 flex items-center justify-center w-full">
                        <span className="text-lg font-semibold">Connect Payment Method</span>
                    </button>
                </Link>
            
                {/* Manage Notifications */}
                <Link href="manage-notifications" >
                    <button className="p-4 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 flex items-center justify-center w-full">
                        <span className="text-lg font-semibold">Manage Notifications</span>
                    </button>
                </Link>

            
                {/* View Profile */}
                <Link href="view-profile" >
                    <button className="p-4 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 flex items-center justify-center w-full">
                        <span className="text-lg font-semibold">View Profile</span>
                    </button>
                </Link>
                </div>
    </Section>
)
};


