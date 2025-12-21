import { useState } from 'react';
import {
  AppBar,
  CallerID,
  ListeningIndicator,
  TextInputBox,
  PauseButton,
  IncomingCard,
  IntentDetection,
} from '../components/call';

interface Message {
  id: string;
  text: string;
  type: 'incoming' | 'outgoing';
  timestamp: Date;
}

export default function CallPage() {
  const [callStatus, setCallStatus] = useState<'incoming' | 'active' | 'ended'>('incoming');
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleAcceptCall = () => {
    setCallStatus('active');
    setIsListening(true);
    // TODO: Start call handling logic
  };

  const handleRejectCall = () => {
    setCallStatus('ended');
    // TODO: End call logic and redirect
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    // TODO: Implement mute/unmute logic
  };

  const handlePause = () => {
    setIsListening(!isListening);
    // TODO: Implement pause/resume listening
  };

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      type: 'outgoing',
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    // TODO: Send message to backend for text-to-speech
  };

  const handleSelectReply = (reply: string) => {
    handleSendMessage(reply);
    setSuggestions([]); // Clear suggestions after selection
    // TODO: Convert to speech and play
  };

  const handleRegenerate = () => {
    // TODO: Request new suggestions from backend
  };

  // Simulate incoming message (replace with real WebSocket/API call)
  const simulateIncomingMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      type: 'incoming',
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    
    // Simulate intent detection with suggestions
    setSuggestions([
      'Enim nihil consequuntur alias eveniet commodi quisquam nulla est.',
      'Enim nihil consequuntur alias eveniet commodi quisquam nulla est.',
    ]);
  };

  return (
    <div className="bg-[#0b1220] min-h-screen w-full flex flex-col relative max-w-md mx-auto">
      {/* Caller ID */}
      <CallerID
        callerName="Customer 1"
        callerPhone="+91 7895455145"
        status={callStatus === 'incoming' ? 'incoming' : 'active'}
        onAccept={handleAcceptCall}
        onReject={handleRejectCall}
        onToggleMute={handleToggleMute}
        isMuted={isMuted}
      />

      {/* App Bar and Listening Indicator */}
      <div className="flex flex-col items-start w-full">
        <AppBar />
        <ListeningIndicator isListening={callStatus === 'active' && isListening} />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-2.5 py-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.type === 'incoming' ? (
              <IncomingCard message={message.text} />
            ) : (
              <div className="bg-[#111827] flex items-center justify-center px-4 py-3 rounded-[13px]">
                <p className="text-white text-base">{message.text}</p>
              </div>
            )}
          </div>
        ))}

        {/* Intent Detection with Suggestions */}
        {suggestions.length > 0 && (
          <IntentDetection
            suggestions={suggestions}
            onSelectReply={handleSelectReply}
            onRegenerate={handleRegenerate}
          />
        )}
      </div>

      {/* Bottom Controls */}
      <div className="sticky bottom-0 left-0 right-0 p-2.5 space-y-2">
        <div className="flex items-center gap-2">
          <PauseButton onPause={handlePause} />
        </div>
        <TextInputBox
          onSend={handleSendMessage}
          placeholder="Type message..."
        />
      </div>

      {/* Dev Button to simulate incoming message */}
      {callStatus === 'active' && messages.length === 0 && (
        <button
          onClick={() => simulateIncomingMessage('Iste sit soluta explicabo.\nSit placeat iusto id alias occaecati iste.\nQui provident quam deleniti facilis dolore ut quod ut.')}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Simulate Customer Speech
        </button>
      )}
    </div>
  );
}
