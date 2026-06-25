'use server';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { statusFromHeat, priorityFromHeat } from '@/lib/heat';

export async function updateLead(formData: FormData) {
  const id = formData.get('id') as string;
  const heat = Math.max(1, Math.min(10, parseInt(formData.get('heat') as string) || 5));
  await prisma.lead.update({
    where: { id },
    data: {
      company: formData.get('company') as string,
      contactName: formData.get('contactName') as string,
      emailOrPhone: formData.get('emailOrPhone') as string,
      lastContactAt: formData.get('lastContactAt') as string,
      actions: formData.get('actions') as string,
      resultComment: formData.get('resultComment') as string,
      nextActions: formData.get('nextActions') as string,
      notes: formData.get('notes') as string,
      heat,
      status: statusFromHeat(heat),
      priority: priorityFromHeat(heat),
    },
  });
  redirect('/');
}
