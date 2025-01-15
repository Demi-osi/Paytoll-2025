"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/craft";
import { getSession, useSession } from "next-auth/react";
//import { Session } from "next-auth";



export default function ProfilePage() {
  const { data: session, status } = useSession(); 
  
useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      //console.log(session?.user)
      //setSession(session);

    };

    fetchSession();
  }, []) 
  

  //const [session, setSession] = useState<Session | null>(null);
  // Dummy user data
 

  
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  //console.log('Session Data from useSession:', session);
  const fName =  session?.user?.firstName || 'No first name';
  const lName =  session?.user?.lastName || 'No last name';
  const email = session?.user?.email || 'No email';


  return (
    <Section className="bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Profile</h1>

        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">First Name</label>
            <p className="text-gray-800 bg-gray-100 px-4 py-2 rounded-lg">{fName}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
            <p className="text-gray-800 bg-gray-100 px-4 py-2 rounded-lg">{lName}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <p className="text-gray-800 bg-gray-100 px-4 py-2 rounded-lg">{email}</p>
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Address</label>
            <p className="text-gray-800 bg-gray-100 px-4 py-2 rounded-lg">{session?.user['address']|| 'No address available'}</p>
          </div>

        </div>
      </div>
    </Section>
  );
}