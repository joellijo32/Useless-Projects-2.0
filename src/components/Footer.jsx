import React from 'react'
import { team } from '../data/team'

const Icon = ({ type }) => {
  if (type === 'instagram') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
      </svg>
    )
  }
  if (type === 'linkedin') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM14.5 9c-2.2 0-3.5 1.2-4 2.2V9H7v12h4v-6.5c0-1.8 1.2-3 2.8-3 1.5 0 2.2.9 2.2 2.9V21h4v-7.2C20 10.8 18.3 9 16 9h-1.5z" fill="currentColor"/>
      </svg>
    )
  }
  return null
}

const Footer = () => {
  const iconLinkStyle = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 8, color: 'var(--text-muted, #cbd5e1)', background: 'transparent' }
  const rowStyle = { display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }
  const cardStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '8px 10px' }

  return (
    <footer className="footer" style={{ padding: '24px 0' }}>
      {Array.isArray(team) && team.length > 0 && (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div className="contacts" style={rowStyle}>
            {team.map((m, i) => (
              <div key={i} className="contact" style={cardStyle}>
                <div className="contact-name" style={{ color: 'var(--text, #e5e7eb)', fontSize: 14, fontWeight: 600 }}>
                  {m.name}
                </div>
                <div className="icon-row" style={{ display: 'flex', gap: 12 }}>
                  {m.instagram && (
                    <a href={m.instagram} target="_blank" rel="noreferrer" aria-label={`${m.name} on Instagram`} title={`${m.name} — Instagram`} style={iconLinkStyle}>
                      <Icon type="instagram" />
                    </a>
                  )}
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noreferrer" aria-label={`${m.name} on LinkedIn`} title={`${m.name} — LinkedIn`} style={iconLinkStyle}>
                      <Icon type="linkedin" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer
