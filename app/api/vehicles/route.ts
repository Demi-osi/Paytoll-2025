import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
//import userData from "../../dummy_user";
import { auth } from "@/app/auth"
import { NextApiRequest, NextApiResponse } from "next"

export async function GET(req: NextRequest) {
  const session = await auth()

  //console.log(session?.user)
  
  try {
    const vehicles = await prisma.vehicles.findMany({
      where: {
        user_id: session?.user?.id, // Filter vehicles by user ID
      },
    });
    //console.log(vehicles)
    return NextResponse.json(vehicles);
  } catch (error) {
    return NextResponse.error();
  }
}


