import express from 'express';

import cors from 'cors';
import { urlRouter } from '../src/routers/urlRouter';
import * as trpcExpress from '@trpc/server/adapters/express';

const PORT = 3000;
const app = express();
app.use(cors());
app.use('/trpc', trpcExpress.createExpressMiddleware({ router: urlRouter }));
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
