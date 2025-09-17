import React from 'react';
import ChatPanel from './chat/ChatPanel';
import ContextPanel from './context/ContextPanel';
import UploadPanel from './upload/UploadPanel';
import useChat from '../hooks/useChat';

/**
 * ChatPage composes the main RAG UI: chat, context, upload.
 */
const ChatPage = () => {
  const {
    messages,
    contextChunks,
    isLoading,
    error,
    ask,
    regenerateLast,
    clearChat,
    uploadDocuments,
    setSelectedContextIds,
    selectedContextIds,
    sources,
  } = useChat();

  return (
    <div className="page">
      <div className="grid">
        <div className="panel" aria-label="Chat area">
          <div className="panel-header">
            <div className="panel-title">Conversation</div>
            <div className="row">
              <span className="badge" title="Sources included in last answer">
                📚 Sources: {sources.length}
              </span>
              <button className="btn" onClick={regenerateLast} disabled={messages.length === 0 || isLoading}>
                ↻ Regenerate
              </button>
              <button className="btn" onClick={clearChat} disabled={messages.length === 0 || isLoading}>
                🧹 Clear
              </button>
            </div>
          </div>
          <div className="panel-body">
            <ChatPanel
              messages={messages}
              isLoading={isLoading}
              error={error}
              onSend={ask}
            />
          </div>
        </div>

        <div className="panel" aria-label="Context and documents">
          <div className="panel-header">
            <div className="panel-title">Retrieval Context</div>
            <div className="row">
              <span className="badge">🔎 Retrieved: {contextChunks.length}</span>
              <span className="badge">🧠 RAG</span>
            </div>
          </div>
          <div className="panel-body">
            <ContextPanel
              chunks={contextChunks}
              selectedIds={selectedContextIds}
              onToggle={setSelectedContextIds}
            />
            <div className="hr" />
            <UploadPanel onUpload={uploadDocuments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
