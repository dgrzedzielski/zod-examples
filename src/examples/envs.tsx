/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod';

// ensuring we have all needed env variables
const envSchema = z.object({
  DATABASE_URL: z.string(),
  CUSTOM_STUFF: z.string(),
  SOME_NUMBER: z.number(),
});

envSchema.parse(process.env);

// overwriting types to have access to typed process.env - it's rather a fun fact
// normally we would get env vars after parsing like above
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

const { CUSTOM_STUFF, DATABASE_URL, SOME_NUMBER } = process.env;
