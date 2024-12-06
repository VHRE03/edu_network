import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface Params {
  id: string;
}

export async function GET(request: Request, contex: { params: Params }) {
  const { id } = await contex.params;

  const response = await prisma.publication.findUnique({
    where: { id: Number(id) },
  });

  //
  if (!response) {
    return NextResponse.json(
      { error: "Publication not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(response);
}

export async function PUT(request: Request, context: { params: Params }) {
  try {
    const data = await request.json();

    const response = await prisma.publication.update({
      where: { id: Number(context.params.id) },
      data: data,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Publication not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: { params: Params }) {
  try {
    const { id } = await context.params;

    const response = await prisma.publication.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Publication not found" },
          { status: 404 }
        );
      }
    }
  }
}
