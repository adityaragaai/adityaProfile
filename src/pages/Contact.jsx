import { useState } from 'react'
import {
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  User,
  Zap,
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import linkedinBg from '../assets/linkedin-bg.png'
import youtubeBg from '../assets/youtube-bg.png'

function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function YoutubeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

const socials = [
  { label: 'GitHub',   handle: '@Adityaguptawebdev',           href: 'https://github.com/Adityaguptawebdev',      Icon: GithubIcon,   color: 'oklch(0.922 0 0)',          bg: 'oklch(0.922 0 0)' },
  { label: 'LinkedIn', handle: '@adityagupta-swe',              href: 'https://www.linkedin.com/in/adityagupta-swe/',   Icon: LinkedinIcon, color: 'white',                      bg: 'oklch(0.488 0.243 264.376)', bgImage: linkedinBg },
  { label: 'YouTube',  handle: '@AlgoStrive',                  href: 'https://youtu.be/E3hUmiRxPxg?si=9Dv9-4nkeKjc9W4s',       Icon: YoutubeIcon,  color: 'white',                      bg: 'oklch(0.627 0.265 25)', bgImage: youtubeBg },
  { label: 'Email',    handle: 'rahul860152gupta@gmail.com', href: 'mailto:rahul860152gupta@gmail.com',       Icon: Mail,         color: 'oklch(0.696 0.17 162.48)',   bg: 'oklch(0.696 0.17 162.48)' },
]

const contactInfo = [
  { icon: Mail,     label: 'Email',        value: 'rahul860152gupta@gmail.com', href: 'mailto:rahul860152gupta@gmail.com', color: 'oklch(0.696 0.17 162.48)' },
  { icon: MapPin,   label: 'Location',     value: 'India · Open to Remote',       color: 'oklch(0.488 0.243 264.376)' },
  { icon: Clock,    label: 'Response',     value: 'Usually within 24 hrs',        color: 'oklch(0.769 0.188 70.08)' },
  { icon: Calendar, label: 'Availability', value: 'Immediately',                  color: 'oklch(0.696 0.17 162.48)' },
]

const availability = [
  { label: 'Full-Time Roles',  status: 'Available', color: 'oklch(0.696 0.17 162.48)' },
  { label: 'Internships',      status: 'Available', color: 'oklch(0.696 0.17 162.48)' },
  { label: 'Freelance',        status: 'Available', color: 'oklch(0.696 0.17 162.48)' },
  { label: 'Collaborations',   status: 'Open',      color: 'oklch(0.769 0.188 70.08)' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { name, email, subject, message } = form
    const body = `Hi Aditya,%0A%0A${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(name)} (${encodeURIComponent(email)})`
    window.location.href = `mailto:rahul860152gupta@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const isValid = form.name && form.email && form.message

  return (
    <div className="flex p-8 flex-col flex-1 gap-6 overflow-auto">

      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-neutral-50 text-3xl leading-9 tracking-tight">Contact</h1>
            <span className="bg-[oklch(0.696_0.17_162.48)]/15 text-[oklch(0.696_0.17_162.48)] border-[oklch(0.696_0.17_162.48)]/30 font-mono rounded-full text-[10px] border border-solid px-2 py-0.5 flex items-center gap-1.5">
              <span className="size-1.5 bg-[oklch(0.696_0.17_162.48)] rounded-full animate-pulse inline-block" />
              Open to Work
            </span>
          </div>
          <p className="text-[#a1a1a1] text-sm leading-5">Let's build something great together — reach out anytime</p>
        </div>
        <div className="font-mono text-[#a1a1a1] text-[10px] flex items-center gap-2">
          <Clock className="size-3" />
          Avg. response · &lt; 24hrs
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6">

        {/* Left — Form + Socials */}
        <div className="col-span-2 flex flex-col gap-4">
          <Card className="bg-neutral-900 border-white/5 p-6 flex flex-col gap-5">
            <CardHeader className="p-0 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <MessageSquare className="size-4 text-[oklch(0.488_0.243_264.376)]" />
                <span className="font-semibold text-neutral-50 text-sm">Send a Message</span>
              </div>
              <p className="text-[#a1a1a1] text-xs leading-4">Fill out the form and I'll get back to you as soon as possible.</p>
            </CardHeader>

            <CardContent className="p-0 flex flex-col gap-4">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#a1a1a1] text-[11px] font-mono uppercase tracking-wider flex items-center gap-1">
                      <User className="size-3" /> Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-neutral-800 border border-white/10 focus:border-[oklch(0.488_0.243_264.376)]/60 outline-none rounded-lg px-3 py-2.5 text-neutral-50 text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#a1a1a1] text-[11px] font-mono uppercase tracking-wider flex items-center gap-1">
                      <Mail className="size-3" /> Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="bg-neutral-800 border border-white/10 focus:border-[oklch(0.488_0.243_264.376)]/60 outline-none rounded-lg px-3 py-2.5 text-neutral-50 text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[#a1a1a1] text-[11px] font-mono uppercase tracking-wider flex items-center gap-1">
                    <Zap className="size-3" /> Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="bg-neutral-800 border border-white/10 focus:border-[oklch(0.488_0.243_264.376)]/60 outline-none rounded-lg px-3 py-2.5 text-neutral-50 text-sm placeholder:text-neutral-600 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[#a1a1a1] text-[11px] font-mono uppercase tracking-wider flex items-center gap-1">
                    <MessageSquare className="size-3" /> Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about your project, opportunity, or just say hi..."
                    required
                    className="bg-neutral-800 border border-white/10 focus:border-[oklch(0.488_0.243_264.376)]/60 outline-none rounded-lg px-3 py-2.5 text-neutral-50 text-sm placeholder:text-neutral-600 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isValid}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: sent ? 'oklch(0.696 0.17 162.48)' : 'oklch(0.488 0.243 264.376)' }}
                >
                  {sent ? <><CheckCircle2 className="size-4" />Message Sent!</> : <><Send className="size-4" />Send Message</>}
                </button>
              </form>
            </CardContent>
          </Card>

          {/* Social Tiles */}
          <div className="grid grid-cols-4 gap-3">
            {socials.map(({ label, handle, href, Icon, color, bg, bgImage }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group relative bg-neutral-900 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all hover:-translate-y-0.5"
                style={{ minHeight: '110px' }}
              >
                {/* Background image (LinkedIn) */}
                {bgImage && (
                  <>
                    <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover object-top opacity-30 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/50 to-neutral-900/20" />
                  </>
                )}

                <div className="relative z-10 p-4 flex flex-col items-center gap-2 h-full">
                  <div
                    className="size-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: bgImage ? 'rgba(0,0,0,0.4)' : `color-mix(in oklch, ${bg} 12%, transparent)`, backdropFilter: bgImage ? 'blur(4px)' : undefined }}
                  >
                    <Icon className="size-4" style={{ color }} />
                  </div>
                  <div className="text-center">
                    <p className="text-neutral-50 text-xs font-semibold">{label}</p>
                    <p className="text-[#a1a1a1] text-[10px] truncate max-w-[90px]">{handle}</p>
                  </div>
                  <ExternalLink className="size-3 text-[#a1a1a1] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-4">

          {/* Availability */}
          <Card className="bg-neutral-900 border-white/5 p-6 flex flex-col gap-4 overflow-hidden relative">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, oklch(0.696 0.17 162.48), transparent 70%)' }} />
            <CardHeader className="p-0 flex flex-col gap-0">
              <div className="flex items-center gap-2">
                <Activity className="size-4 text-[oklch(0.696_0.17_162.48)]" />
                <span className="font-semibold text-neutral-50 text-sm">Availability</span>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col gap-0">
              {availability.map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-[#a1a1a1] text-xs">{item.label}</span>
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                    style={{ color: item.color, backgroundColor: `color-mix(in oklch, ${item.color} 12%, transparent)` }}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="bg-neutral-900 border-white/5 p-6 flex flex-col gap-4">
            <CardHeader className="p-0">
              <span className="font-semibold text-neutral-50 text-sm">Contact Info</span>
            </CardHeader>
            <CardContent className="p-0 flex flex-col gap-3">
              {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} className="flex items-start gap-3">
                  <div
                    className="size-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `color-mix(in oklch, ${color} 12%, transparent)` }}
                  >
                    <Icon className="size-3.5" style={{ color }} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[#a1a1a1] text-[10px] font-mono uppercase tracking-wider">{label}</span>
                    {href
                      ? <a href={href} className="text-neutral-50 text-xs leading-4 hover:underline break-all">{value}</a>
                      : <span className="text-neutral-50 text-xs leading-4">{value}</span>
                    }
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Terminal ping */}
          <Card className="bg-neutral-900 border-white/5 p-5 flex flex-col gap-0">
            <div className="bg-neutral-950 rounded-lg p-3 font-mono text-[10px] flex flex-col gap-1.5">
              <div className="flex gap-1.5 mb-1">
                <span className="size-2 rounded-full bg-red-500/70" />
                <span className="size-2 rounded-full bg-yellow-500/70" />
                <span className="size-2 rounded-full bg-green-500/70" />
              </div>
              <div className="text-[oklch(0.696_0.17_162.48)]">$ ping aditya.dev</div>
              <div className="text-[#a1a1a1]">PING aditya.dev: 56 bytes of data</div>
              <div className="text-neutral-400">64 bytes from aditya: time=2ms</div>
              <div className="text-neutral-400">64 bytes from aditya: time=1ms</div>
              <div className="text-[oklch(0.696_0.17_162.48)]">— aditya.dev ping statistics —</div>
              <div className="text-neutral-400">2 packets transmitted, 2 received</div>
              <div className="text-[oklch(0.696_0.17_162.48)] flex items-center gap-1.5">
                <span className="size-1.5 bg-[oklch(0.696_0.17_162.48)] rounded-full animate-pulse inline-block" />
                Host is UP · Ready to connect
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}
