import React from 'react';

/**
 * ChatHistory renders messages in sequence.
 */
const ChatHistory = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return (
      <div className="small" style={{ opacity: 0.8 }}>
        Ask anything about your documents. We will retrieve relevant context from the vector database and ground the answer.
      </div>
    );
  }

  return (
    <>
      {messages.map((m) => (
        <div className={`message ${m.role}`} key={m.id}>
          <div className="avatar" aria-hidden="true">
            {m.role === 'user' ? '🧑' : '🤖'}
          </div>
          <div className="message-bubble">
            <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
            {m.sources && m.sources.length > 0 && (
              <div className="small" style={{ marginTop: 8 }}>
                Sources:{' '}
                {m.sources.map((s, i) => (
                  <a
                    key={`${m.id}-src-${i}`}
                    className="App-link"
                    href={s.url || '#'}
                    target={s.url ? '_blank' : undefined}
                    rel="noreferrer"
                    style={{ marginRight: 8 }}
                  >
                    {s.title || s.id || `#${i + 1}`}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatHistory;
