import * as React from 'react';

import { z } from 'zod';

const postDetailsSchema = z.object({
  title: z.string(),
  body: z.string(),
  id: z.number(),
  // userId: z.number(),
  // make sure to add every needed field, as if not added it wont be returned
});

const postDetailsSchemaFailing = z.object({
  title: z.string(),
  description: z.string(),
  missingField: z.number(),
});

type PostDetailsResponse = z.infer<typeof postDetailsSchema>;

async function fetchData<TData>(schema: z.Schema<TData>) {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const json = await res.json();
    const parsedData = schema.parse(json);

    return parsedData;
  } catch (e) {
    console.log(e);
    // handle error somehow
    // for example throw further and display in some error boundary
    // or simply use console.log as you never should allow this error to reach prod env

    return undefined;
  }
}

export const ApiExample = () => {
  const [data, setData] = React.useState<PostDetailsResponse | null>(null);

  const updateDataSuccess = async () => {
    const response = await fetchData(postDetailsSchema);
    setData(response || null);
  };

  const updateDataWithError = async () => {
    const response = await fetchData(postDetailsSchemaFailing);
    // setData(response || null);
    // we cant even setData here as it's wrong type in comparison with our PostDetailsResponse
  };

  return (
    <div>
      <div className="mb-8 flex gap-4">
        <button
          type="button"
          onClick={updateDataSuccess}
          className="rounded-3xl bg-violet-600 px-4 py-2 hover:bg-violet-800"
        >
          Fetch proper response
        </button>
        <button
          type="button"
          onClick={updateDataWithError}
          className="rounded-3xl bg-violet-600 px-4 py-2 hover:bg-violet-800"
        >
          Fetch wrong response
        </button>
      </div>
      <p>Data:</p>
      <div className="mt-1 overflow-x-auto rounded border border-slate-800 p-4">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <div className="mt-8">
        <p className="mb-1">
          Example tools implementing zod validation for fetching data
        </p>
        <ul>
          <li>
            <a
              href="https://github.com/ecyrbe/zodios"
              target="_blank"
              rel="noreferrer noopener"
              className="text-sky-500 hover:text-sky-300"
            >
              Zodios
            </a>
          </li>
          <li>
            <a
              href="https://github.com/mattpocock/zod-fetch"
              target="_blank"
              rel="noreferrer noopener"
              className="text-sky-500 hover:text-sky-300"
            >
              zod-fetch
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
