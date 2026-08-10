export default function InputTextField({ id, value, onChange, placeholder }: {
  id: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input id={id} className="text-small border border-gray-300 px-4 py-1 outline:outline" value={value} onChange={onChange} placeholder={placeholder} />
  );
}
