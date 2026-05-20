import { FormEvent, useState } from "react";
import { deleteRegularProgram, saveRegularProgram } from "../../services/programs";
import type { ProgramInput, RegularProgram, Weekday } from "../../types";
import { getWeekdayLabel } from "../../utils/date";
import { ItemList } from "./ItemList";

const emptyRegularProgram: ProgramInput = {
  weekday: 1,
  start_time: "",
  end_time: "",
  station_name: "",
  program_name: "",
  is_active: true,
};

const toWeekday = (value: string): Weekday => {
  const weekday = Number(value);
  if (weekday === 0 || weekday === 1 || weekday === 2 || weekday === 3 || weekday === 4 || weekday === 5 || weekday === 6) {
    return weekday;
  }
  return 1;
};

const requireText = (value: string): string => value.trim();

type RegularProgramManagerProps = {
  items: RegularProgram[];
  onChanged: () => void;
};

export function RegularProgramManager({ items, onChanged }: RegularProgramManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProgramInput>(emptyRegularProgram);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const payload: ProgramInput = {
      ...form,
      start_time: requireText(form.start_time),
      end_time: requireText(form.end_time),
      station_name: requireText(form.station_name),
      program_name: requireText(form.program_name),
    };

    if (!payload.start_time || !payload.end_time || !payload.station_name || !payload.program_name) {
      setError("未入力の項目があります。");
      return;
    }

    try {
      await saveRegularProgram(payload, editingId ?? undefined);
    } catch {
      setError("保存に失敗しました。");
      return;
    }

    setEditingId(null);
    setForm(emptyRegularProgram);
    onChanged();
  };

  const edit = (item: RegularProgram) => {
    setEditingId(item.id);
    setForm({
      weekday: item.weekday,
      start_time: item.start_time,
      end_time: item.end_time,
      station_name: item.station_name,
      program_name: item.program_name,
      is_active: item.is_active,
    });
  };

  const remove = async (id: string) => {
    if (!window.confirm("このレギュラー番組を削除しますか？")) {
      return;
    }

    try {
      await deleteRegularProgram(id);
    } catch {
      setError("削除に失敗しました。");
      return;
    }

    onChanged();
  };

  return (
    <div className="manager">
      <h3>レギュラー番組</h3>
      <form onSubmit={(event) => void submit(event)}>
        <label>
          曜日
          <select value={form.weekday} onChange={(event) => setForm({ ...form, weekday: toWeekday(event.target.value) })}>
            {[0, 1, 2, 3, 4, 5, 6].map((weekday) => (
              <option key={weekday} value={weekday}>
                {getWeekdayLabel(weekday as Weekday)}
              </option>
            ))}
          </select>
        </label>
        <div className="form-row">
          <label>
            開始
            <input value={form.start_time} onChange={(event) => setForm({ ...form, start_time: event.target.value })} placeholder="26:20" />
          </label>
          <label>
            終了
            <input value={form.end_time} onChange={(event) => setForm({ ...form, end_time: event.target.value })} placeholder="26:45" />
          </label>
        </div>
        <label>
          局
          <input value={form.station_name} onChange={(event) => setForm({ ...form, station_name: event.target.value })} />
        </label>
        <label>
          番組名
          <input value={form.program_name} onChange={(event) => setForm({ ...form, program_name: event.target.value })} />
        </label>
        <label className="checkbox-label">
          <input
            checked={form.is_active}
            onChange={(event) => setForm({ ...form, is_active: event.target.checked })}
            type="checkbox"
          />
          有効
        </label>
        <div className="button-row">
          <button type="submit">{editingId ? "更新" : "追加"}</button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyRegularProgram);
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
          label: `${getWeekdayLabel(item.weekday)} ${item.start_time}〜${item.end_time} ${item.station_name}「${item.program_name}」`,
          muted: !item.is_active,
          onEdit: () => edit(item),
          onDelete: () => void remove(item.id),
        }))}
      />
    </div>
  );
}
