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

  // Handle "unassigned" case
  if (body.assignedToUserId === "unassigned") {
    body.assignedToUserId = null;
  }

  const validation = patchFaultSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { assignedToUserId, title, description } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

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
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updateFault);
}

export async function DELETE(
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

  const fault = await prisma.faults.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!fault) {
    return NextResponse.json({ error: "Invalid Fault-log" }, { status: 404 });
  }
  await prisma.faults.delete({
    where: {
      id: fault.id,
    },
  });
  return NextResponse.json({});
}
