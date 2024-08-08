import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { createFaultSchema } from "../../createFaultSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createFaultSchema.safeParse(body);
  if (!validation.success)
    // return NextResponse.json(validation.error.errors, { status: 400 });
    return NextResponse.json(validation.error.format(), { status: 400 });
  const newFault = await prisma.faults.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newFault, { status: 201 });
}