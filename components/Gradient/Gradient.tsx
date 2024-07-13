'use client'

import { ReactNode, useRef } from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'

type Props = {
  colors: string[]
  degree: number
  height?: number
  opacity?: number
  slot: ReactNode
}

export const Gradient = ({ slot, colors, degree = 0, opacity = 0.5, height = 600 }: Props) => {
  const gradientRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: gradientRef,
    offset: ['start end', 'end end'],
  })
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={gradientRef} style={{ height }} className="relative w-full">
      <div id="Overlay" className="absolute z-20 h-full w-full backdrop-blur-3xl" />
      <motion.div
        id="Gradient"
        style={{
          background: `linear-gradient(${degree}deg, ${colors.join(',')})`,
          opacity,
          width,
          height: height / 2,
        }}
        className={`absolute left-0 right-0 z-10 mx-auto w-full rounded-b-full`}
      />
      <div className="relative z-50">{slot}</div>
    </div>
  )
}
