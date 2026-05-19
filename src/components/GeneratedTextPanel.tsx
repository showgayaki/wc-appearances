import { useState } from "react";

type GeneratedTextPanelProps = {
  generatedText: string;
  onGeneratedTextChange: (value: string) => void;
};

export function GeneratedTextPanel({ generatedText, onGeneratedTextChange }: GeneratedTextPanelProps) {
  const [copyStatus, setCopyStatus] = useState("");

  const copyText = async () => {
    await navigator.clipboard.writeText(generatedText);
    setCopyStatus("コピーしました");
    window.setTimeout(() => setCopyStatus(""), 1800);
  };

  return (
    <section className="text-panel">
      <div className="section-heading">
        <h2>生成テキスト</h2>
        <button type="button" onClick={() => void copyText()} disabled={generatedText.length === 0}>
          コピー
        </button>
      </div>
      <textarea
        value={generatedText}
        onChange={(event) => onGeneratedTextChange(event.target.value)}
        rows={14}
        aria-label="生成された出演情報テキスト"
      />
      {copyStatus && <p className="status">{copyStatus}</p>}
    </section>
  );
}
