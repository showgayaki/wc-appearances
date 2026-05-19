import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { AdminPanel } from "./components/admin/AdminPanel";
import { AuthPanel } from "./components/AuthPanel";
import { DateRangeToolbar } from "./components/DateRangeToolbar";
import { GeneratedTextPanel } from "./components/GeneratedTextPanel";
import { PublicPrograms } from "./components/PublicPrograms";
import { isSupabaseConfigured, supabase } from "./lib/supabase";
import { loadProgramData } from "./services/programs";
import type { GuestProgram, PostHeader, RegularProgram } from "./types";
import { getDefaultEndYmd, getTodayYmd } from "./utils/date";
import { buildGeneratedPrograms, findPostTitle, generateProgramText } from "./utils/generateText";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [regularPrograms, setRegularPrograms] = useState<RegularProgram[]>([]);
  const [guestPrograms, setGuestPrograms] = useState<GuestProgram[]>([]);
  const [postHeaders, setPostHeaders] = useState<PostHeader[]>([]);
  const [startDate, setStartDate] = useState(getTodayYmd);
  const [endDate, setEndDate] = useState(getDefaultEndYmd);
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const isLoggedIn = session !== null;

  const generatedItems = useMemo(
    () => buildGeneratedPrograms(regularPrograms, guestPrograms, startDate, endDate),
    [regularPrograms, guestPrograms, startDate, endDate],
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    setMessage("");

    try {
      const data = await loadProgramData();
      setRegularPrograms(data.regularPrograms);
      setGuestPrograms(data.guestPrograms);
      setPostHeaders(data.postHeaders);
    } catch {
      setMessage("データの読み込みに失敗しました。Supabase設定とRLSを確認してください。");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const initialize = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      await loadData();
    };

    void initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadData]);

  useEffect(() => {
    const title = findPostTitle(postHeaders);
    setGeneratedText(generateProgramText(title, generatedItems));
  }, [generatedItems, postHeaders]);

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">wc-appearances</p>
          <h1>テレビ出演情報</h1>
        </div>
        <AuthPanel isLoggedIn={isLoggedIn} onLoggedOut={() => setSession(null)} />
      </header>

      {!isSupabaseConfigured && (
        <section className="notice">
          <strong>Supabase設定が必要です。</strong>
          <span>.env.localにVITE_SUPABASE_URLとVITE_SUPABASE_ANON_KEYを設定してください。</span>
        </section>
      )}

      {message && <p className="notice">{message}</p>}

      <DateRangeToolbar
        startDate={startDate}
        endDate={endDate}
        loading={loading}
        canReload={isSupabaseConfigured}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onReload={() => void loadData()}
      />

      <GeneratedTextPanel generatedText={generatedText} onGeneratedTextChange={setGeneratedText} />

      <PublicPrograms items={generatedItems} loading={loading} />

      {isLoggedIn && (
        <AdminPanel
          guestPrograms={guestPrograms}
          postHeaders={postHeaders}
          regularPrograms={regularPrograms}
          onChanged={() => void loadData()}
        />
      )}
    </main>
  );
}
