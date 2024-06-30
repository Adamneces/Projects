import React from 'react'

export default function Card({ name, className, toggleActive, url }) {
  return (
    <div style={{backgroundImage: `url(${url})`}} onClick={() => toggleActive(name)} className={className === name ? 'active card' : 'card'}>
      <h3>{name}</h3>
    </div>
  )
}
