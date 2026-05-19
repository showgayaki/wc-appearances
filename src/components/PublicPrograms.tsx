import type { GeneratedProgram } from "../types";

type PublicProgramsProps = {
  items: GeneratedProgram[];
  loading: boolean;
};

export function PublicPrograms({ items, loading }: PublicProgramsProps) {
  return (
    <section className="list-panel">
      <div className="section-heading">
        <h2>出演データ一覧</h2>
        <span>{loading ? "読み込み中" : `${items.length}件`}</span>
      </div>
      {items.length === 0 ? (
        <p className="empty">この期間の出演情報はありません。</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>時間</th>
                <th>局名</th>
                <th>番組名</th>
                <th>種別</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>
                    {item.startTime}〜{item.endTime}
                  </td>
                  <td>{item.stationName}</td>
                  <td>{item.programName}</td>
                  <td>{item.source === "regular" ? "レギュラー" : "単発"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
