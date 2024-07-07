'use client'

import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion'
import { useAudioContext } from 'store/audioStore'

export const Waveform = ({
  color,
  height,
  width,
  id,
}: {
  id: string
  color: string
  height: number
  width: number
}) => {
  const source = useAudioContext(context => context.sources?.[id])

  if (source?.analyser && source?.bufferLength && source?.dataArray) {
    const bars = new Array(Math.round(width / 4)).fill(true)

    return (
      <div style={{ height, width }} className="flex h-full w-full items-end bg-white">
        {bars.map((v, i) => {
          return (
            <Bar
              key={i}
              index={i}
              id={id}
              dataArray={source.dataArray}
              maxheight={height}
              color={color}
            />
          )
        })}
      </div>
    )
  }
}

const Bar = ({
  index,
  dataArray,
  maxheight,
  id,
  color,
}: {
  id: string
  index: number
  dataArray: Uint8Array
  maxheight: number
  color: string
}) => {
  const { getByteFrequencyData } = useAudioContext(({ getByteFrequencyData }) => ({
    getByteFrequencyData,
  }))
  const freq = useMotionValue(0)
  const height = useTransform(freq, [0, 300], [0, maxheight], { clamp: true })

  useAnimationFrame(() => {
    getByteFrequencyData(id)
    freq.set(dataArray[index])
  })

  return (
    <motion.div
      style={{ height: height, background: color }}
      className={`w-1  [&:nth-child(1n)]:opacity-15 [&:nth-child(2n)]:opacity-25 [&:nth-child(3n)]:opacity-45`}
    />
  )
}
