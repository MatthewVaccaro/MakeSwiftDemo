import Image from 'next/image'
import { ReactNode, useEffect, useState } from 'react'

import { motion } from 'framer-motion'

type Props = {
  logoLeft: string
  logoRight: string
  content: ReactNode | ReactNode[]
  orb1: string
  orb2: string
}
export const Hero = ({ logoLeft, logoRight, content, orb1, orb2 }: Props) => {
  const [width, setWidth] = useState<number | undefined>()

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return (
    <div>
      {/* Hero Background  */}
      {width && (
        <div className="absolute h-screen w-full overflow-hidden">
          <div
            id="blur"
            className="pointer-events-none absolute z-10 h-screen w-full backdrop-blur-3xl"
          />
          <p className="absolute top-5 z-50 text-green-200"> --- {width} </p>
          <div className="opacity-10" style={{ width, height: width - 415, background: 'blue' }} />
          <motion.div
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            animate={{
              x: [0, width - 415],
              y: [0, 0],
            }}
            style={{ background: orb1 }}
            className="absolute left-0 top-0 h-[415px] w-[415px] rounded-full opacity-30 transition-all duration-300 hover:opacity-85"
          />
          <motion.div
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            animate={{
              x: [0, (width - 415) / 2, width - 415, (width - 415) / 2, 0],
              y: [width / 2, 0, width / 2, width, width / 2],
            }}
            style={{ background: orb1 }}
            className="absolute h-[415px] w-[415px] rounded-full opacity-30 transition-all duration-300 hover:opacity-85"
          />
          <motion.div
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            animate={{
              x: [width - 415, (width - 415) / 2, 0, (width - 415) / 2, width - 415],
              y: [width / 2, width, width / 2, 0, width / 2],
              scale: [1, 0.5, 0.25, 0.5, 1],
            }}
            style={{ background: orb2 }}
            className="absolute h-[415px] w-[415px] rounded-full bg-pink-400 opacity-30 transition-all duration-300 hover:opacity-85"
          />
        </div>
      )}
      <div className="pointer-events-none relative z-50 mx-auto h-screen w-full max-w-[750px]">
        <div className=" flex items-center justify-center gap-6 pt-[115px]">
          <Image src={logoLeft} alt="Makeswift logo" />
          <div className="h-10 w-[2px] rounded-md bg-white opacity-35" />
          <Image src={logoRight} alt="Sunflower logo" />
        </div>

        {content}
      </div>
    </div>
  )
}
