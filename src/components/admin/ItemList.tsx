type ItemListItem = {
  id: string;
  label: string;
  muted: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

type ItemListProps = {
  items: ItemListItem[];
};

export function ItemList({ items }: ItemListProps) {
  if (items.length === 0) {
    return <p className="empty">まだ登録がありません。</p>;
  }

  return (
    <ul className="item-list">
      {items.map((item) => (
        <li key={item.id} className={item.muted ? "muted" : undefined}>
          <span>{item.label}</span>
          <div className="button-row compact">
            <button type="button" onClick={item.onEdit}>
              編集
            </button>
            <button type="button" onClick={item.onDelete}>
              削除
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
