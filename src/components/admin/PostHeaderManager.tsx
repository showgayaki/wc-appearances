import { FormEvent, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { deletePostHeader, savePostHeader } from "../../services/programs";
import type { PostHeader, PostHeaderInput } from "../../types";
import { AdminEditModal } from "./AdminEditModal";

const emptyPostHeader = (): PostHeaderInput => ({
  title: "",
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(false);
    onChanged();
  };

  const edit = (item: PostHeader) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
    });
    setError("");
    setIsModalOpen(true);
  };

  const create = () => {
    setEditingId(null);
    setForm(emptyPostHeader());
    setError("");
    setIsModalOpen(true);
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

    setEditingId(null);
    setForm(emptyPostHeader());
    setIsModalOpen(false);
    onChanged();
  };

  return (
    <div className="manager">
      <div className="manager-heading">
        <h3>投稿見出し</h3>
        <button type="button" onClick={create}>
          追加
        </button>
      </div>
      {items.length === 0 ? (
        <p className="empty">まだ登録がありません。</p>
      ) : (
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="sticky-action-column"></th>
                <th>見出し</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="sticky-action-column">
                    <button type="button" className="icon-button" aria-label={`${item.title}を編集`} onClick={() => edit(item)}>
                      <FiEdit aria-hidden="true" />
                    </button>
                  </td>
                  <td>{item.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isModalOpen && (
        <AdminEditModal title={editingId ? "投稿見出しを編集" : "投稿見出しを追加"} onClose={() => setIsModalOpen(false)}>
          <form className="admin-modal-form" onSubmit={(event) => void submit(event)}>
            <label>
              見出し
              <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
            </label>
            <div className="button-row">
              <button type="submit">{editingId ? "更新" : "追加"}</button>
              {editingId && (
                <button type="button" onClick={() => void remove(editingId)}>
                  削除
                </button>
              )}
            </div>
            {error && <p className="error">{error}</p>}
          </form>
        </AdminEditModal>
      )}
    </div>
  );
}
