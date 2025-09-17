import React, { useCallback, useState } from 'react';

/**
 * ChatInput provides a multi-line textarea and send button.
 */
const ChatInput = ({ onSend, disabled }) => {
  const [value, setValue] = useState('');

  const handleSend = useCallback(() => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue('');
  }, [value, onSend, disabled]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="input" style={{ gridColumn: '1 / span 1' }}>
        <textarea
          aria-label="Ask a question"
          placeholder="Ask a question about your documents..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={handleSend}
        disabled={disabled || value.trim().length === 0}
        aria-label="Send message"
      >
        ➤ Send
      </button>
    </>
  );
};

export default ChatInput;
