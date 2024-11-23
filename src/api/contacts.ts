import { prisma } from '@/lib/db';
import type { ContactImport } from '@/lib/contacts';

export async function importContactsApi(
  userId: string,
  contacts: ContactImport[]
): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;

  for (const contact of contacts) {
    try {
      await prisma.contact.create({
        data: {
          userId,
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone,
          company: contact.company,
          jobTitle: contact.jobTitle,
          tags: contact.tags || [],
          segments: contact.segments || [],
        },
      });
      success++;
    } catch (error) {
      console.error('Failed to import contact:', error);
      failed++;
    }
  }

  return { success, failed };
}