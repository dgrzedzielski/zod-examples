import Link from 'next/link';

import { GithubLogo } from '~/components/github-logo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div>
        <h1 className="mb-16 text-center text-5xl">Zod examples</h1>
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
          <Link
            href="/examples/form-data"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Form Data{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Validating native forms using form data and Zod
            </p>
          </Link>
          <Link
            href="/examples/react-hook-form"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              React Hook Form{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Using Zod together with react-hook-form
            </p>
          </Link>
          <Link
            href="/examples/envs"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Envs validation{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Ensuring env variables are valid with Zod
            </p>
          </Link>
          <Link
            href="/examples/api"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              API Responses{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Ensuring API is returning expected shape of data
            </p>
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <a
          href="https://github.com/dgrzedzielski/zod-examples"
          target="_blank"
          rel="noreferrer noopener"
        >
          <GithubLogo />
          <span className="sr-only">Github repo</span>
        </a>
      </div>
    </main>
  );
}
