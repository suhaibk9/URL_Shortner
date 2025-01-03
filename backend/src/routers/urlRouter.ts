import { z } from 'zod';
import { Router } from 'express';
import { trpc } from '../context';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const urlRouter = trpc.router({
  getShortUrl: trpc.procedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const url = await prisma.url.findUnique({ where: { shortUrl: input } });
      if (!url) {
        throw new Error('Not found');
      }
      return url.originalUrl;
    }),
  createShortUrl: trpc.procedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input }) => {
      const shortUrl = Math.random().toString(36).substring(7);
      await prisma.url.create({ data: { shortUrl, originalUrl: input.url } });
      return shortUrl;
    }),
});



export type urlRouter = typeof urlRouter;