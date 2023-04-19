import * as React from 'react';
import { FormEvent } from 'react';

import { z } from 'zod';

import { InputFormGroup } from '~/components/input-form-group';

interface UseFormInput<TValues> {
  schema: z.Schema<TValues>;
  onSubmit: (values: TValues) => void;
}

type ErrorsMap<TValues> = {
  [Key in keyof TValues]?: string;
};

const useForm = <TValues,>({ schema, onSubmit }: UseFormInput<TValues>) => {
  const [errors, setErrors] = React.useState<ErrorsMap<TValues>>({});

  const handleSubmit = React.useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      try {
        setErrors({});
        const parsedData = schema.parse(data);
        onSubmit(parsedData);
      } catch (error: any) {
        if (!(error instanceof z.ZodError)) {
          // unexpected error! handle it somehow (omitted as it's only example that should focus on zod)
          return;
        }

        // validation error, expected, simplified example how to deal with errors returned by zod
        const newErrors: ErrorsMap<TValues> = {};
        error.issues.forEach((issue) => {
          const [field] = issue.path;
          newErrors[field as keyof TValues] = issue.message;
        });
        setErrors(newErrors);
      }
    },
    [onSubmit, schema],
  );

  return { handleSubmit, errors };
};

const formSchema = z.object({
  firstName: z.string().min(2, 'First name should has at least 2 characters'),
  lastName: z.string().min(2),
  title: z.string().optional(),
});

export const FormDataExample = () => {
  const submitForm = React.useCallback((data: z.infer<typeof formSchema>) => {
    // we're sure data is in desired shape as this function will be called only after successful validation
    console.log({ data });
  }, []);

  const { handleSubmit, errors } = useForm({
    schema: formSchema,
    onSubmit: submitForm,
  });

  return (
    <form onSubmit={handleSubmit}>
      <InputFormGroup
        label="First name"
        id="firstName"
        containerClassName="mb-6"
        error={errors.firstName}
        name="firstName"
      />
      <InputFormGroup
        label="Last name"
        id="lastName"
        containerClassName="mb-6"
        error={errors.lastName}
        name="lastName"
      />
      <InputFormGroup
        label="Title (optional)"
        id="title"
        containerClassName="mb-6"
        error={errors.title}
        name="title"
      />
      <button
        type="submit"
        className="rounded-3xl bg-violet-500 px-6 py-2 text-white"
      >
        Submit
      </button>
    </form>
  );
};
