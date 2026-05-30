'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', industry: '', country: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchCount = async () => {
      const supabase = createClient()
      const { count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
      setCount(count || 0)
    }
    fetchCount()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return
    setStatus('loading')
    setErrorMsg('')
    const supabase = createClient()
    const { error } = await supabase.from('waitlist').insert({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      industry: formData.industry,
      country: formData.country,
    })
    if (error) {
      if (error.code === '23505') {
        setErrorMsg('This email is already registered.')
      } else {
        setErrorMsg('Something went wrong. Please try again.')
      }
      setStatus('error')
    } else {
      setStatus('success')
      setCount(c => c + 1)
    }
  }

  return (
    <div className="min-h-screen">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-black">
            <span style={{ color: '#0F4C81' }}>Ko</span>
            <span style={{ color: '#E63946' }}>linked</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
              Login
            </a>
            <a href="#waitlist" className="text-sm font-bold text-white px-4 py-2 rounded-full transition hover:opacity-90"
              style={{ backgroundColor: '#E63946' }}>
              Join Waitlist
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ backgroundColor: '#0F4C81' }} className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-sm font-medium text-white border border-white/30 rounded-full px-4 py-1 mb-6">
            Korea-Connected Professional Network
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            The Professional Network<br />for Koreans Going Global
          </h1>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Connect with 7.5M+ overseas Korean professionals. Find jobs at Korean companies worldwide. Stay ahead with Korean industry news.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#waitlist"
              className="px-8 py-4 rounded-full font-bold text-white transition hover:opacity-90"
              style={{ backgroundColor: '#E63946' }}>
              Join the Waitlist →
            </a>
            <a href="#features"
              className="px-8 py-4 rounded-full font-bold text-white border border-white/40 hover:bg-white/10 transition">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: '7.5M+', l: 'Overseas Koreans Worldwide' },
            { n: '25,000+', l: 'Korean Company Global Branches' },
            { n: '$26B', l: 'Professional Network Market' },
            { n: '22.9%', l: 'APAC Digital Growth CAGR' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-black mb-1" style={{ color: '#0F4C81' }}>{s.n}</div>
              <div className="text-sm text-gray-500">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ backgroundColor: '#F8F9FA' }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12" style={{ color: '#1A1A2E' }}>
            Everything Korean Professionals Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: '🤝', title: 'Professional Network', desc: 'Korean-first profiles with 직급 support. Connect across all industries globally.' },
              { icon: '📰', title: 'News & Intelligence', desc: 'Curated Korean business news and market alerts personalised for you.' },
              { icon: '💼', title: 'Jobs & Careers', desc: 'Korean companies hiring globally + overseas talent seeking Korean companies.' },
              { icon: '🔔', title: 'Promotions & Alerts', desc: 'Business opportunities and networking alerts for Korean professionals.' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#0F4C81' }}>{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" style={{ backgroundColor: '#0F4C81' }} className="py-20 px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-3">
            Be First on Kolinked
          </h2>
          <p className="text-blue-100 text-center mb-8">
            Launching Q3 2026. Join the waitlist now.
          </p>

          {status === 'success' ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">✅</div>
              <p className="text-xl font-bold" style={{ color: '#0F4C81' }}>You&apos;re on the list!</p>
              <p className="text-gray-500 mt-2">We&apos;ll notify you at launch.</p>
              <p className="text-sm text-gray-400 mt-4">{count} professionals already waiting</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 space-y-4">
              <input
                type="text" placeholder="Full Name" required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--navy)]"
              />
              <input
                type="email" placeholder="Work Email" required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--navy)]"
              />
              <input
                type="text" placeholder="Company"
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--navy)]"
              />
              <select
                value={formData.industry}
                onChange={e => setFormData({ ...formData, industry: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--navy)] text-gray-600"
              >
                <option value="">Select Industry</option>
                {['Technology', 'Finance', 'Logistics & Supply Chain', 'Marketing', 'Healthcare', 'Education', 'F&B', 'Beauty & Cosmetics', 'Media & Entertainment', 'Other'].map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
              <select
                value={formData.country}
                onChange={e => setFormData({ ...formData, country: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--navy)] text-gray-600"
              >
                <option value="">Select Country</option>
                {['South Korea', 'Singapore', 'Indonesia', 'Malaysia', 'Thailand', 'Philippines', 'Vietnam', 'Japan', 'United States', 'United Kingdom', 'Australia', 'Other'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errorMsg && <p className="text-sm text-[color:var(--red)]">{errorMsg}</p>}
              <button
                type="submit" disabled={status === 'loading'}
                className="w-full py-4 rounded-xl font-bold text-white transition hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: '#E63946' }}
              >
                {status === 'loading' ? 'Joining...' : 'Join Waitlist →'}
              </button>
              {count > 0 && (
                <p className="text-xs text-center text-gray-400">
                  Join {count} professionals already waiting
                </p>
              )}
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-8 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-black text-lg">
              <span style={{ color: '#0F4C81' }}>Ko</span>
              <span style={{ color: '#E63946' }}>linked</span>
            </span>
            <p className="text-xs text-gray-400 mt-1">Korea-Connected Professional Network</p>
          </div>
          <p className="text-xs text-gray-400">
            © 2026 Kolinked · Tech Chain Global Pte Ltd · Singapore
          </p>
          <div className="flex gap-4 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
