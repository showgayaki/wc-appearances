import { APP_TITLE } from "@/constants/app";
import { AuthPanel } from "@/components/AuthPanel";
import { PageNav } from "@/components/PageNav";

type AppHeaderProps = {
  isAdminPage: boolean;
  isLoggedIn: boolean;
  onLoggedIn: () => void;
  onLoggedOut: () => void;
};

export function AppHeader({ isAdminPage, isLoggedIn, onLoggedIn, onLoggedOut }: AppHeaderProps) {
  return (
    <header className="page-header">
      <div className="page-header-inner">
        <div>
          <h1 className="app-title">
            <a href="/">
              <img className="app-title-icon" src="/favicon.svg" alt="" aria-hidden="true" />
              <span>{APP_TITLE}</span>
            </a>
          </h1>
        </div>
        <PageNav isAdminPage={isAdminPage} />
        <AuthPanel isLoggedIn={isLoggedIn} onLoggedIn={onLoggedIn} onLoggedOut={onLoggedOut} />
      </div>
    </header>
  );
}
