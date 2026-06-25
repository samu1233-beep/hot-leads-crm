"use server";
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { parseWorkbook } from '@/lib/import-leads';
import { priorityFromHeat, statusFromHeat } from '@/lib/heat';

export async function importWorkbookAction(_prevState: { ok: boolean; message: string }, formData: FormData) {
  const file = formData.get('file');
  if (!(file instanceof File)) return { ok: false, message: 'Valitse Excel-tiedosto.' };

  const arrayBuffer = await file.arrayBuffer();
  const { leads, orders } = parseWorkbook(Buffer.from(arrayBuffer));

  await prisma.orderItem.deleteMany();
  await prisma.lead.deleteMany();

  for (const lead of leads) {
    await prisma.lead.create({
      data: {
        ...lead,
        status: statusFromHeat(lead.heat),
        priority: priorityFromHeat(lead.heat)
      }
    });
  }
  for (const order of orders) {
    await prisma.orderItem.create({ data: order });
  }

  revalidatePath('/');
  revalidatePath('/orders');
  revalidatePath('/excel');
  revalidatePath('/import');

  return { ok: true, message: leads.length + ' liidia tuotu onnistuneesti.' };
}
