type DateRangeToolbarProps = {
  startDate: string;
  endDate: string;
  loading: boolean;
  canReload: boolean;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onReload: () => void;
};

export function DateRangeToolbar({
  startDate,
  endDate,
  loading,
  canReload,
  onStartDateChange,
  onEndDateChange,
  onReload,
}: DateRangeToolbarProps) {
  return (
    <section className="toolbar" aria-label="期間選択">
      <label>
        開始日
        <input type="date" value={startDate} onChange={(event) => onStartDateChange(event.target.value)} />
      </label>
      <label>
        終了日
        <input type="date" value={endDate} onChange={(event) => onEndDateChange(event.target.value)} />
      </label>
      <button type="button" onClick={onReload} disabled={!canReload || loading}>
        再読み込み
      </button>
    </section>
  );
}
