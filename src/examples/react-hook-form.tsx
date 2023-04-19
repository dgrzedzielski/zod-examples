import * as React from 'react';
import { useForm, UseFormProps } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const useZodForm = <TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema['_input']>, 'resolver'> & {
    schema: TSchema;
  },
) => {
  return useForm<TSchema['_input']>({
    ...props,
    resolver: zodResolver(props.schema, undefined),
  });
};

const formSchema = z.object({
  firstName: z.string().min(2, 'First name should has at least 2 characters'),
  lastName: z.string().min(2, 'Last name is too short'),
  title: z.string().optional(),
});

export function ReactHookFormExample() {
  const { handleSubmit, register, formState } = useZodForm({
    schema: formSchema,
  });

  const submitForm = React.useCallback((data: z.infer<typeof formSchema>) => {
    console.log({ data });
  }, []);

  console.log({ errors: formState.errors });

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="mb-6 flex flex-col gap-4">
        <label htmlFor="firstName">First Name</label>
        <input
          className="rounded border-slate-700 bg-slate-800 px-4 py-2"
          type="text"
          id="firstName"
          {...register('firstName')}
        />
      </div>
      <div className="mb-6 flex flex-col gap-4">
        <label htmlFor="lastName">Last Name</label>
        <input
          className="rounded border-slate-700 bg-slate-800 px-4 py-2"
          type="text"
          id="lastName"
          {...register('lastName')}
        />
      </div>
      <div className="mb-6 flex flex-col gap-4">
        <label htmlFor="title">Title</label>
        <input
          className="rounded border-slate-700 bg-slate-800 px-4 py-2"
          type="text"
          id="title"
          {...register('title')}
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
}
