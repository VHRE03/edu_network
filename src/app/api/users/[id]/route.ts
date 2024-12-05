import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

// Definir el tipo de params
interface Params {
  id: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const response = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(response);
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const data = await request.json();

  const response = await prisma.user.update({
    where: { id: Number(params.id) },
    data: data,
  });

  return NextResponse.json(response);
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const response = await prisma.user.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(response);
}
