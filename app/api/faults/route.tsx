import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { faultSchema } from "../../createFaultSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = faultSchema.safeParse(body);
  if (!validation.success)
    // return NextResponse.json(validation.error.errors, { status: 400 });
    return NextResponse.json(validation.error.format(), { status: 400 });
  const newFault = await prisma.faults.create({
    data: {
      title: body.title,
      description: body.description,
      createdByUser: body.name,
      createdByUserId: body.id,
    },
  });

  return NextResponse.json(newFault, { status: 201 });
}
