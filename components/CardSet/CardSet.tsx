import { useState } from 'react'

import { motion, useMotionValue } from 'framer-motion'

export const CardSet = () => {
  const cardFill = [1, 2, 3, 4, 5]
  const [cards, setCards] = useState<number[]>(cardFill)
  return (
    <div className="flex w-full gap-[-32px]">
      {cards.map(v => (
        <Card id={v} />
      ))}
    </div>
  )
}

const Card = ({ id }: { id: number }) => {
  const x = useMotionValue(0)

  function onDragEnd(e: MouseEvent) {
    const node = e.target as HTMLElement
    const rect = node.getBoundingClientRect()

    const width = rect.width
    const mouseX = e.clientX - rect.left
    const xPct = mouseX / width - 0.5

    if (xPct > 0) {
      if (xPct > 0.25) {
        console.log('Move right -->')
      }
      console.log('right')
    } else {
      if (xPct < -0.25) {
        console.log('Move left -->')
      }
      console.log('left')
    }

    console.log(xPct)
  }

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={onDragEnd}
      style={{ x }}
      className={`flex h-[300px] w-[215px] origin-center items-center justify-center rounded-2xl border-[12px] border-[#F9BD2B] bg-[#22272D] [&:nth-child(1)]:mr-[-60px] [&:nth-child(1)]:scale-75 [&:nth-child(2)]:mr-[-60px]  [&:nth-child(2)]:scale-90 [&:nth-child(3)]:z-10  [&:nth-child(4)]:ml-[-60px] [&:nth-child(4)]:scale-90  [&:nth-child(5)]:ml-[-60px] [&:nth-child(5)]:scale-75`}
    >
      {' '}
      <p className="text-white"> {id} </p>{' '}
    </motion.div>
  )
}
