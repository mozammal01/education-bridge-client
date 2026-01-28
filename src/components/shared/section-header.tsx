import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  align = "center",
  className 
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "mb-10",
      align === "center" && "text-center",
      className
    )}>
      <h2 className="text-3xl font-bold tracking-tight mb-3">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
