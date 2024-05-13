import { db } from "../../../lib/db";

import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  try {

    // detsrtucture todoTitle from the incoming request
    const { title, user_id } = await req.json(); 

    if (!title) {
      return new NextResponse("Title required", { status: 400 });
    }

    if (!user_id) {
        return new NextResponse("User ID required", { status: 400 });
      }

    // Create and save todo on the database
    const todo = await db.tasks.create({
      data: {
        title: title,
        user_id: user_id,
        status: "Incomplete"
      },
    });

    return NextResponse.json(todo, { status: 200 }); // Respond with the created todo
  } catch (error) {
    console.log("[POST TODO]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
}

export async function GET(req: NextRequest) {
  try {

    const id = req.nextUrl.searchParams.get("id")

    //fetch tasks from the db
    const tasks = await db.tasks.findMany({
      where: {
        user_id: id,
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