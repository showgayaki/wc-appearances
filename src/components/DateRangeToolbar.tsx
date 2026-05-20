type DateRangeToolbarProps = {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
};

export function DateRangeToolbar({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangeToolbarProps) {
  return (
    <section className="toolbar" aria-label="期間選択">
      <div className="date-range-row">
        <label>
          開始日
          <input type="date" value={startDate} onChange={(event) => onStartDateChange(event.target.value)} />
        </label>
        <span className="range-separator">〜</span>
        <label>
          終了日
          <input type="date" value={endDate} onChange={(event) => onEndDateChange(event.target.value)} />
        </label>
      </div>
    </section>
  );
}
