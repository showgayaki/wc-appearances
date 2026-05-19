import { FormEvent, useState } from "react";
import { deletePostHeader, savePostHeader } from "../../services/programs";
import type { PostHeader, PostHeaderInput } from "../../types";
import { ItemList } from "./ItemList";

const emptyPostHeader = (): PostHeaderInput => ({
  title: "🌈今週テレビ🌈",
});

const requireText = (value: string): string => value.trim();

type PostHeaderManagerProps = {
  items: PostHeader[];
  onChanged: () => void;
};

export function PostHeaderManager({ items, onChanged }: PostHeaderManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PostHeaderInput>(emptyPostHeader);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const payload: PostHeaderInput = {
      title: requireText(form.title),
    };

    if (!payload.title) {
      setError("未入力の項目があります。");
      return;
    }

    try {
      await savePostHeader(payload, editingId ?? undefined);
    } catch {
      setError("保存に失敗しました。");
      return;
    }

    setEditingId(null);
    setForm(emptyPostHeader());
    onChanged();
  };

  const edit = (item: PostHeader) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
    });
  };

  const remove = async (id: string) => {
    if (!window.confirm("この見出しを削除しますか？")) {
      return;
    }

    try {
      await deletePostHeader(id);
    } catch {
      setError("削除に失敗しました。");
      return;
    }

    onChanged();
  };

  return (
    <div className="manager">
      <h3>投稿見出し</h3>
      <form onSubmit={(event) => void submit(event)}>
        <label>
          見出し
          <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
        </label>
        <div className="button-row">
          <button type="submit">{editingId ? "更新" : "追加"}</button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyPostHeader());
              }}
            >
              キャンセル
            </button>
          )}
        </div>
        {error && <p className="error">{error}</p>}
      </form>
      <ItemList
        items={items.map((item) => ({
          id: item.id,
          label: item.title,
          muted: false,
          onEdit: () => edit(item),
          onDelete: () => void remove(item.id),
        }))}
      />
    </div>
  );
}
