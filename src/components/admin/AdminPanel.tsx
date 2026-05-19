import type { GuestProgram, PostHeader, RegularProgram } from "../../types";
import { GuestProgramManager } from "./GuestProgramManager";
import { PostHeaderManager } from "./PostHeaderManager";
import { RegularProgramManager } from "./RegularProgramManager";

type AdminPanelProps = {
  guestPrograms: GuestProgram[];
  postHeaders: PostHeader[];
  regularPrograms: RegularProgram[];
  onChanged: () => void;
};

export function AdminPanel({ guestPrograms, postHeaders, regularPrograms, onChanged }: AdminPanelProps) {
  return (
    <section className="admin-panel">
      <h2>管理</h2>
      <div className="admin-grid">
        <RegularProgramManager items={regularPrograms} onChanged={onChanged} />
        <GuestProgramManager items={guestPrograms} onChanged={onChanged} />
        <PostHeaderManager items={postHeaders} onChanged={onChanged} />
      </div>
    </section>
  );
}
