import 'server-only';

import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, writeToken } from '../env';

if (!writeToken) {
  throw new Error('Missing environment variable: SANITY_WRITE_TOKEN');
}

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
});
