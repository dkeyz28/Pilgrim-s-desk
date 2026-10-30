import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { Check, LogOut, RefreshCw, ShieldCheck, Star, Trash2, X } from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type Review = {
  id: string;
  name: string;
  email: string;
  service: string;
  rating: number;
  review: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | "all">("pending");
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const loadReviews = useCallback(async () => {
    setLoading(true);
    setActionError("");
    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, email, service, rating, review, status, created_at")
      .order("created_at", { ascending: false });
    if (error) setActionError(error.message);
    else setReviews((data ?? []) as Review[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    async function verifyAdmin() {
      if (!session) {
        setIsAdmin(null);
        return;
      }
      const { data, error } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", session.user.id)
        .maybeSingle();
      if (!active) return;
      setIsAdmin(!error && Boolean(data));
      if (!error && data) void loadReviews();
    }
    void verifyAdmin();
    return () => { active = false; };
  }, [session, loadReviews]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setLoginError(error.message);
  }

  async function updateReview(id: string, status: "approved" | "rejected") {
    setActionError("");
    const { error } = await supabase
      .from("reviews")
      .update({ status, reviewed_at: new Date().toISOString() })
      .eq("id", id);
    if (error) setActionError(error.message);
    else await loadReviews();
  }

  async function deleteReview(id: string) {
    if (!window.confirm("Permanently delete this review?")) return;
    setActionError("");
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) setActionError(error.message);
    else await loadReviews();
  }

  async function logout() {
    await supabase.auth.signOut();
    setReviews([]);
  }

  const visibleReviews = filter === "all" ? reviews : reviews.filter((review) => review.status === filter);
  const counts = {
    pending: reviews.filter((review) => review.status === "pending").length,
    approved: reviews.filter((review) => review.status === "approved").length,
    rejected: reviews.filter((review) => review.status === "rejected").length,
  };

  if (checkingSession) {
    return <div className="grid min-h-screen place-items-center bg-[#f7f7f4] text-sm text-slate-500">Checking your session…</div>;
  }

  if (!isSupabaseConfigured) {
    return <div className="grid min-h-screen place-items-center bg-[#f7f7f4] px-4 text-center text-sm text-red-700">Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables, then restart the app.</div>;
  }

  if (!session) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7f7f4] px-4 py-12 text-slate-900">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-slate-900 text-white"><ShieldCheck /></div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Pilgrim's desk</p>
          <h1 className="mt-2 text-2xl font-semibold">Admin sign in</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in with the admin account registered in your Supabase project.</p>
          <label className="mt-6 block text-sm font-medium">Email</label>
          <input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-700" />
          <label className="mt-4 block text-sm font-medium">Password</label>
          <input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-700" />
          {loginError && <p role="alert" className="mt-4 text-sm text-red-600">{loginError}</p>}
          <button className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700">Sign in</button>
          <a href="/" className="mt-5 block text-center text-sm text-slate-500 hover:text-slate-900">Return to website</a>
        </form>
      </main>
    );
  }

  if (isAdmin === false) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7f7f4] px-4 text-center text-slate-900">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold">Admin access required</h1>
          <p className="mt-2 text-sm text-slate-500">This account is signed in, but it has not been registered in the Supabase admin_users table.</p>
          <button onClick={() => void logout()} className="mt-5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">Sign out</button>
        </div>
      </main>
    );
  }

  if (isAdmin === null) {
    return <div className="grid min-h-screen place-items-center bg-[#f7f7f4] text-sm text-slate-500">Verifying administrator access…</div>;
  }

  return (
    <main className="min-h-screen bg-[#f7f7f4] px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Pilgrim's desk</p><h1 className="mt-1 text-2xl font-semibold">Review management</h1><p className="mt-1 text-sm text-slate-500">Review visitor feedback before it appears publicly.</p></div>
          <div className="flex items-center gap-2"><button onClick={() => void loadReviews()} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50"><RefreshCw size={16} /> Refresh</button><button onClick={() => void logout()} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700"><LogOut size={16} /> Sign out</button></div>
        </header>

        <section className="mt-7 grid gap-3 sm:grid-cols-3">
          {(["pending", "approved", "rejected"] as const).map((status) => <div key={status} className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-sm capitalize text-slate-500">{status} reviews</p><p className="mt-2 text-3xl font-semibold">{counts[status]}</p></div>)}
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg font-semibold">Submitted reviews</h2><div className="flex flex-wrap gap-2">{(["pending", "approved", "rejected", "all"] as const).map((status) => <button key={status} onClick={() => setFilter(status)} className={`rounded-full px-3 py-1.5 text-sm capitalize ${filter === status ? "bg-slate-900 text-white" : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50"}`}>{status}</button>)}</div></div>
          {actionError && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{actionError}</p>}
          {loading ? <p className="py-12 text-center text-sm text-slate-500">Loading reviews…</p> : visibleReviews.length === 0 ? <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">No {filter === "all" ? "reviews" : `${filter} reviews`} found.</div> : <div className="mt-4 grid gap-4">{visibleReviews.map((review) => <article key={review.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold">{review.name}</h3><p className="mt-1 text-xs text-slate-500">{review.email} · {review.service || "General feedback"} · {new Date(review.created_at).toLocaleDateString()}</p></div><span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${review.status === "pending" ? "bg-amber-50 text-amber-800" : review.status === "approved" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}>{review.status}</span></div><div className="mt-3 flex items-center gap-1 text-amber-500" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill={index < review.rating ? "currentColor" : "none"} />)}</div><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">{review.review}</p><div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">{review.status !== "approved" && <button onClick={() => void updateReview(review.id, "approved")} className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-800"><Check size={14} /> Approve</button>}{review.status !== "rejected" && <button onClick={() => void updateReview(review.id, "rejected")} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"><X size={14} /> Reject</button>}<button onClick={() => void deleteReview(review.id)} className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"><Trash2 size={14} /> Delete</button></div></article>)}</div>}
        </section>
      </div>
    </main>
  );
}
