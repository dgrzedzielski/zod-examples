import * as React from 'react';
import { useForm, UseFormProps } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { InputFormGroup } from '~/components/input-form-group';

export function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema['_input']>, 'resolver'> & {
    schema: TSchema;
  },
) {
  return useForm<TSchema['_input']>({
    ...props,
    resolver: zodResolver(props.schema),
  });
}

const formSchema = z.object({
  firstName: z.string().min(2, 'First name should has at least 2 characters'),
  lastName: z.string().min(2),
  title: z.string().optional(),
});

type FormModel = z.infer<typeof formSchema>;

export const ReactHookFormExample = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useZodForm({
    schema: formSchema,
  });

  const submitForm = React.useCallback((data: FormModel) => {
    // we're sure data is in desired shape as this function will be called only after successful validation
    console.log({ data });
  }, []);

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <InputFormGroup
        label="First name"
        id="firstName"
        containerClassName="mb-6"
        error={errors.firstName?.message}
        {...register('firstName')}
      />
      <InputFormGroup
        label="Last name"
        id="lastName"
        containerClassName="mb-6"
        error={errors.lastName?.message}
        {...register('lastName')}
      />
      <InputFormGroup
        label="Title (optional)"
        id="title"
        containerClassName="mb-6"
        error={errors.title?.message}
        {...register('title')}
      />
      <button
        type="submit"
        className="rounded-3xl bg-violet-600 px-6 py-2 text-white hover:bg-violet-800"
      >
        Submit
      </button>
    </form>
  );
};
