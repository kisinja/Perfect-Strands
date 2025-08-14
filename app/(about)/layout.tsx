import InsightRoll from "@/components/InsightRoll";
import { insights } from "@/utils";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full flex flex-col items-center justify-between">
      <InsightRoll insights={insights} />
      {children}
    </main>
  );
}
