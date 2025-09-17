import { useCallback, useMemo, useState } from 'react';
import { useApi } from '../services/ApiContext';
import { askQuestionApi, fetchContextApi, ingestDocumentsApi } from '../services/api';

/**
 * useChat manages messages, context chunks, and async actions.
 */
const useChat = () => {
  const { baseUrl } = useApi();
  const [messages, setMessages] = useState([]);
  const [contextChunks, setContextChunks] = useState([]);
  const [selectedContextIds, setSelectedContextIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const sources = useMemo(() => {
    const last = messages.slice().reverse().find((m) => m.role === 'assistant');
    return last?.sources || [];
  }, [messages]);

  const ask = useCallback(async (question) => {
    setError('');
    setIsLoading(true);
    const userMsg = {
      id: `m_${Date.now()}_u`,
      role: 'user',
      content: question,
    };
    setMessages((prev) => [...prev, userMsg]);
    try {
      // Fetch context from backend for this question
      const context = await fetchContextApi(baseUrl, question);
      setContextChunks(context);

      // Send question with selected context ids (if any) and conversation history
      const assistant = await askQuestionApi(baseUrl, {
        question,
        selectedContextIds,
        history: messages.concat([userMsg]).map(({ role, content }) => ({ role, content })),
      });

      setMessages((prev) => [...prev, assistant]);
    } catch (e) {
      setError(e?.message || 'Failed to ask question');
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl, messages, selectedContextIds]);

  const regenerateLast = useCallback(async () => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUser) return;
    await ask(lastUser.content);
  }, [messages, ask]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setContextChunks([]);
    setSelectedContextIds([]);
    setError('');
  }, []);

  const uploadDocuments = useCallback(async (files) => {
    setError('');
    try {
      await ingestDocumentsApi(baseUrl, files);
    } catch (e) {
      setError(e?.message || 'Failed to upload');
    }
  }, [baseUrl]);

  return {
    messages,
    contextChunks,
    selectedContextIds,
    isLoading,
    error,
    ask,
    regenerateLast,
    clearChat,
    uploadDocuments,
    setSelectedContextIds,
    sources,
  };
};

export default useChat;
