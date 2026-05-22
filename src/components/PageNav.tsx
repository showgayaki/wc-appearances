type PageNavProps = {
  isAdminPage: boolean;
};

export function PageNav({ isAdminPage }: PageNavProps) {
  return (
    <nav className="page-nav" aria-label="ページ切り替え">
      <a className={!isAdminPage ? "active" : undefined} href="/">
        作成
      </a>
      <a className={isAdminPage ? "active" : undefined} href="/admin">
        管理
      </a>
    </nav>
  );
}
