import { prisma } from './db';
import Papa from 'papaparse';

export interface ContactImport {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  tags?: string[];
  segments?: string[];
}

export async function importContacts(
  userId: string,
  fileContent: string
): Promise<{ success: number; failed: number }> {
  return new Promise((resolve, reject) => {
    Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => {
        // Normalize headers
        const headerMap: { [key: string]: string } = {
          'first_name': 'firstName',
          'last_name': 'lastName',
          'job_title': 'jobTitle'
        };
        return headerMap[header.toLowerCase()] || header;
      },
      complete: async (results: { data: any[]; }) => {
        try {
          let success = 0;
          let failed = 0;

          for (const record of results.data as any[]) {
            try {
              const contact: ContactImport = {
                firstName: record.firstName,
                lastName: record.lastName,
                email: record.email,
                phone: record.phone,
                company: record.company,
                jobTitle: record.jobTitle,
                tags: record.tags ? record.tags.split(',').map((t: string) => t.trim()) : [],
                segments: record.segments ? record.segments.split(',').map((s: string) => t.trim()) : []
              };

              await prisma.contact.create({
                data: {
                  userId,
                  ...contact,
                  tags: contact.tags || [],
                  segments: contact.segments || []
                }
              });
              success++;
            } catch (error) {
              console.error('Failed to import contact:', error);
              failed++;
            }
          }

          resolve({ success, failed });
        } catch (error) {
          reject(error);
        }
      },
      error: (error: Error) => {
        reject(error);
      }
    });
  });
}

export async function getContacts(userId: string) {
  return prisma.contact.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: { notes: true }
  });
}

export async function deleteContacts(userId: string, contactIds: string[]) {
  return prisma.contact.deleteMany({
    where: {
      userId,
      id: { in: contactIds }
    }
  });
}

export async function updateContact(userId: string, contactId: string, data: Partial<ContactImport>) {
  return prisma.contact.update({
    where: {
      id: contactId,
      userId // Ensure user owns the contact
    },
    data
  });
}

export async function addContactNote(userId: string, contactId: string, content: string) {
  return prisma.note.create({
    data: {
      content,
      authorId: userId,
      contactId
    }
  });
}