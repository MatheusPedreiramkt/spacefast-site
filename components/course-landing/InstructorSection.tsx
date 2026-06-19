'use client'

import { motion } from 'framer-motion'
import { Camera, Globe, User } from 'lucide-react'
import { INSTRUCTOR } from '@/lib/course-config'

export default function InstructorSection() {
  return (
    <section className="relative py-20 lg:py-28" style={{ background: '#080808' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ color: '#00e676', border: '1px solid rgba(0,230,118,0.25)', background: 'rgba(0,230,118,0.06)' }}
          >
            Quem criou
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            O produtor
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="dark-card rounded-2xl p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start"
        >
          {/* Photo */}
          {/* Place instructor photo at: /public/images/course/instructor.jpg */}
          <div className="flex-shrink-0">
            <div
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ border: '2px solid rgba(0,230,118,0.3)', background: 'rgba(0,230,118,0.06)' }}
            >
              {/* When photo is available, replace with next/image */}
              <User size={48} style={{ color: 'rgba(0,230,118,0.4)' }} />
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1 text-center sm:text-left">
            <h3
              className="text-2xl font-extrabold text-white mb-1"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              {INSTRUCTOR.name}
            </h3>
            <p className="text-sm mb-4" style={{ color: '#00e676' }}>
              {INSTRUCTOR.brand}
            </p>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              {INSTRUCTOR.bio}
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <a
                href={INSTRUCTOR.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-medium text-white/60 hover:text-white transition-colors px-3 py-2 rounded-lg"
                style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}
              >
                <Camera size={13} />
                {INSTRUCTOR.instagram}
              </a>
              <a
                href={INSTRUCTOR.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-medium text-white/60 hover:text-white transition-colors px-3 py-2 rounded-lg"
                style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}
              >
                <Globe size={13} />
                {INSTRUCTOR.site}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
