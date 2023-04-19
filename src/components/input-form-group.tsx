import * as React from 'react';

import clsx from 'clsx';

interface InputFormGroupProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: React.ReactNode;
  containerClassName?: string;
}

export const InputFormGroup = React.forwardRef<
  HTMLInputElement,
  InputFormGroupProps
>(({ id, className, label, containerClassName, error, ...props }, ref) => {
  const hasAnyError = !!error;
  const errorElementId = `${id}Error`;

  return (
    <div className={clsx('flex flex-col gap-2', containerClassName)}>
      <label htmlFor={id}>{label}</label>
      <input
        ref={ref}
        id={id}
        className={clsx(
          'rounded border  bg-slate-800 px-4 py-2 outline-none',
          {
            'border-slate-700 focus:border-sky-400': !hasAnyError,
            'border-red-700 focus:border-red-500': hasAnyError,
          },
          className,
        )}
        aria-describedby={hasAnyError ? errorElementId : undefined}
        aria-invalid={hasAnyError ? 'true' : 'false'}
        {...props}
      />
      {hasAnyError && (
        <div id={errorElementId} className="text-red-500">
          {error}
        </div>
      )}
    </div>
  );
});
