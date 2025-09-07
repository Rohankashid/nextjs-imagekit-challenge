import {NextResponse} from "next/server";

import {and, count, desc, eq} from "drizzle-orm";
import {cert, getApps, initializeApp} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";

import {db} from "@/db";
import {media} from "@/db/schema/media";

// Initialize Firebase Admin once
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n"
      ),
    }),
  });
}

export async function GET(req: Request) {
  try {
    const {searchParams} = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 20);
    const filter = searchParams.get("filter") || undefined;

    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const idToken = authHeader.split(" ")[1];
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    const typeCondition = filter
      ? eq(media.mediaType, filter.toUpperCase() as "IMAGE" | "VIDEO")
      : undefined;
    const whereCondition = typeCondition
      ? and(eq(media.userId, uid), typeCondition)
      : eq(media.userId, uid);

    const [totalResult] = await db
      .select({count: count()})
      .from(media)
      .where(whereCondition);

    const totalCount = totalResult?.count || 0;

    const mediaItems = await db
      .select()
      .from(media)
      .where(whereCondition)
      .orderBy(desc(media.createdAt))
      .offset(skip)
      .limit(limit);

    const isNext = totalCount > skip + limit;

    return NextResponse.json({media: mediaItems, isNext});
  } catch (error) {
    console.error("Fetch media error:", error);
    return NextResponse.json({error: "Failed to fetch media"}, {status: 500});
  }
}
