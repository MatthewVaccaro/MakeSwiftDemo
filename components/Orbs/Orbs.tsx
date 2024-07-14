'use client'

import { ReactNode } from 'react'

import { Orb, OrbProps } from '@/components/Orbs/Orb'

export const Orbs = ({
  orbs,
  slot,
  opacity = 0.5,
}: {
  orbs: OrbProps[]
  slot: ReactNode
  opacity?: number
}) => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="pointer-events-none absolute z-10 h-screen w-screen backdrop-blur-3xl" />
      <div className="overflow-hidden" style={{ opacity }}>
        {orbs.map((options, i) => (
          <Orb key={i} {...options} />
        ))}
      </div>
      <div className="relative z-50">{slot}</div>
    </div>
  )
}
