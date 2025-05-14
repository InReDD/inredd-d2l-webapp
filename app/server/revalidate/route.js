import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request) {
  if (
    request.nextUrl.searchParams.get("token") !==
    process.env.REVALIDATE_CACHE_TOKEN
  ) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const tag = request.nextUrl.searchParams.get("tag");
  console.log("revalidating ", tag);
  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
