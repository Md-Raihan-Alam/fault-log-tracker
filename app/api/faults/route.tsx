import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createFaultSchema = z.object({
  title: z.string().min(5).max(255),
  description: z.string().min(10),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createFaultSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const newFault = await prisma.faults.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newFault, { status: 201 });
}
