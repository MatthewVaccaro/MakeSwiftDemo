// import { RefObject } from 'react'
// import { create } from 'zustand'
// export type AnalyzerData = {
//   analyser: AnalyserNode
//   bufferLength: number
//   dataArray: Uint8Array
// }
// interface Props {
//   ctx?: AudioContext
//   analyser?: AnalyserNode
//   bufferLength?: number
//   dataArray?: Uint8Array
//   source?: MediaElementAudioSourceNode
// }
// interface Methods {
//   init: (ref: RefObject<HTMLMediaElement>) => void
//   changeSource: (ref: RefObject<HTMLMediaElement>) => void
//   cleanUp: () => void
//   getByteFrequencyData: () => void
// }
// export const useAudioContext = create<Props & Methods>()((set, get) => ({
//   ctx: undefined,
//   analyser: undefined,
//   bufferLength: undefined,
//   dataArray: undefined,
//   init: ref => {
//     if (!get().ctx) {
//       const ctx = new AudioContext()
//       const analyser = ctx.createAnalyser()
//
//       analyser.fftSize = 2048
//       const bufferLength = analyser.frequencyBinCount
//       const dataArray = new Uint8Array(bufferLength)
//       let source
//       if (ctx && analyser && ref?.current) {
//         source = ctx.createMediaElementSource(ref.current)
//         source.connect(analyser)
//         source.connect(ctx.destination)
//       }
//       set({ ctx, analyser, bufferLength, dataArray, source })
//     }
//   },
//   changeSource: ref => {
//     const { ctx, analyser, source } = get()
//     console.log({ source })
//     if (source) {
//       console.log('disconntected')
//       source.disconnect()
//       set({ source: undefined })
//     }
//     if (ctx && analyser && ref?.current && source === undefined) {
//       let source = ctx.createMediaElementSource(ref.current)
//       source.connect(analyser)
//       source.connect(ctx.destination)
//       set({ source })
//     }
//   },
//   cleanUp: () => {
//     get().ctx?.close()
//     set({
//       ctx: undefined,
//       analyser: undefined,
//       bufferLength: undefined,
//       dataArray: undefined,
//       source: undefined,
//     })
//   },
//   getByteFrequencyData: () => {
//     const { analyser, dataArray } = get()
//     if (analyser && dataArray) {
//       analyser.getByteFrequencyData(dataArray)
//     }
//   },
// }))
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

    console.log({ sources })
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
