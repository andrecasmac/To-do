import { db } from "../../../lib/db";

import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id")

        if (!id) {
            return new NextResponse("User ID required", { status: 400 });
        }

        const logs = await db.logs.findMany({
            where: {
                task: {
                    user_id: id
                }
            }
        })

        return NextResponse.json(logs, { status: 200 }); 
    } catch (error) {
        console.log("[GET LOGS]", error);

        // Handle errors
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}