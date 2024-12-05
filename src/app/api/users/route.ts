import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await prisma.user.findMany();

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const {
    nombre,
    name,
    last_name,
    email,
    password,
    academic_degree,
    bio,
    phone,
  } = await request.json();

  const response = await prisma.user.create({
    data: {
      nombre,
      name,
      last_name,
      email,
      password,
      academic_degree,
      bio,
      phone,
    },
  });

  return NextResponse.json(response);
}
