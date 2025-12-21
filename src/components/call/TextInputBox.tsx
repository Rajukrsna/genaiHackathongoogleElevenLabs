import { useState } from 'react';

interface TextInputBoxProps {
  onSend?: (text: string) => void;
  placeholder?: string;
}

export function TextInputBox({ onSend, placeholder = 'Type message...' }: TextInputBoxProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() && onSend) {
      onSend(text);
      setText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-[#111827] border border-[#111827] flex gap-4 h-12 items-center justify-end px-4 py-3 rounded-[13px] w-full">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[#9ca3af] text-2xl outline-none placeholder:text-[#9ca3af]"
      />
      <button 
        onClick={handleSend}
        disabled={!text.trim()}
        className="w-12 h-12 flex items-center justify-center disabled:opacity-50"
        aria-label="Send message"
      >
        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 16V0L19 8L0 16ZM2 13L13.85 8L2 3V6.5L8 8L2 9.5V13ZM2 13V8V3V6.5V9.5V13Z" fill="#9CA3AF"/>
        </svg>
      </button>
    </div>
  );
}
