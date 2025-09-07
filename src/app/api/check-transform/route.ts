import {NextResponse} from "next/server";

export async function GET(req: Request) {
  try {
    const {searchParams} = new URL(req.url);
    const url = searchParams.get("u");
    if (!url) return NextResponse.json({error: "Missing u"}, {status: 400});

    const res = await fetch(url, {method: "HEAD", redirect: "follow"});
    return NextResponse.json({status: res.status});
  } catch (e) {
    return NextResponse.json({status: 500}, {status: 200});
  }
}
