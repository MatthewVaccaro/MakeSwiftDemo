'use client'

import { useEffect, useState } from 'react'

import axios from 'axios'

import { Testimonial } from '@/components/Testimonial/Testimonial'

type AudioFiles = {
  gore: string
  christian: string
  flo: string
  andrew: string
}

export default function Component() {
  const [audioFiles, setAudioFiles] = useState<AudioFiles>()
  useEffect(() => {
    axios.get<AudioFiles>('http://localhost:3000/audioList').then(res => setAudioFiles(res.data))
  }, [])

  return (
    <div>
      {audioFiles && (
        <div>
          <Testimonial
            audio={audioFiles.gore}
            color="#EDAC34"
            name="gore"
            employer="media news"
            position="engineer"
          />
          <Testimonial
            audio={audioFiles.flo}
            color="#EA3BA7"
            name="florance"
            employer="brigit"
            position="engineer"
          />
          <Testimonial
            audio={audioFiles.christian}
            color="#EDAC34"
            name="christian"
            employer="bitdrift"
            position="engineer"
          />
          <Testimonial
            audio={audioFiles.andrew}
            color="#EA3BA7"
            name="andrew"
            employer="Prokur"
            position="designer"
          />
        </div>
      )}
    </div>
  )
}
