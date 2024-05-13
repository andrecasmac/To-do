import { db } from "../../../lib/db";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json(); 

    if (!email) {
      return new NextResponse("Email required", { status: 400 });
    }

    if (!password) {
        return new NextResponse("Password required", { status: 400 });
      }

    // Create and save todo on the database
    const user = await db.users.findFirst({
      where: {
        email: email,
        password: password,
      },
    });

    if (user) {
        return NextResponse.json({id: user.id, name: user.name}, { status: 200 }); // Respond with the user
    } else {
        return NextResponse.json({error: "User was not found in database."}, { status: 404 }); // Respond with the user
    }

  } catch (error) {
    console.log("[FIND USER]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}

export async function GET() {
  try {

    //fetch tasks from the db
    const tasks = await db.tasks.findMany({
      where: {
        user_id: "662f3917f4ff9df9d3424931",
      },
    });

    // respond with the todos
    return NextResponse.json(tasks, { status: 200 }); 
  } catch (error) {
    console.log("[GET TASKS]", error);

// Handle errors
    return new NextResponse("Internal Server Error", { status: 500 }); 
  }
}