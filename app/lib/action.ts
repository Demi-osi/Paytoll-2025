'use server';
//import { signIn, signOut } from '@/auth';
//import { AuthError } from 'next-auth';
import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
//import userData from "../dummy_user"; 
import { AuthError } from "next-auth";


import { z } from 'zod';

import { signIn, auth } from "../auth"
//import { getSession, GetSessionParams } from "next-auth/react";
 
const session = await auth()

const southAfricaTime = new Intl.DateTimeFormat('en-ZA', {
  timeZone: 'Africa/Johannesburg',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
}).format(new Date());
const isoDate = new Date(southAfricaTime).toISOString();

//console.log(isoDate);


const vehicleFormSchema = z.object({
  licensePlate: z.string(),
  user: z.string(),
  tollIncurred: z.coerce.number(),
  tolls: z.record(z.string()).refine(
    (tolls) => Object.keys(tolls).length > 0, 
    { message: "Tolls object must not be empty" }
  ),
  make: z.string(),
  model: z.string(),
  year: z.coerce.number(),
});


const CardFormSchema = z.object({
    card_number: z.string(),
    user: z.string(),
    expiry_date: z.coerce.date(),
  });

    const SignupFormSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    balance: z.coerce.number(),
    email: z.string(),
    password: z.string(),
  });

//const CreateVehicles = vehicleFormSchema.omit({ id: true,});

const today = new Date().toISOString().split('T')[0];


const dummy_tolls = {
  0: "Bakwena Toll Plaza/35.00/2024-12-09T12:00:00.000Z-N1/Pretoria",
  1: "Grasmere Toll Plaza/21.00/2024-12-09T11:00:00.000Z-N1/Highway, Johannesburg South",
  2: "Carousel Toll Plaza/62.00/2024-12-09T10:00:00.000Z-N1/Highway, Pretoria North",
  3: "Heidelberg South Plaza/49.00/2024-12-09T09:00:00.000Z-N3/Highway, Johannesburg East",
  4: "Middelburg Plaza/78.00/2024-12-09T08:00:00.000Z-N4/Highway, Mpumalanga"
};
  
  /**
   * const dummy_tolls = [
    "Bakwena Toll Plaza/35.00/2024-12-09T12:00:00.000Z-N1/Pretoria",
    "Grasmere Toll Plaza/21.00/2024-12-09T11:00:00.000Z-N1/Highway, Johannesburg South",
    "Carousel Toll Plaza/62.00/2024-12-09T10:00:00.000Z-N1/Highway, Pretoria North",
    "Heidelberg South Plaza/49.00/2024-12-09T09:00:00.000Z-N3/Highway, Johannesburg East",
    "Middelburg Plaza/78.00/2024-12-09T08:00:00.000Z-N4/Highway, Mpumalanga"
  ];
   *  
  });
  const vehicleFormSchema = z.object({
  licensePlate: z.string(),
  user: z.string(),
  tollIncurred: z.coerce.number(),
  tolls: z.array(z.string()),
  make: z.string(),
  model: z.string(),
  year: z.coerce.number(),
});
   */
  
 

  const tollsArray = Object.entries(dummy_tolls).map(([key, toll]) => {
    const [name, amount, date, location] = toll.split('/');
    return { 
      index: parseInt(key), 
      name, 
      amount: parseFloat(amount), 
      date, 
      location 
    };
  });
  
 
export async function createVehicles(formData: FormData) {

  console.log(session?.user?.id)
  
    const { licensePlate, user, tollIncurred, tolls, make, model, year } = vehicleFormSchema.parse({
        licensePlate: formData.get('licensePlate'),
        tollIncurred: 244,
        user: session?.user?.id,
        tolls: dummy_tolls,
        make: formData.get('Make'),
        model: formData.get('Model'),
        year: formData.get('Year'),
      });
      const amountInCents = tollIncurred * 100;

      //console.log("Tolls", tolls)
      //const tollsForPrisma = JSON.stringify(tolls);

      const vehicle = await prisma.vehicles.create({
        data: {
          license_plate: licensePlate,
          user_id: user,
          make,
          model,
          year,
          toll_balance: tollIncurred,
          tolls: tolls,
        },
      });

      return null; 

      revalidatePath('/vehicles');
      redirect('/vehicles');

      
}



export async function createCards(formData: FormData) {

    const { card_number, user, expiry_date } = CardFormSchema.parse({
        card_number: formData.get('cardNumber'),
        user: session?.user?.id,
        expiry_date: formData.get('expiryDate'),
      });

      const card = await prisma.cards.create({
        data: {
          card_number,
          user_id: user,
          expiry_date,
        },
      });

      return null;

      revalidatePath('/payment-account');
      redirect('/payment-account');
}

