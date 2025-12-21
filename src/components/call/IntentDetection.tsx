import { RotateCcw } from 'lucide-react';
import { ReplyButton } from './MessageCards';

interface IntentDetectionProps {
  suggestions: string[];
  onSelectReply?: (reply: string) => void;
  onRegenerate?: () => void;
}

export function IntentDetection({ suggestions, onSelectReply, onRegenerate }: IntentDetectionProps) {
  return (
    <div className="bg-[#111827] flex flex-col gap-2 items-start px-4 py-3 rounded-[13px] w-full">
      <p className="text-[#9ca3af] text-base w-full whitespace-pre-wrap">
        Intent Detected
      </p>
      <div className="flex flex-col gap-4 items-start w-full">
        {suggestions.map((suggestion, index) => (
          <ReplyButton
            key={index}
            text={suggestion}
            isPrimary={index === 0}
            onSelect={() => onSelectReply?.(suggestion)}
          />
        ))}
        <div className="flex items-center justify-center w-full">
          <button
            onClick={onRegenerate}
            className="w-12 h-12 flex items-center justify-center hover:bg-[#1f2937] rounded-full transition-colors"
            aria-label="Regenerate suggestions"
          >
            <RotateCcw className="w-6 h-6 text-[#9ca3af]" />
          </button>
        </div>
      </div>
    </div>
  );
}
