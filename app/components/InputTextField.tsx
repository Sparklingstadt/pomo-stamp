export default function InputTextField({ value, onChange, placeholder }: {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input className="text-small border border-gray-300 px-4 py-1 outline:outline" value={value} onChange={onChange} placeholder={placeholder} />
  );
}