/*export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }

  export async function handleSignOut() {
    await signOut();
  } */
  
  export async function createUser(formData: FormData) {
    const { firstname, lastname, balance, email, password } = SignupFormSchema.parse({
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      balance: 500,
      email: formData.get('email'),
      password: formData.get('password'),
    });
  
    // Check if the user already exists by email
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });
  
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
  
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);
  
    // Create a new user in the database
    const newUser = await prisma.users.create({
      data: {
        first_name: firstname, 
        last_name: lastname, 
        balance,
        email,
        password_hash: passwordHash,
      },
    });
  
    // Redirect to the sign-in page after successful signup
    redirect('/signin');
  }

  export async function handlePayToll(formData: FormData) {
    if (!session || !session.user || !session.user.id) {
      return new Response(JSON.stringify({ message: 'User not authenticated.' }), { status: 401 });
    }
    // Parse the incoming FormData
    
    // Extract the toll data from the FormData
    const id = parseFloat(formData.get('id') as string);
    const name = formData.get('name') as string;
    const amount = parseFloat(formData.get('amount') as string);
    const date = formData.get('date') as string;
    const location = formData.get('location') as string;
    const vehicle_id = formData.get('selectedVehicleId') as string;

  
    if (isNaN(id) || isNaN(amount) || !vehicle_id) {
      return new Response(JSON.stringify({ message: 'Invalid toll data.' }), { status: 400 });
    }
    // Parse the tolls object
    if (typeof vehicle_id !== 'string') {
      return new Response(JSON.stringify({ message: 'Invalid vehicle ID.' }), { status: 400 });
    }
  
    const userData = await prisma.users.findUnique({
      where: { id: session?.user['id'] },
      select: { balance: true },
    });

    if (!userData || !userData.balance) {
      return new Response(JSON.stringify({ message: 'User balance not found.' }), { status: 404 });
    }

    const userBalance = userData.balance.toNumber()

    if (userData?.balance === null || userBalance < amount) {
      return new Response(JSON.stringify({ message: 'Insufficient balance.' }), { status: 400 });
    }

    
  
    // Deduct the toll amount from the user's balance
    const updatedBalance = userBalance- amount;

    await prisma.users.update({
      where: { id: session?.user['id'] },
      data: { balance: updatedBalance },
    });

    const selectedVehicle = await prisma.vehicles.findUnique({
      where: { id: vehicle_id },
      select: { tolls: true, toll_balance: true, license_plate: true },
    });

    if (!selectedVehicle) {
      return new Response(JSON.stringify({ message: 'Vehicle not found.' }), { status: 404 });
    }
  
    // Update the tolls object and toll balance
    const tolls = selectedVehicle.tolls as Record<number, string>; // Ensure it's treated as the new structure
    const tollToRemove = tolls[id];

    if (!tollToRemove) {
      return new Response(JSON.stringify({ message: 'Toll not found.' }), { status: 404 });
    }
  
    const updatedTolls = { ...tolls };
    delete updatedTolls[id];

    const tollBalance = selectedVehicle.toll_balance || 0;
    const updatedTollBalance = Number(tollBalance) - amount;

    await prisma.vehicles.update({
      where: { id: vehicle_id },
      data: {
        tolls: updatedTolls,
        toll_balance: updatedTollBalance,
      },
    });
    const [pureDate] = date.split('T'); 
    console.log(pureDate)
    await prisma.transactions.create({
      data: {
        amount: amount,
        location: location,
        toll_name: name,
        license_plate: selectedVehicle.license_plate,  // Include license plate if available
        toll_incurred_at: new Date(pureDate),
        date_paid: isoDate, // Current timestamp
        vehicles: {
          connect: {
            id: vehicle_id,  // Connect using the existing vehicle ID
          },
        },
      },
    });
    

    return {
      //message: `Toll paid successfully: ${tollToRemove.split('/')[0]} - Amount: R${amount.toFixed(2)}`
    };
  
  
    /*if (!name || isNaN(amount) || !date || !location || !vehicle_id) {
      return new Response(JSON.stringify({ message: 'Invalid toll data.' }), { status: 400 });
    }
  
    if (typeof vehicle_id !== 'string') {
      return new Response(JSON.stringify({ message: 'Invalid vehicle ID.' }), { status: 400 });
    }
  
    // Check if the user's balance is sufficient
    if (userData.balance < amount) {
      return new Response(JSON.stringify({ message: 'Insufficient balance.' }), { status: 400 });
    }
  
    // Deduct the toll amount from the user's balance
    const updatedBalance = session?.user['balance'] - amount;
  
    await prisma.users.update({
      where: { id: userData.id },
      data: { balance: updatedBalance },
    });
  
    // You may need to fetch the selected vehicle here, depending on your data structure
    const selectedVehicle = await prisma.vehicles.findUnique({
      where: { id: vehicle_id },
    });
  
    if (!selectedVehicle) {
      return new Response(JSON.stringify({ message: 'Vehicle not found.' }), { status: 404 });
    }
  
    // Convert the tolls to a plain string array if it's not already
    const currentTolls = Array.isArray(selectedVehicle.tolls) 
      ? selectedVehicle.tolls 
      : JSON.parse(selectedVehicle.tolls as string);
  
    // Remove the specific toll from the array
    const updatedTolls = currentTolls.filter(
      (toll: string) => toll !== `${name}/${amount}/${date}/${location}`
    );
  
    const tollBalance: number = selectedVehicle.toll_balance 
      ? Number(selectedVehicle.toll_balance) 
      : 0;
    const updatedTollBalance = tollBalance - amount;
  
    // Update the vehicle's tolls and balance
    await prisma.vehicles.update({
      where: { id: selectedVehicle.id },
      data: {
        tolls: updatedTolls,
        toll_balance: updatedTollBalance,
      },
    });*/
  
    //return new Response(JSON.stringify({ message: `Toll paid successfully: ${name} - Amount: R${amount.toFixed(2)}` }));
  }

  export async function authenticate(
    prevState: string | undefined,
    formData: FormData
  ) {
    try {
      console.log()
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/vehicles" // Redirect path after successful login
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }

  /*export const getServerSideProps = async (context: GetSessionParams | undefined) => {
    const session = await getSession(context);
  
    if (!session) {
      return {
        redirect: {
          destination: "/signin", // redirect to sign-in page
          permanent: false,
        },
      };
    }
  
    return {
      props: {
        session,
      },
    };
  };*/