type SectionHeaderProps = {
  title: string;
  description: string;
};

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-sm uppercase tracking-[0.3em] text-[#8B1E3F]">{title}</p>
      <p className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">{description}</p>
    </div>
  );
}
