"use client";

import { FormEvent, useState, useEffect } from "react";
import { User, Phone, Users, MessageSquare, Send, Loader2 } from "lucide-react";

export default function RSVPForm({ guestName, guestPhone, maxGuests }: { guestName?: string; guestPhone?: string; maxGuests?: number }) {
  const initialState = {
    name: guestName || "",
    phone: guestPhone || "",
    attending: "Joyfully Accept",
    guests: maxGuests ? maxGuests.toString() : "1",
    message: "",
  };

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      name: guestName || prev.name,
      phone: guestPhone || prev.phone,
      guests: maxGuests ? maxGuests.toString() : prev.guests,
    }));
  }, [guestName, guestPhone, maxGuests]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setIsSuccess(false);

    // Check for duplicate submission using localStorage
    const submittedData = localStorage.getItem("wedding_rsvp_submissions");
    const submissions = submittedData ? JSON.parse(submittedData) : [];
    
    // Check if phone number OR name already submitted
    const isDuplicatePhone = submissions.some((sub: any) => sub.phone === form.phone);
    const isDuplicateName = submissions.some((sub: any) => sub.name.toLowerCase().trim() === form.name.toLowerCase().trim());
    
    if (isDuplicatePhone) {
      setLoading(false);
      setStatus("This phone number has already been used for RSVP. Each guest can only submit once.");
      setIsSuccess(false);
      return;
    }
    
    if (isDuplicateName) {
      setLoading(false);
      setStatus("This name has already been used for RSVP. Each guest can only submit once.");
      setIsSuccess(false);
      return;
    }

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if (!scriptUrl || scriptUrl === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
      setLoading(false);
      setStatus("Error: Please set up the Google Script URL in .env.local");
      return;
    }

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(form),
      });

      const text = await response.text();
      const result = text ? JSON.parse(text) : { status: "success" };

      if (result.status === "success") {
        // Store submission in localStorage to prevent duplicates
        submissions.push({ phone: form.phone, name: form.name, timestamp: new Date().toISOString() });
        localStorage.setItem("wedding_rsvp_submissions", JSON.stringify(submissions));
        
        setStatus("Thank you! Your RSVP was submitted successfully.");
        setIsSuccess(true);
        setForm(initialState);
      } else {
        setStatus(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Submission failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 md:p-12 relative overflow-hidden">
      {/* Decorative background vectors */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-[rgba(212,175,55,0.1)] to-transparent opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-[rgba(212,175,55,0.05)] to-transparent opacity-50 pointer-events-none" />

      <div className="grid gap-6 md:gap-8 md:grid-cols-2 relative z-10">
        <div className="group relative">
          <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#FFDF73]/50 transition-colors group-focus-within:text-[#D4AF37]">
            <User className="w-3.5 h-3.5" /> Full Name
          </label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full rounded-2xl border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.04)] px-5 py-4 text-sm text-[#FFDF73] outline-none transition-all placeholder:text-[#FFDF73]/30 focus:border-[#D4AF37] focus:bg-[rgba(212,175,55,0.08)] focus:shadow-[0_0_30px_rgba(212,175,55,0.4),0_0_60px_rgba(212,175,55,0.2)] focus:scale-[1.02]"
          />
        </div>
        
        <div className="group relative">
          <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#FFDF73]/50 transition-colors group-focus-within:text-[#D4AF37]">
            <Phone className="w-3.5 h-3.5" /> Phone Number
          </label>
          <input
            required
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+94 77 XXXXXXX"
            className="w-full rounded-2xl border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.04)] px-5 py-4 text-sm text-[#FFDF73] outline-none transition-all placeholder:text-[#FFDF73]/30 focus:border-[#D4AF37] focus:bg-[rgba(212,175,55,0.08)] focus:shadow-[0_0_30px_rgba(212,175,55,0.4),0_0_60px_rgba(212,175,55,0.2)] focus:scale-[1.02]"
          />
        </div>
        
        <div className="group relative">
          <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#FFDF73]/50 transition-colors group-focus-within:text-[#D4AF37]">
            Will you attend?
          </label>
          <div className="relative">
            <select
              name="attending"
              value={form.attending}
              onChange={handleChange}
              className="w-full appearance-none rounded-2xl border border-[rgba(212,175,55,0.3)] bg-[#050505] px-5 py-4 text-sm text-[#FFDF73] outline-none transition-all focus:border-[#D4AF37] focus:bg-[#0a0a0a] focus:shadow-[0_0_30px_rgba(212,175,55,0.4),0_0_60px_rgba(212,175,55,0.2)] focus:scale-[1.02]"
            >
              <option value="Joyfully Accept">Joyfully Accept</option>
              <option value="Regretfully Decline">Regretfully Decline</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center">
              <svg className="h-4 w-4 fill-[#FFDF73]/50" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
          </div>
        </div>
        
        <div className="group relative">
          <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#FFDF73]/50 transition-colors group-focus-within:text-[#D4AF37]">
            <Users className="w-3.5 h-3.5" /> Number of Guests
          </label>
          <input
            required
            min="1"
            max={maxGuests || 8}
            name="guests"
            type="number"
            value={form.guests}
            onChange={handleChange}
            readOnly={!!maxGuests}
            className="w-full rounded-2xl border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.04)] px-5 py-4 text-sm text-[#FFDF73] outline-none transition-all disabled:opacity-40 focus:border-[#D4AF37] focus:bg-[rgba(212,175,55,0.08)] focus:shadow-[0_0_30px_rgba(212,175,55,0.4),0_0_60px_rgba(212,175,55,0.2)] focus:scale-[1.02] read-only:opacity-60 read-only:cursor-not-allowed"
            disabled={form.attending === "Regretfully Decline"}
          />
        </div>
      </div>

      <div className="group relative mt-6 md:mt-8 z-10">
        <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#FFDF73]/50 transition-colors group-focus-within:text-[#D4AF37]">
          <MessageSquare className="w-3.5 h-3.5" /> Leave a Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={3}
          placeholder="Wishes for the beautiful couple..."
          className="w-full resize-none rounded-2xl border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.04)] px-5 py-4 text-sm text-[#FFDF73] outline-none transition-all placeholder:text-[#FFDF73]/30 focus:border-[#D4AF37] focus:bg-[rgba(212,175,55,0.08)] focus:shadow-[0_0_30px_rgba(212,175,55,0.4),0_0_60px_rgba(212,175,55,0.2)] focus:scale-[1.02]"
        />
      </div>

      <div className="mt-10 flex flex-col items-center z-10 relative">
        <button
          type="submit"
          disabled={loading}
          className="group flex w-full md:w-auto items-center justify-center gap-3 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#000000] transition-all hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(212,175,55,0.6),0_0_80px_rgba(212,175,55,0.3)] disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-70 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #B8860B 0%, #FFDF73 45%, #D4AF37 100%)' }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          
          {loading ? (
             <>
               <Loader2 className="w-4 h-4 animate-spin" /> Submitting
             </>
          ) : (
             <>
               <Send className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /> Send RSVP
             </>
          )}
        </button>

        {status && (
          <div className={`mt-6 w-full rounded-xl border px-5 py-3 text-center text-sm transition-all duration-500 ${isSuccess ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-[pulse_1s_ease-in-out_3]' : 'border-red-500/30 bg-[rgba(255,0,0,0.1)] text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]'}`}>
            {status}
          </div>
        )}
      </div>
    </form>
  );
}
