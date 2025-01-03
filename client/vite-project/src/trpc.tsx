import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { urlRouter } from '../../../backend/src/routers/urlRouter';
const trpcClient = createTRPCProxyClient<urlRouter>({
  links: [httpBatchLink({ url: 'http://localhost:3000/trpc' })],
});

export default trpcClient;
