import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { Mail, MessageSquare, ShieldCheck, CheckCircle2, Copy, Check, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { navigate } = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [channel, setChannel] = useState('');
  const [subject, setSubject] = useState('General Agency Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Please provide your name';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Please provide a valid email address';
    if (!message.trim() || message.trim().length < 15) errs.message = 'Please provide a message with at least 15 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
  };

  const handleCopy = () => {
    const text = `Superb Apex Digital - Contact Inquiry\nName: ${name}\nEmail: ${email}\nOrganization/Channel: ${channel || 'N/A'}\nSubject: ${subject}\nMessage:\n${message}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
          Direct Communication
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
          Contact Superb Apex Digital
        </h1>
        <p className="text-base text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
          Have a question regarding our services, technical server permissions, or project availability? Submit your inquiry below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Form Column: 7 cols */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="space-y-6 py-6 text-center animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#172033] dark:text-[#F5F7FA]">
                    Inquiry Received & Registered
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-[#172033] dark:text-[#F5F7FA]">{name}</span>. Your inquiry brief has been recorded. Our Operations Lead will review your request and reply to <span className="font-semibold text-[#172033] dark:text-[#F5F7FA]">{email}</span> within 24 business hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343] text-left text-xs font-mono text-[#526078] dark:text-[#B2BDCB] max-h-48 overflow-y-auto space-y-1">
                  <div><strong>From:</strong> {name} ({email})</div>
                  <div><strong>Subject:</strong> {subject}</div>
                  <div><strong>Channel / Org:</strong> {channel || 'None specified'}</div>
                  <div className="pt-2 border-t border-[#DCE3EE]/60 dark:border-[#283343]/60">{message}</div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`mailto:inquiries@superbapexdigital.com?subject=${encodeURIComponent(`Inquiry: ${subject} - ${name}`)}&body=${encodeURIComponent(`From: ${name} (${email})\nChannel: ${channel || 'N/A'}\nSubject: ${subject}\n\nMessage:\n${message}`)}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] text-white transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open in Email Client</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#EEF2F8] dark:bg-[#283343] text-[#172033] dark:text-[#F5F7FA] hover:bg-[#DCE3EE] dark:hover:bg-[#324055] transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied Brief to Clipboard' : 'Copy Brief Summary'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-4 py-2.5 text-xs font-medium rounded-lg text-[#526078] dark:text-[#B2BDCB] hover:bg-[#EEF2F8] dark:hover:bg-[#192331] transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border text-xs sm:text-sm text-[#172033] dark:text-[#F5F7FA] placeholder-[#526078]/60 dark:placeholder-[#B2BDCB]/60 focus:outline-none focus:ring-2 focus:ring-[#365DE8] dark:focus:ring-[#6C8CFF] ${
                        errors.name ? 'border-red-500' : 'border-[#DCE3EE] dark:border-[#283343]'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@creator.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border text-xs sm:text-sm text-[#172033] dark:text-[#F5F7FA] placeholder-[#526078]/60 dark:placeholder-[#B2BDCB]/60 focus:outline-none focus:ring-2 focus:ring-[#365DE8] dark:focus:ring-[#6C8CFF] ${
                        errors.email ? 'border-red-500' : 'border-[#DCE3EE] dark:border-[#283343]'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="channel" className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                      Channel / Organization Name (Optional)
                    </label>
                    <input
                      id="channel"
                      type="text"
                      value={channel}
                      onChange={(e) => setChannel(e.target.value)}
                      placeholder="e.g. Apex Velocity Gaming"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343] text-xs sm:text-sm text-[#172033] dark:text-[#F5F7FA] placeholder-[#526078]/60 dark:placeholder-[#B2BDCB]/60 focus:outline-none focus:ring-2 focus:ring-[#365DE8] dark:focus:ring-[#6C8CFF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                      Subject Area
                    </label>
                    <select
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343] text-xs sm:text-sm text-[#172033] dark:text-[#F5F7FA] focus:outline-none focus:ring-2 focus:ring-[#365DE8] dark:focus:ring-[#6C8CFF]"
                    >
                      <option>General Agency Inquiry</option>
                      <option>Discord Architecture & Security</option>
                      <option>Twitch Stream Package</option>
                      <option>YouTube Creative & Thumbnails</option>
                      <option>Monthly Operations Retainer</option>
                      <option>Security & NDA Review</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                    Your Message / Questions *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your channels, team setup, and questions..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border text-xs sm:text-sm text-[#172033] dark:text-[#F5F7FA] placeholder-[#526078]/60 dark:placeholder-[#B2BDCB]/60 focus:outline-none focus:ring-2 focus:ring-[#365DE8] dark:focus:ring-[#6C8CFF] ${
                      errors.message ? 'border-red-500' : 'border-[#DCE3EE] dark:border-[#283343]'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-red-500">{errors.message}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold rounded-xl bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] text-white transition-colors shadow-sm"
                  >
                    <span>Send Message to Team</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Sidebar Info Column: 5 cols */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-6 sm:p-7 space-y-4">
            <h3 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
              Looking for a Formal Project Quote?
            </h3>
            <p className="text-xs text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
              If you have specific channels and deliverables already in mind, our dedicated Request a Quote builder allows you to select deliverables, timeline preferences, and receive an itemized proposal.
            </p>
            <button
              type="button"
              onClick={() => navigate('quote')}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#FFFFFF] dark:bg-[#192331] text-[#365DE8] dark:text-[#6C8CFF] border border-[#DCE3EE] dark:border-[#283343] hover:border-[#365DE8] dark:hover:border-[#6C8CFF] transition-colors"
            >
              <span>Go to Request a Quote Builder</span>
            </button>
          </div>

          <div className="rounded-2xl bg-[#121923] text-[#F5F7FA] border border-[#283343] p-6 sm:p-7 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#6C8CFF]">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero Password Reminder</span>
            </div>
            <p className="text-xs text-[#B2BDCB] leading-relaxed">
              Do not include passwords, two-factor authentication codes, or sensitive billing numbers in this form or in any correspondence. We operate strictly via platform-delegated roles.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-3 text-xs">
            <h4 className="font-bold text-[#172033] dark:text-[#F5F7FA]">Verified Agency Channels & SLA</h4>
            <div className="space-y-2 text-[#526078] dark:text-[#B2BDCB]">
              <div className="flex items-center justify-between">
                <span>Official Inquiries:</span>
                <a href="mailto:inquiries@superbapexdigital.com" className="font-semibold text-[#365DE8] dark:text-[#6C8CFF] hover:underline">
                  inquiries@superbapexdigital.com
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span>Operations Desk:</span>
                <span className="font-semibold text-[#172033] dark:text-[#F5F7FA]">@SuperbApexSupport</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Business Hours:</span>
                <span className="font-medium text-[#172033] dark:text-[#F5F7FA]">Mon–Fri · 9:00 AM – 6:00 PM EST</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Response Guarantee:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Under 24 Business Hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
