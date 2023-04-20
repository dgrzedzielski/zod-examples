import SyntaxHighlighter from 'react-syntax-highlighter';

import Link from 'next/link';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const codeSample = `import { z } from 'zod';

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
`;

const EnvsExamplePage = () => {
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <div className="relative max-w-4xl flex-1 rounded border border-slate-800 p-8">
        <Link
          className="absolute -top-12 block text-sky-400 transition-colors hover:text-sky-200"
          href="/"
        >
          &lt;- Back to examples
        </Link>
        <h2 className="mb-8 text-3xl">Envs example</h2>
        <div className="overflow-hidden rounded-lg border border-slate-800">
          <SyntaxHighlighter language="typescript" style={atomOneDark}>
            {codeSample}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default EnvsExamplePage;
