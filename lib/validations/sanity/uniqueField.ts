import { client } from '@/sanity/lib/client';

interface UniqueFieldParams {
  fieldValue: string | undefined;
  documentId?: string;
  fieldName: string;
  documentType: string;
  errorMessage: string;
}

async function validateUniqueField({
  fieldValue,
  documentId,
  fieldName,
  documentType,
  errorMessage,
}: UniqueFieldParams): Promise<true | string> {
  if (!fieldValue) return true;

  // Remove the 'drafts.' prefix if it is present
  const cleanDocumentId = documentId?.replace(/^drafts\./, '');

  const query = `count(*[_type == "${documentType}" && ${fieldName} == "${fieldValue}" && !(_id in [$documentId, 'drafts.' + $documentId])])`;

  const count: number = await client
    .config({ useCdn: false })
    .fetch(query, { documentId: cleanDocumentId ?? '' });

  return count > 0 ? errorMessage : true;
}

export { validateUniqueField };
export type { UniqueFieldParams };
