interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center text-sm text-green-600 p-3 my-2 border-green-600 bg-green-100 rounded-md">
      <p className="text-green-500">ok</p>
      <p>{message}</p>
    </div>
  );
};
