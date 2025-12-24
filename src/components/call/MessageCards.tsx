import { Volume2, Undo2 } from 'lucide-react';

export interface Message {
  id: string;
  text: string;
  type: 'incoming' | 'outgoing';
  timestamp: Date;
}

interface IncomingCardProps {
  message: string;
}

export function IncomingCard({ message }: IncomingCardProps) {
  return (
    <div className="bg-[#111827] flex items-center justify-center px-4 py-3 rounded-[13px] w-full">
      <p className="text-[#e5e7eb] text-2xl whitespace-pre-wrap">
        {message}
      </p>
    </div>
  );
}

interface OutgoingCardProps {
  message: string;
  isSecondary?: boolean;
  canUndo?: boolean;
  onUndo?: () => void;
}

export function OutgoingCard({ message, isSecondary = false, canUndo = false, onUndo }: OutgoingCardProps) {
  return (
    <div className="bg-[#111827] flex flex-col gap-1.5 items-end px-4 py-3 rounded-[13px] w-full">
      <p className={`text-lg text-right whitespace-pre-wrap w-full ${isSecondary ? 'text-[#9ca3af]' : 'text-white'}`}>
        {message}
      </p>
      {canUndo && (
        <button
          onClick={onUndo}
          className="flex items-center justify-center p-1 w-12 h-12 hover:bg-[#1f2937] rounded-full transition-colors"
          aria-label="Undo this response"
        >
          <Undo2 className="w-4 h-4 text-[#9ca3af]" />
        </button>
      )}
    </div>
  );
}

interface IntroMessageProps {
  message?: string;
}

export function IntroMessage({ message }: IntroMessageProps) {
  const defaultMessage = 
    "Hello. I'm using an assistive communication app to respond. Please speak one sentence at a time and pause so I can reply accurately. Thank you for your patience.";

  return (
    <div className="bg-[#111827] flex items-center justify-center px-4 py-3 rounded-[13px] w-full">
      <p className="text-[#9ca3af] text-lg text-right whitespace-pre-wrap">
        {message || defaultMessage}
      </p>
    </div>
  );
}

interface ReplyButtonProps {
  text: string;
  isPrimary?: boolean;
  onSelect?: () => void;
}

export function ReplyButton({ text, isPrimary = false, onSelect }: ReplyButtonProps) {
  return (
    <button
      onClick={onSelect}
      className={`flex gap-2.5 items-center justify-center px-4 py-3 rounded-[13px] shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] w-full transition-all hover:scale-[1.02] ${
        isPrimary ? 'bg-[#2563eb] text-white' : 'bg-[#1f2937] text-[#9ca3af]'
      }`}
    >
      <Volume2 className="w-12 h-12" />
      <p className="text-base flex-1 text-left whitespace-pre-wrap">
        {text}
      </p>
    </button>
  );
}
