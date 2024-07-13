'use client'

import Image from 'next/image'
import { MouseEvent, ReactNode, useEffect, useState } from 'react'

import * as HoverCard from '@radix-ui/react-hover-card'
import myLogo from 'assets/logo.svg'
import makeswiftLogo from 'assets/makeswift.svg'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

import { CardSet } from '@/components/CardSet/CardSet'
import { Hero } from '@/components/Hero/Hero'
import { Major } from '@/components/Major/Major'
import cal from '@/components/Major/assets/cal.svg'
import { Minor } from '@/components/Minor/Minor'
import { Orb, OrbProps } from '@/components/Orbs/Orb'

export const Orbs = ({
  orbs,
  slot,
  opacity = 0.5,
}: {
  orbs: OrbProps[]
  slot: ReactNode | ReactNode[]
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
