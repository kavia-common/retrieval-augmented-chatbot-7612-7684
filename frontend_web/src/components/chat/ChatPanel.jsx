import React, { useCallback, useEffect, useRef } from 'react';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';

/**
 * ChatPanel renders chat history and input composer.
 */
const ChatPanel = ({ messages, isLoading, error, onSend }) => {
  const listRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  return (
    <>
      <div className="chat-history" ref={listRef} aria-live="polite">
        <ChatHistory messages={messages} />
        {isLoading && (
          <div className="message assistant">
            <div className="avatar">🤖</div>
            <div className="message-bubble">
              <div className="small">Thinking…</div>
              <progress style={{ width: '100%' }} />
            </div>
          </div>
        )}
        {error && (
          <div className="message assistant">
            <div className="avatar">❗</div>
            <div className="message-bubble" role="alert">
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}
      </div>
      <div className="composer">
        <ChatInput onSend={onSend} disabled={isLoading} />
        <div className="row">
          <kbd>Shift</kbd> + <kbd>Enter</kbd> for newline
        </div>
      </div>
    </>
  );
};

export default ChatPanel;
