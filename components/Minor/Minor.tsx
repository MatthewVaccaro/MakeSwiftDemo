'use client'

import Image from 'next/image'

import * as HoverCard from '@radix-ui/react-hover-card'

import { ImageWithDimensions } from '@/lib/types'

export const Minor = ({
  image,
  background,
  sub,
  header,
  imageAlt,
  additionalContent,
}: {
  image?: ImageWithDimensions
  background: string
  imageAlt: string
  sub: string
  header: string
  additionalContent: string
}) => {
  return (
    <Hover content={additionalContent}>
      <div className="min-h-[207px] w-full overflow-hidden rounded-xl bg-white transition-all duration-200 hover:scale-110">
        <div style={{ background }} className="h-[125px] w-full">
          {image && (
            <Image
              className="ml-[1px]"
              width={image.dimensions.width}
              height={image.dimensions.height}
              src={image.url}
              alt={imageAlt}
            />
          )}
        </div>

        <div className="flex h-full w-full flex-col gap-2 bg-white p-2">
          <p className="text-center font-light text-[#15181C]">{sub}</p>
          <h5 className="text-center font-semibold text-[#15181C]"> {header} </h5>
        </div>
      </div>
    </Hover>
  )
}

type Hoverprops = {
  children: React.ReactNode | JSX.Element | JSX.Element[] | string
  content: string
}
export const Hover = ({ children, content }: Hoverprops) => {
  return (
    <HoverCard.Root openDelay={150}>
      <HoverCard.Trigger asChild>{children}</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="w-[300px] rounded-md border-2 border-[#ffffff20]  bg-[#22222230] p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] backdrop-blur-xl data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all"
          sideOffset={-25}
        >
          <p className="text-[14px] italic text-[#fff] opacity-85">{content}</p>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
