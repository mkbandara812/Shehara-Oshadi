"use client";

import { useEffect, useState } from "react";

interface RSVPEntry {
  name: string;
  phone: string;
  attending: string;
  guests: string;
  message: string;
  timestamp: string;
}

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "wedding2026";

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [entries, setEntries] = useState<RSVPEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "accept" | "decline">("all");
  const [inviteName, setInviteName] = useState("");
  const [invitePhone, setInvitePhone] = useState("");
  const [inviteGuests, setInviteGuests] = useState("2");
  const [generatedLink, setGeneratedLink] = useState("");
  const [generatedLinks, setGeneratedLinks] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"rsvps" | "links">("rsvps");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  const fetchRSVPs = async () => {
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (!scriptUrl || scriptUrl === "YOUR_NEW_GOOGLE_SCRIPT_URL_HERE" || scriptUrl === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
      setFetchError("Google Script URL is not configured in .env.local");
      return;
    }
    setLoading(true);
    setFetchError("");
    try {
      const [resRsvps, resLinks] = await Promise.all([
        fetch(`${scriptUrl}?action=get`),
        fetch(`${scriptUrl}?action=get_links`).catch(() => null)
      ]);
      const dataRsvps = await resRsvps.json();
      if (dataRsvps.status === "success" && Array.isArray(dataRsvps.data)) {
        setEntries(dataRsvps.data);
      }
      
      if (resLinks) {
        const dataLinks = await resLinks.json();
        if (dataLinks.status === "success" && Array.isArray(dataLinks.data)) {
          setGeneratedLinks(dataLinks.data);
        } else if (dataLinks.status === "ok") {
          setFetchError("⚠️ Your Google Apps Script is outdated! Please copy the latest google-apps-script.js code and Deploy as a NEW version to see your Generated Links.");
        }
      }
    } catch (e) {
      console.error(e);
      setFetchError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) fetchRSVPs();
  }, [authed]);

  const filtered = entries.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "accept" && e.attending.toLowerCase().includes("accept")) ||
      (filter === "decline" && e.attending.toLowerCase().includes("decline"));
    return matchSearch && matchFilter;
  });

  const totalAccepting = entries.filter((e) => e.attending.toLowerCase().includes("accept"));
  const totalGuests = totalAccepting.reduce((sum, e) => sum + (parseInt(e.guests) || 0), 0);
  const totalDeclined = entries.filter((e) => e.attending.toLowerCase().includes("decline")).length;

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6"
        style={{ background: "linear-gradient(160deg, #08080d 0%, #0d0d15 45%, #1a122f 100%)" }}
      >
        {/* Glow */}
        <div className="pointer-events-none fixed left-1/3 top-1/3 h-96 w-96 rounded-full bg-[#d4af37]/8 blur-[100px]" />

        <div className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-white/5 p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          {/* Lock icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 text-4xl">
            🔐
          </div>
          <p className="text-xs uppercase tracking-[0.5em] text-white/40">Admin Access</p>
          <h1 className="mt-3 font-serif text-4xl" style={{
            background: "linear-gradient(180deg, #fff0b2 0%, #d4af37 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            RSVP Dashboard
          </h1>
          <p className="mt-2 text-sm text-white/50">Enter the admin password to continue</p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-center text-white outline-none transition focus:border-[#d4af37]/60 focus:ring-1 focus:ring-[#d4af37]/30"
              autoFocus
            />
            {error && (
              <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#f1d98b] px-6 py-3.5 font-semibold text-black transition hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              Unlock Dashboard
            </button>
          </form>

          <a href="/" className="mt-6 inline-block text-xs text-white/30 hover:text-white/60 transition">
            ← Return to Invitation
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-10"
      style={{ background: "linear-gradient(160deg, #08080d 0%, #0d0d15 45%, #1a122f 100%)" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-white/40">Admin Panel</p>
            <h1 className="mt-1 font-serif text-4xl" style={{
              background: "linear-gradient(180deg, #fff0b2 0%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              RSVP Dashboard
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchRSVPs}
              disabled={loading}
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/70 transition hover:border-[#d4af37]/40 hover:text-[#f1d98b] disabled:opacity-50"
            >
              {loading ? "Refreshing..." : "🔄 Refresh"}
            </button>
            <a
              href="/"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
            >
              ← Invitation
            </a>
            <button
              onClick={() => setAuthed(false)}
              className="rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2.5 text-sm text-red-400 transition hover:bg-red-500/20"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total RSVPs", value: entries.length, icon: "📋", color: "from-[#d4af37]/20 to-[#d4af37]/5" },
            { label: "Attending", value: `${totalAccepting.length} (${totalGuests} guests)`, icon: "✅", color: "from-emerald-500/20 to-emerald-500/5" },
            { label: "Declined", value: totalDeclined, icon: "❌", color: "from-red-500/20 to-red-500/5" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-[24px] border border-white/10 bg-gradient-to-br ${stat.color} p-6 backdrop-blur-xl`}
            >
              <div className="mb-3 text-3xl">{stat.icon}</div>
              <div className="font-serif text-3xl text-white">{stat.value}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.3em] text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Invite Generator */}
        <div className="mb-8 rounded-[24px] border border-[#d4af37]/30 bg-[#d4af37]/5 p-6 backdrop-blur-xl">
          <h2 className="mb-4 font-serif text-2xl text-[#d4af37]">Generate Personalized Invite</h2>
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="mb-2 block text-xs uppercase tracking-widest text-[#d4af37]/70">Guest Name</label>
              <input type="text" value={inviteName} onChange={e => setInviteName(e.target.value)} placeholder="e.g. Nimal" className="w-full rounded-xl border border-[#d4af37]/20 bg-black/40 px-4 py-2.5 text-sm text-white outline-none focus:border-[#d4af37]/50" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="mb-2 block text-xs uppercase tracking-widest text-[#d4af37]/70">WhatsApp Number</label>
              <input type="text" value={invitePhone} onChange={e => setInvitePhone(e.target.value)} placeholder="e.g. 94771234567" className="w-full rounded-xl border border-[#d4af37]/20 bg-black/40 px-4 py-2.5 text-sm text-white outline-none focus:border-[#d4af37]/50" />
            </div>
            <div className="w-32">
              <label className="mb-2 block text-xs uppercase tracking-widest text-[#d4af37]/70">Max Guests</label>
              <input type="number" min="1" value={inviteGuests} onChange={e => setInviteGuests(e.target.value)} className="w-full rounded-xl border border-[#d4af37]/20 bg-black/40 px-4 py-2.5 text-sm text-white outline-none focus:border-[#d4af37]/50" />
            </div>
            <button
              onClick={async () => {
                if (!inviteName || !invitePhone) return;
                const payload = btoa(encodeURIComponent(JSON.stringify({ n: inviteName, p: invitePhone, g: inviteGuests })));
                const link = `${window.location.origin}/?i=${payload}`;
                setGeneratedLink(link);
                
                const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
                if (scriptUrl && scriptUrl !== "YOUR_NEW_GOOGLE_SCRIPT_URL_HERE" && scriptUrl !== "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
                  try {
                    await fetch(scriptUrl, {
                      method: "POST",
                      headers: { "Content-Type": "text/plain;charset=utf-8" },
                      body: JSON.stringify({ action: "generate", name: inviteName, phone: invitePhone, guests: inviteGuests, link: link })
                    });
                    fetchRSVPs(); // Automatically refresh the table
                  } catch (e) {
                    console.error("Failed to save to sheet", e);
                  }
                }
              }}
              className="rounded-xl bg-[#d4af37] px-6 py-2.5 text-sm font-bold text-black transition hover:bg-[#f1d98b]"
            >
              Generate Link
            </button>
          </div>
          
          {generatedLink && (
            <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <p className="mb-2 text-xs uppercase tracking-widest text-emerald-400">Link Generated Successfully</p>
              <div className="flex flex-wrap items-center gap-3">
                <input readOnly value={generatedLink} className="flex-1 min-w-[200px] rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/70 outline-none" />
                <button onClick={() => navigator.clipboard.writeText(generatedLink)} className="rounded-lg bg-white/10 px-4 py-2 text-xs text-white hover:bg-white/20">Copy</button>
                <a 
                  href={`https://wa.me/${invitePhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Dear ${inviteName},\n\nYou are warmly invited to our wedding!\nPlease view your personalized invitation and RSVP here:\n\n${generatedLink}`)}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500"
                >
                  Share on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="mb-8 flex border-b border-white/10">
          <button
            onClick={() => setActiveTab("rsvps")}
            className={`px-6 py-3 text-sm font-semibold uppercase tracking-widest transition-colors ${activeTab === "rsvps" ? "border-b-2 border-[#d4af37] text-[#d4af37]" : "text-white/40 hover:text-white/70"}`}
          >
            RSVPs
          </button>
          <button
            onClick={() => setActiveTab("links")}
            className={`px-6 py-3 text-sm font-semibold uppercase tracking-widest transition-colors ${activeTab === "links" ? "border-b-2 border-[#d4af37] text-[#d4af37]" : "text-white/40 hover:text-white/70"}`}
          >
            Generated Links
          </button>
        </div>

        {/* RSVPs Tab */}
        {activeTab === "rsvps" && (
          <>
            {/* Filters */}
            <div className="mb-5 flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white outline-none transition focus:border-[#d4af37]/50 min-w-[200px]"
          />
          {(["all", "accept", "decline"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-3 text-sm uppercase tracking-[0.2em] transition ${
                filter === f
                  ? "bg-gradient-to-r from-[#d4af37] to-[#f1d98b] text-black font-semibold"
                  : "border border-white/10 text-white/60 hover:border-white/30"
              }`}
            >
              {f === "all" ? "All" : f === "accept" ? "Accepting" : "Declined"}
            </button>
          ))}
        </div>

        {/* Error */}
        {fetchError && (
          <div className="mb-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-6 py-4 text-sm text-amber-300">
            ⚠️ {fetchError}
            <p className="mt-1 text-xs text-amber-400/60">
              Update your google-apps-script.js to support GET requests for the admin panel to show live data.
            </p>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="text-center">
              <div className="mb-3 text-3xl animate-spin">⟳</div>
              <p className="text-white/50">Loading RSVPs...</p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-16 text-center backdrop-blur-xl">
            <div className="mb-4 text-5xl">💌</div>
            <p className="text-white/50">
              {entries.length === 0
                ? "No RSVPs yet. Share your invitation link!"
                : "No results match your search."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    {["#", "Name", "Phone", "Attending", "Guests", "Message", "Submitted"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-4 text-left text-xs uppercase tracking-[0.3em] text-white/40"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((entry, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 transition hover:bg-white/5"
                    >
                      <td className="px-5 py-4 text-sm text-white/40">{i + 1}</td>
                      <td className="px-5 py-4 font-medium text-white">{entry.name}</td>
                      <td className="px-5 py-4 text-sm text-white/70">{entry.phone}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            entry.attending.toLowerCase().includes("accept")
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-red-500/15 text-red-400"
                          }`}
                        >
                          {entry.attending.toLowerCase().includes("accept") ? "✓ Accepting" : "✗ Declined"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-white/70">{entry.guests}</td>
                      <td className="max-w-[200px] px-5 py-4 text-sm text-white/50">{entry.message || "—"}</td>
                      <td className="px-5 py-4 text-xs text-white/40">
                        {entry.timestamp
                          ? new Date(entry.timestamp).toLocaleDateString("en-US", {
                              month: "short", day: "numeric", year: "numeric",
                              hour: "2-digit", minute: "2-digit",
                            })
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-white/10 px-5 py-4 text-xs text-white/30">
              Showing {filtered.length} of {entries.length} entries
            </div>
          </div>
        )}
          </>
        )}

        {/* Links Tab */}
        {activeTab === "links" && (
          <>
            {loading ? (
              <div className="flex h-40 items-center justify-center">
                <div className="text-center">
                  <div className="mb-3 text-3xl animate-spin">⟳</div>
                  <p className="text-white/50">Loading Links...</p>
                </div>
              </div>
            ) : generatedLinks.length === 0 ? (
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-16 text-center backdrop-blur-xl">
                <div className="mb-4 text-5xl">🔗</div>
                <p className="text-white/50">No generated links yet.</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        {["#", "Name", "Phone", "Max Guests", "Generated On", "Actions"].map((h) => (
                          <th key={h} className="px-5 py-4 text-left text-xs uppercase tracking-[0.3em] text-white/40">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {generatedLinks.map((entry, i) => (
                        <tr key={i} className="border-b border-white/5 transition hover:bg-white/5">
                          <td className="px-5 py-4 text-sm text-white/40">{i + 1}</td>
                          <td className="px-5 py-4 font-medium text-white">{entry.name}</td>
                          <td className="px-5 py-4 text-sm text-white/70">{entry.phone}</td>
                          <td className="px-5 py-4 text-sm text-white/70">{entry.guests}</td>
                          <td className="px-5 py-4 text-xs text-white/40">
                            {entry.timestamp ? new Date(entry.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                          </td>
                          <td className="px-5 py-4 text-xs">
                            <div className="flex gap-2">
                              <button onClick={() => navigator.clipboard.writeText(entry.link)} className="rounded-lg bg-white/10 px-3 py-1.5 text-white hover:bg-white/20">Copy Link</button>
                              <a href={`https://wa.me/${String(entry.phone || "").replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Dear ${entry.name},\n\nYou are warmly invited to our wedding!\nPlease view your personalized invitation and RSVP here:\n\n${entry.link}`)}`} target="_blank" rel="noreferrer" className="rounded-lg bg-emerald-600 px-3 py-1.5 font-bold text-white hover:bg-emerald-500">WhatsApp</a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="border-t border-white/10 px-5 py-4 text-xs text-white/30">Total Links: {generatedLinks.length}</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
