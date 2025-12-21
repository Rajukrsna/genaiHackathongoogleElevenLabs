import { Wifi, Signal, Battery } from 'lucide-react';

export function StatusBar() {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <div className="bg-[#0b1220] flex h-[52px] items-end justify-between px-6 py-2.5 w-full">
      <div className="flex flex-col justify-center font-medium text-sm text-white tracking-[0.14px]">
        <p className="leading-5">{currentTime}</p>
      </div>
      <div className="flex items-center gap-2">
        <Wifi className="w-4 h-4 text-white" />
        <Signal className="w-4 h-4 text-white" />
        <Battery className="w-4 h-4 text-white" />
      </div>
    </div>
  );
}
