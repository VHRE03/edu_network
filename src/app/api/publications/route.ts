import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  const response = await prisma.publication.findMany();

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const { id, title, content, created_at, status, research_area, user_id } =
    await request.json();

  const response = await prisma.publication.create({
    data: {
      id,
      title,
      content,
      created_at,
      status,
      research_area,
      user_id,
    },
  });

  return NextResponse.json(response);
}
