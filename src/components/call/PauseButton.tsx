import { Pause } from 'lucide-react';

interface PauseButtonProps {
  onPause?: () => void;
}

export function PauseButton({ onPause }: PauseButtonProps) {
  return (
    <button 
      onClick={onPause}
      className="bg-[#111827] flex items-center justify-center p-2.5 rounded-[13px] w-12 h-12 hover:bg-[#1f2937] transition-colors"
      aria-label="Pause"
    >
      <Pause className="w-6 h-6 text-white" />
    </button>
  );
}
