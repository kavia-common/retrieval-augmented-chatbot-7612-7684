import React, { useRef, useState } from 'react';

/**
 * UploadPanel enables selecting files to be sent to backend for ingestion.
 */
const UploadPanel = ({ onUpload }) => {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const onChange = (e) => {
    const f = Array.from(e.target.files || []);
    setFiles(f);
  };

  const trigger = () => inputRef.current?.click();

  const doUpload = async () => {
    if (!files.length) return;
    await onUpload(files);
    setFiles([]);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <div className="panel-title" style={{ marginBottom: 8 }}>Documents</div>
      <div className="upload">
        <label className="upload-label" onClick={trigger}>
          📄 Choose files
          <input
            ref={inputRef}
            type="file"
            multiple
            onChange={onChange}
            accept=".pdf,.txt,.md,.html,.doc,.docx"
          />
        </label>
        <button className="btn" onClick={doUpload} disabled={!files.length}>
          ⬆ Upload {files.length ? `(${files.length})` : ''}
        </button>
      </div>
      {files.length > 0 && (
        <div className="small" style={{ marginTop: 8 }}>
          Selected: {files.map(f => f.name).join(', ')}
        </div>
      )}
      <div className="small" style={{ marginTop: 8, opacity: 0.8 }}>
        Supported: PDF, TXT, MD, HTML, DOC, DOCX
      </div>
    </div>
  );
};

export default UploadPanel;
