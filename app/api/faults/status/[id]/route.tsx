import { patchFaultSchema } from "@/app/createFaultSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import delay from "delay";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = patchFaultSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { status } = body;

  const fault = await prisma.faults.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!fault)
    return NextResponse.json({ error: "Invalid Fault" }, { status: 404 });

  const updateFault = await prisma.faults.update({
    where: {
      id: fault.id,
    },
    data: {
      status,
    },
  });

  return NextResponse.json(updateFault);
}
