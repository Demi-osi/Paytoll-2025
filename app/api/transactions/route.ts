import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../lib/prisma'; // You need to set up Prisma client here
import { auth } from "../../auth";
import { NextApiRequest, NextApiResponse } from "next";

// API route to fetch transactions for a specific user by userId
export async function GET(req: NextRequest) {
  const session = await auth()

  try {
    // Fetch the transactions of the user based on their vehicles
    const transactions = await prisma.transactions.findMany({
      where: {
        vehicles: {
          user_id: session?.user?.id ,  // Match user_id with the given userId
        },
      },
    });

    // Return the transactions with vehicle details
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    // Handle error if something goes wrong
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}
