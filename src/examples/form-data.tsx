import * as React from 'react';
import { FormEvent } from 'react';

import { z } from 'zod';

interface UseFormInput<TValues> {
  schema: z.Schema<TValues>;
  onSubmit: (values: TValues) => void;
}

const useForm = <TValues,>({ schema, onSubmit }: UseFormInput<TValues>) => {
  const handleSubmit = React.useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      try {
        const parsedData = schema.parse(data);
        onSubmit(parsedData);
      } catch (error: any) {
        if (!(error instanceof z.ZodError)) {
          // unexpected error!
          return;
        }

        // validation error, expected
        console.log(error);
      }
    },
    [onSubmit, schema],
  );

  return { handleSubmit };
};

const formSchema = z.object({
  firstName: z.string().min(2, 'First name should has at least 2 characters'),
  lastName: z.string().min(2, 'Last name is too short'),
  title: z.string().optional(),
});

export const FormDataExample = () => {
  const submitForm = React.useCallback((data: z.infer<typeof formSchema>) => {
    console.log({ data });
  }, []);

  const { handleSubmit } = useForm({
    schema: formSchema,
    onSubmit: submitForm,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 flex flex-col gap-4">
        <label htmlFor="firstName">First Name</label>
        <input
          className="rounded border-slate-700 bg-slate-800 px-4 py-2"
          type="text"
          id="firstName"
          name="firstName"
          required
        />
      </div>
      <div className="mb-6 flex flex-col gap-4">
        <label htmlFor="lastName">Last Name</label>
        <input
          className="rounded border-slate-700 bg-slate-800 px-4 py-2"
          type="text"
          id="lastName"
          name="lastName"
          required
        />
      </div>
      <div className="mb-6 flex flex-col gap-4">
        <label htmlFor="title">Title</label>
        <input
          className="rounded border-slate-700 bg-slate-800 px-4 py-2"
          type="text"
          id="title"
          name="title"
        />
      </div>
      <button
        type="submit"
        className="rounded-3xl bg-violet-500 px-6 py-2 text-white"
      >
        Submit
      </button>
    </form>
  );
};
