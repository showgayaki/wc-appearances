import type { GeneratedProgram } from "../types";

type PublicProgramsProps = {
  items: GeneratedProgram[];
  loading: boolean;
  selectedProgramIds: Set<string>;
  onSelectedProgramIdsChange: (ids: Set<string>) => void;
};

export function PublicPrograms({ items, loading, selectedProgramIds, onSelectedProgramIdsChange }: PublicProgramsProps) {
  const toggleItem = (id: string) => {
    const nextIds = new Set(selectedProgramIds);
    if (nextIds.has(id)) {
      nextIds.delete(id);
    } else {
      nextIds.add(id);
    }
    onSelectedProgramIdsChange(nextIds);
  };

  return (
    <section className="list-panel">
      <div className="section-heading">
        <h2>出演番組選択</h2>
        <span>{loading ? "読み込み中" : `${items.length}件`}</span>
      </div>
      {items.length === 0 ? (
        <p className="empty">この期間の出演情報はありません。</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th className="check-column">選択</th>
                <th>日付</th>
                <th>時間</th>
                <th>局</th>
                <th>番組名</th>
                <th>種別</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="check-column">
                    <input
                      aria-label={`${item.programName}を出力対象にする`}
                      checked={selectedProgramIds.has(item.id)}
                      onChange={() => toggleItem(item.id)}
                      type="checkbox"
                    />
                  </td>
                  <td>{item.date}</td>
                  <td>
                    {item.startTime}〜{item.endTime}
                  </td>
                  <td>{item.stationName}</td>
                  <td>{item.programName}</td>
                  <td>{item.source === "regular" ? "レギュラー" : "ゲスト"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
