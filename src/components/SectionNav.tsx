import { ChevronLeft, ChevronRight } from "lucide-react";

interface SectionNavProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

const SectionNav = ({ current, total, onPrev, onNext }: SectionNavProps) => {
  return (
    <div className="flex items-center justify-between py-3">
      <button
        onClick={onPrev}
        disabled={current === 0}
        className="flex items-center gap-1 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        <ChevronLeft size={18} />
        Previous
      </button>
      <span className="text-sm text-muted-foreground font-medium">
        Section {current + 1} of {total}
      </span>
      <button
        onClick={onNext}
        disabled={current === total - 1}
        className="flex items-center gap-1 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default SectionNav;
