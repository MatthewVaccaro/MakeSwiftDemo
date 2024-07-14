import { RefObject } from 'react'

import { create } from 'zustand'

export type AnalyzerData = {
  analyser: AnalyserNode
  bufferLength: number
  dataArray: Uint8Array
}

type Source = Record<string, AnalyzerData>

interface Props {
  ctx?: AudioContext
  sources?: Source
}

interface Methods {
  init: () => void
  addSource: (id: string, ref: RefObject<HTMLMediaElement>) => void
  getByteFrequencyData: (id: string) => void
}

export const useAudioContext = create<Props & Methods>()((set, get) => ({
  ctx: undefined,
  sources: undefined,
  init: () => {
    if (!get().ctx) {
      const ctx = new AudioContext()
      set({ ctx })
    }
  },
  addSource: (id, ref) => {
    const ctx = get().ctx as AudioContext // Always available when using method
    const sources = get().sources

    // Only set if it doesn't exists
    if (!sources?.[id]) {
      const analyser = ctx.createAnalyser()

      analyser.fftSize = 2048
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      let source
      if (ctx && analyser && ref?.current) {
        source = ctx.createMediaElementSource(ref.current)
        source.connect(analyser)
        source.connect(ctx.destination)
      }

      set({ sources: { ...get().sources, [id]: { analyser, dataArray, bufferLength } } })
    }
  },
  getByteFrequencyData: id => {
    const source = get().sources?.[id]
    if (source?.analyser && source?.dataArray) {
      source.analyser.getByteFrequencyData(source.dataArray)
    }
  },
}))
