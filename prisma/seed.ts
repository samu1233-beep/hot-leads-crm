import { PrismaClient } from '@prisma/client';
import { priorityFromHeat, statusFromHeat } from '../lib/heat';
import { initialLeads, initialOrders } from '../lib/seed-data';

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.lead.deleteMany();

  for (const lead of initialLeads) {
    await prisma.lead.create({
      data: {
        ...lead,
        status: statusFromHeat(lead.heat),
        priority: priorityFromHeat(lead.heat)
      }
    });
  }

  for (const item of initialOrders) {
    await prisma.orderItem.create({ data: item });
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
