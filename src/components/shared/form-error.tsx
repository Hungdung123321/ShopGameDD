interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center text-sm text-red-600 p-3 my-2 border-red-600 bg-red-100 rounded-md">
      <p className="text-red-500 mr-2">Eror: </p>
      <p>{message}</p>
    </div>
  );
};
