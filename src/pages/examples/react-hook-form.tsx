import Link from 'next/link';

import { ReactHookFormExample } from '~/examples/react-hook-form';

const FormDataExamplePage = () => {
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <div className="relative max-w-4xl flex-1 rounded border border-slate-800 p-8">
        <Link
          className="absolute -top-12 block text-sky-400 transition-colors hover:text-sky-200"
          href="/"
        >
          &lt;- Back to examples
        </Link>
        <h2 className="mb-8 text-3xl">React Hook Form Example</h2>
        <ReactHookFormExample />
      </div>
    </div>
  );
};

export default FormDataExamplePage;
