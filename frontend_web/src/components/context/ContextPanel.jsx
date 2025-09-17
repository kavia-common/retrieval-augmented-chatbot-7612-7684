import React, { useCallback } from 'react';

/**
 * ContextPanel lists retrieved context chunks with basic metadata.
 * Users can select/deselect chunks to be pinned for the next answer.
 */
const ContextPanel = ({ chunks, selectedIds, onToggle }) => {
  const toggle = useCallback((id) => {
    onToggle((prev) => {
      const set = new Set(prev);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return Array.from(set);
    });
  }, [onToggle]);

  if (!chunks || chunks.length === 0) {
    return <div className="small">No context yet. Ask a question to retrieve relevant passages.</div>;
  }

  return (
    <div className="context-list">
      {chunks.map((c) => {
        const isSelected = selectedIds.includes(c.id);
        return (
          <div key={c.id} className="context-item">
            <div className="row">
              <div className="context-title">{c.title || c.source || 'Context'}</div>
              <div className="spacer" />
              <button
                className="btn"
                onClick={() => toggle(c.id)}
                aria-pressed={isSelected}
              >
                {isSelected ? '📌 Pinned' : '📍 Pin'}
              </button>
            </div>
            <div className="small context-meta">
              <span className="badge">Score: {typeof c.score === 'number' ? c.score.toFixed(3) : '-'}</span>
              {c.source && <span className="badge">Source: {c.source}</span>}
              {c.page !== undefined && <span className="badge">Page: {c.page}</span>}
            </div>
            <div className="hr" />
            <div style={{ whiteSpace: 'pre-wrap' }}>{c.text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ContextPanel;
