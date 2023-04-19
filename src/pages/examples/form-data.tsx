import { FormDataExample } from '~/examples/form-data';

const FormDataExamplePage = () => {
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <div className="max-w-4xl flex-1 rounded border border-slate-800 p-8">
        <h2 className="mb-8 text-3xl">Form Data Example</h2>
        <FormDataExample />
      </div>
    </div>
  );
};

export default FormDataExamplePage;
