import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "pnpm/server/db";
import { images } from "pnpm/server/db/schema";
import { eq, and } from "drizzle-orm";

export async function DELETE(request: Request) {
  try {
    // Verify user is authenticated
    const user = auth();
    if (!user.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get image ID from request
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get("id");
    
    if (!imageId) {
      return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
    }

    // Delete the image from database
    const result = await db.delete(images)
      .where(
        and(
          eq(images.id, parseInt(imageId)),
          eq(images.userid, user.userId)
        )
      )
      .returning({ deletedId: images.id });

    // Check if image was deleted
    if (!result.length) {
      return NextResponse.json(
        { error: "Image not found or you don't have permission to delete it" }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, deletedId: result[0].deletedId });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" }, 
      { status: 500 }
    );
  }
}