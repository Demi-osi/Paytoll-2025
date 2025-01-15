
import { auth } from "../../../auth";


export async function GET() {
  const session = await auth(); // Get the latest session

  //console.log(session)
  if (session) {
    return new Response(JSON.stringify(session), {
      status: 200,
    });
  } else {
    return new Response("No session found", { status: 404 });
  }
}
