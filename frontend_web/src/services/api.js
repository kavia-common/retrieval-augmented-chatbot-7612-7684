function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function tryJson(res) {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

/**
 * Mock helpers
 */
function mockRetrievedContext(question) {
  const seed = question.slice(0, 18) || 'document';
  return [
    {
      id: 'ctx_1',
      score: Math.random(),
      source: 'manual.pdf',
      page: 4,
      title: 'User Guide',
      text: `Passage relevant to "${seed}" discussing setup and prerequisites.`,
    },
    {
      id: 'ctx_2',
      score: Math.random(),
      source: 'faq.md',
      page: 1,
      title: 'FAQ',
      text: `Frequently asked details around ${seed} including limitations and tips.`,
    },
    {
      id: 'ctx_3',
      score: Math.random(),
      source: 'release_notes.txt',
      page: 2,
      title: 'Release Notes',
      text: `Changes affecting ${seed} introduced in the latest version.`,
    },
  ];
}

function mockAssistantAnswer(question, context) {
  const joined = context.map(c => `• ${c.text}`).join('\n');
  return {
    id: `m_${Date.now()}_a`,
    role: 'assistant',
    content:
`Here's what I found based on your question:

Q: ${question}

Grounded answer (RAG):
- The documents suggest that ${question.toLowerCase()} should consider setup, limitations, and version-specific changes.

Supporting snippets:
${joined}

Let me know if you want to explore a specific source further.`,
    sources: context.map(c => ({
      id: c.id,
      title: `${c.title} (${c.source}${c.page !== undefined ? ` p.${c.page}` : ''})`,
      url: null,
    })),
  };
}

/**
 * Backend-aware fetch wrapper. If backend unavailable, fallback to mocks.
 */
async function backendOrMock(url, options, mockFn) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const payload = await tryJson(res);
      throw new Error(typeof payload === 'string' ? payload : (payload.message || 'Request failed'));
    }
    return await res.json();
  } catch (e) {
    // Fallback to mock
    return await mockFn(e);
  }
}

// PUBLIC_INTERFACE
export async function fetchContextApi(baseUrl, question) {
  const url = `${baseUrl}/api/retrieval/context`;
  return backendOrMock(
    url,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: question }),
    },
    async () => {
      await delay(400);
      return mockRetrievedContext(question);
    }
  );
}

// PUBLIC_INTERFACE
export async function askQuestionApi(baseUrl, payload) {
  const url = `${baseUrl}/api/chat/ask`;
  return backendOrMock(
    url,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    async () => {
      await delay(700);
      const context = mockRetrievedContext(payload.question);
      return mockAssistantAnswer(payload.question, context);
    }
  );
}

// PUBLIC_INTERFACE
export async function ingestDocumentsApi(baseUrl, files) {
  const url = `${baseUrl}/api/documents/ingest`;
  const form = new FormData();
  files.forEach((f) => form.append('files', f, f.name));

  try {
    const res = await fetch(url, { method: 'POST', body: form });
    if (!res.ok) {
      const payload = await tryJson(res);
      throw new Error(typeof payload === 'string' ? payload : (payload.message || 'Upload failed'));
    }
    return await res.json();
  } catch {
    // Mock success
    await delay(500);
    return { ok: true, count: files.length };
  }
}
