import { faultSchema } from "@/app/createFaultSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

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
  const body = await request.json();
  const validation = faultSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
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
      title: body.title,
      description: body.description,
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
