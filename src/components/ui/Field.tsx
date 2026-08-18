interface FieldProps {
  label: string;
  name: string;
  type?: "email" | "text" | "password";
  placeholder?: string;
}

export function Field({ label, name, type = "text", placeholder }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-proefex-navy">
      {label}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="rounded-2xl border border-proefex-navy/10 bg-white px-4 py-3 text-sm text-proefex-navy outline-none transition focus:border-proefex-orange focus:ring-4 focus:ring-proefex-orange/10"
      />
    </label>
  );
}
