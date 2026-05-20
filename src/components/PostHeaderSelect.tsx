import type { PostHeader } from "../types";

type PostHeaderSelectProps = {
  postHeaders: PostHeader[];
  selectedPostHeaderId: string;
  onSelectedPostHeaderIdChange: (value: string) => void;
};

export function PostHeaderSelect({ postHeaders, selectedPostHeaderId, onSelectedPostHeaderIdChange }: PostHeaderSelectProps) {
  return (
    <section className="header-select-panel">
      <label>
        投稿見出し
        <select value={selectedPostHeaderId} onChange={(event) => onSelectedPostHeaderIdChange(event.target.value)}>
          <option value="">なし</option>
          {postHeaders.map((header) => (
            <option key={header.id} value={header.id}>
              {header.title}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}
