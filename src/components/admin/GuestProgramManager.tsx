import { FormEvent, useState } from "react";
import { deleteGuestProgram, saveGuestProgram } from "../../services/programs";
import type { GuestProgram, GuestProgramInput } from "../../types";
import { getTodayYmd } from "../../utils/date";
import { ItemList } from "./ItemList";

const emptyGuestProgram = (): GuestProgramInput => ({
  program_date: getTodayYmd(),
  start_time: "",
  end_time: "",
  station_name: "",
  program_name: "",
});

const requireText = (value: string): string => value.trim();

type GuestProgramManagerProps = {
  items: GuestProgram[];
  onChanged: () => void;
};

export function GuestProgramManager({ items, onChanged }: GuestProgramManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<GuestProgramInput>(emptyGuestProgram);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const payload: GuestProgramInput = {
      program_date: form.program_date,
      start_time: requireText(form.start_time),
      end_time: requireText(form.end_time),
      station_name: requireText(form.station_name),
      program_name: requireText(form.program_name),
    };

    if (!payload.program_date || !payload.start_time || !payload.end_time || !payload.station_name || !payload.program_name) {
      setError("未入力の項目があります。");
      return;
    }

    try {
      await saveGuestProgram(payload, editingId ?? undefined);
    } catch {
      setError("保存に失敗しました。");
      return;
    }

    setEditingId(null);
    setForm(emptyGuestProgram());
    onChanged();
  };

  const edit = (item: GuestProgram) => {
    setEditingId(item.id);
    setForm({
      program_date: item.program_date,
      start_time: item.start_time,
      end_time: item.end_time,
      station_name: item.station_name,
      program_name: item.program_name,
    });
  };

  const remove = async (id: string) => {
    if (!window.confirm("この単発出演を削除しますか？")) {
      return;
    }

    try {
      await deleteGuestProgram(id);
    } catch {
      setError("削除に失敗しました。");
      return;
    }

    onChanged();
  };

  return (
    <div className="manager">
      <h3>単発出演</h3>
      <form onSubmit={(event) => void submit(event)}>
        <label>
          日付
          <input type="date" value={form.program_date} onChange={(event) => setForm({ ...form, program_date: event.target.value })} />
        </label>
        <div className="form-row">
          <label>
            開始
            <input value={form.start_time} onChange={(event) => setForm({ ...form, start_time: event.target.value })} placeholder="24:45" />
          </label>
          <label>
            終了
            <input value={form.end_time} onChange={(event) => setForm({ ...form, end_time: event.target.value })} placeholder="25:15" />
          </label>
        </div>
        <label>
          局名
          <input value={form.station_name} onChange={(event) => setForm({ ...form, station_name: event.target.value })} />
        </label>
        <label>
          番組名
          <input value={form.program_name} onChange={(event) => setForm({ ...form, program_name: event.target.value })} />
        </label>
        <div className="button-row">
          <button type="submit">{editingId ? "更新" : "追加"}</button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyGuestProgram());
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
          label: `${item.program_date} ${item.start_time}〜${item.end_time} ${item.station_name}「${item.program_name}」`,
          muted: false,
          onEdit: () => edit(item),
          onDelete: () => void remove(item.id),
        }))}
      />
    </div>
  );
}
