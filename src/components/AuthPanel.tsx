import { FormEvent, useState } from "react";
import { isLoginConfigured, loginEmail, loginId, supabase } from "../lib/supabase";

type AuthPanelProps = {
  isLoggedIn: boolean;
  onLoggedOut: () => void;
};

export function AuthPanel({ isLoggedIn, onLoggedOut }: AuthPanelProps) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!isLoginConfigured) {
      setError("ログインID設定が不足しています。");
      return;
    }

    if (userId.trim() !== loginId) {
      setError("IDまたはパスワードが違います。");
      return;
    }

    setSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password,
    });
    setSubmitting(false);

    if (signInError) {
      setError("IDまたはパスワードが違います。");
      return;
    }

    setPassword("");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    onLoggedOut();
  };

  if (isLoggedIn) {
    return (
      <div className="auth-box">
        <span>管理者ログイン中</span>
        <button type="button" onClick={() => void signOut()}>
          ログアウト
        </button>
      </div>
    );
  }

  return (
    <form className="auth-box auth-form" onSubmit={(event) => void signIn(event)}>
      <input value={userId} onChange={(event) => setUserId(event.target.value)} placeholder="ID" autoComplete="username" />
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="PASS"
        type="password"
        autoComplete="current-password"
      />
      <button type="submit" disabled={submitting}>
        ログイン
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
