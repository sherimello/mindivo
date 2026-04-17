'use client';

import { useRef, useState } from 'react';
import { Send, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export default function CTASection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate async send
    setTimeout(() => { setStatus('sent'); formRef.current?.reset(); }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Get In Touch
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-[1.1]">
              <span className="text-foreground">
                Ready to Start Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Digital Journey?
              </span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Tell us about your project. We&apos;ll respond within one business day with initial thoughts
              and a proposal for next steps — no obligation, no spam.
            </p>

            {/* Contact info */}
            <div className="space-y-5">
              {[
                { icon: Mail,   label: 'Email',    value: 'admin@mindivo.com' },
                { icon: Phone,  label: 'Phone',    value: '+1 (470) 909-8452' },
                { icon: MapPin, label: 'Based in', value: 'United States' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium">{label}</div>
                    <div className="text-sm font-semibold text-foreground">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/5 pointer-events-none" />
            <div className="relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-8">
              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Message Received!</h3>
                  <p className="text-muted-foreground max-w-xs">
                    Thank you for reaching out. We&apos;ll be in touch within one business day.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 text-sm text-primary hover:underline font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-foreground mb-1">Let&apos;s Talk</h3>
                  <p className="text-sm text-muted-foreground mb-6">Fill in the form and we&apos;ll reach out shortly.</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { id: 'name',    label: 'Full Name',     type: 'text',  placeholder: 'Jane Doe' },
                      { id: 'company', label: 'Company',       type: 'text',  placeholder: 'Acme Corp' },
                    ].map(({ id, label, type, placeholder }) => (
                      <div key={id}>
                        <label htmlFor={id} className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                          {label}
                        </label>
                        <input
                          id={id}
                          name={id}
                          type={type}
                          placeholder={placeholder}
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background/60 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane@acme.com"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background/60 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                      What Do You Need?
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background/60 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    >
                      <option value="">Select a service…</option>
                      <option value="mobile">Mobile App Development</option>
                      <option value="web">Web Application Development</option>
                      <option value="digitization">Business Digitization</option>
                      <option value="other">Other / Not Sure Yet</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                      Tell Us More
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Brief description of your project, timeline, or any key constraints…"
                      className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background/60 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
