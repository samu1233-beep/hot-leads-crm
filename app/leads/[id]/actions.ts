"use server";
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { priorityFromHeat, statusFromHeat } from '@/lib/heat';

export async function updateLead(formData: FormData) {
  const id = String(formData.get('id') || '');
  const notes = String(formData.get('notes') || '');
  const heat = Number(formData.get('heat'));
  if (!id || !Number.isFinite(heat)) return;

  await prisma.lead.update({
    where: { id },
    data: {
      notes,
      heat,
      status: statusFromHeat(heat),
      priority: priorityFromHeat(heat)
    }
  });

  revalidatePath('/');
  revalidatePath('/leads/' + id);
}
