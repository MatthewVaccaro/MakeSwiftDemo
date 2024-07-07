'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { motion, useSpring, useTransform } from 'framer-motion'
import { useAudioContext } from 'store/audioStore'

import { Waveform } from './Waveform'
import { Pause, Play } from './assets/Controlls'

type ImageWithDimensions = {
  url: string
  dimensions: {
    width: number
    height: number
  }
}

export const Testimonial = ({
  color,
  photo,
  name,
  position,
  employer,
  audio,
}: {
  color: string
  photo?: ImageWithDimensions
  name: string
  position: string
  employer: string
  audio: string
}) => {
  const audioContext = useAudioContext()
  const audioRef = useRef<HTMLMediaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const clientWidth: number = containerRef.current?.clientWidth ?? 0

  const widthValue = useSpring(0)
  const width = useTransform(widthValue, [0, 1], [0, clientWidth])

  useEffect(() => {
    audioRef.current?.addEventListener('play', () => setIsPlaying(true))
    audioRef.current?.addEventListener('pause', () => setIsPlaying(false))
    audioRef.current?.addEventListener('ended', () => setIsPlaying(false))
    audioRef.current?.addEventListener('timeupdate', () =>
      widthValue.set((audioRef.current?.currentTime ?? 0) / (audioRef.current?.duration ?? 0))
    )

    return () => {
      audioRef.current?.removeEventListener('play', () => setIsPlaying(true))
      audioRef.current?.removeEventListener('pause', () => setIsPlaying(false))
      audioRef.current?.removeEventListener('ended', () => setIsPlaying(false))
      audioRef.current?.removeEventListener('timeupdate', e => console.log(e))
    }
  }, [])

  const toggle = () => {
    audioContext.init()

    if (audioRef.current?.paused) {
      audioContext.addSource(audio, audioRef)
      audioRef.current?.play()
      setIsPlaying(true)
    } else {
      audioContext.addSource(audio, audioRef)
      audioRef.current?.pause()
      setIsPlaying(false)
    }
  }

  return (
    <>
      <div
        ref={containerRef}
        className="relative flex w-full items-center justify-between overflow-hidden rounded-xl bg-white p-4"
      >
        <div className="absolute bottom-0 left-0 z-0 bg-white">
          {audioContext.sources?.[audio] && (
            <>
              <motion.div
                style={{
                  width,
                  background: color,
                }}
                className="absolute left-0 top-0 z-40 h-1"
              />
              <div
                style={{
                  width: clientWidth,
                  height: containerRef.current?.clientHeight ?? 0,
                }}
                className="absolute left-0 top-0 z-10 backdrop-blur-sm"
              />
              <Waveform
                id={audio}
                color={color}
                height={containerRef.current?.clientHeight ?? 0}
                width={clientWidth}
              />
            </>
          )}
        </div>
        <div className="z-10 flex items-center gap-3">
          {photo ? (
            <Image
              src={photo.url}
              width={photo.dimensions.width}
              height={photo.dimensions.height}
              alt="A headshot of the current person talking"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-orange-300" />
          )}
          <div>
            <h5 className="font-medium capitalize">{name}</h5>
            <p className="font-light capitalize">
              {position} <span className="font-semibold"> @{employer} </span>
            </p>
          </div>
        </div>
        <button className="z-10" onClick={toggle}>
          {isPlaying ? <Pause fill={color} /> : <Play fill={color} />}
        </button>
      </div>
      <audio src={audio} ref={audioRef} aria-hidden="true" crossOrigin="anonymous" />
    </>
  )
}
