'use client';

import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import toast from 'react-hot-toast';


const CONTACT_EMAIL = 'support@fixitnow.com';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in your name, email, and message');
      return;
    }

    // No backend needed — this builds a "mailto:" link that opens the
    // customer's own email app (Gmail, Outlook, etc.) with everything
    // pre-filled, ready for them to hit send.
    const body = `From: ${name} (${email})\n\n${message}`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject || 'Message from FixItNow'
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    toast.success('Opening your email app...');
  };

  return (
    <section className="bg-[#14181a] py-16 text-white">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-8 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80">
            <Mail className="h-4 w-4" />
            Get in touch
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white">Have a question?</h2>
          <p className="mt-2 text-white/70">
            Send us a message and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-lg border border-white/20 bg-white/5 p-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-white">Your name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/40"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white">Your email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/40"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white">Subject (optional)</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Question about booking a technician"
              className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help?"
              rows={4}
              className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/40"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-md bg-white py-2.5 font-medium text-black hover:bg-white/90"
          >
            <Send className="h-4 w-4" />
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}