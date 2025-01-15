import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Assuming you have a `prisma` client setup
import { auth } from "../../auth";
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
    const session = await auth()

  try {

    const user = await prisma.users.findUnique({
      where: { id: session?.user?.id },
      select: { balance: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' },{status: 404});
    }

    return NextResponse.json(user.balance)
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


