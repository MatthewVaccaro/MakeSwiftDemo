import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import {
  Pattern,
  generateCarouselPoints,
  generateCirclePoints,
  generateDiamondPoints,
  generateTrianglePoints,
  reverseFrames,
} from './utils'

export interface OrbProps {
  color: string
  movementType: 'diamond' | 'triangle' | 'carousel'
  duration: number
  padding: number
  orbSize: number
  heightOverride?: number
  delay: number
  offset: number
  reverse: boolean
}

const movementOptions = {
  diamond: (w: number, h: number, o: number, p: number) => generateDiamondPoints(w, h, o, p),
  triangle: (w: number, h: number, o: number, p: number) => generateTrianglePoints(w, h, o, p),
  carousel: (w: number, h: number, o: number, p: number) => generateCarouselPoints(w, h, o, p),
} as const

export const Orb = ({
  color = 'red',
  movementType = 'diamond',
  duration = 12,
  padding = 0,
  orbSize = 200,
  heightOverride,
  reverse,
}: OrbProps) => {
  const [width, setWidth] = useState<number | undefined>()
  const [height, setHeight] = useState<number | undefined>()
  const [pattern, setPattern] = useState<Pattern>({ x: [], y: [] })

  useEffect(() => {
    function handleResize() {
      const heightAdjust = heightOverride
        ? Math.min(heightOverride, window.innerHeight)
        : window.innerHeight

      setWidth(window.innerWidth)
      setHeight(heightAdjust)

      const movement = movementOptions[movementType](
        window.innerWidth,
        heightAdjust,
        orbSize,
        padding
      )

      setPattern(reverse ? reverseFrames(movement) : movement)
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  if (width && height) {
    console.log({ pattern })

    return (
      <motion.div
        style={{ width: orbSize, height: orbSize, background: color }}
        transition={{
          duration,
          repeat: Infinity,
          ease: [0.17, 0.67, 0.83, 0.67],
          type: 'tween',
        }}
        animate={{
          x: pattern.x,
          y: pattern.y,
          scale: pattern?.scale ?? 1,
          opacity: pattern?.opacity ?? 1,
        }}
        className="absolute h-28 w-28 rounded-full"
      />
    )
  }
}
