import Image from 'next/image'
import Link from 'next/link'

import { LinkValue } from '@/lib/types'

import externalIcon from './externalIcon.svg'

type Props = {
  border: string
  padding: string
  icon?: string
  alt: string
  header: string
  sub: string
  link?: LinkValue
}

export const ExternalLink = ({ border, padding, icon, alt, header, sub, link }: Props) => {
  return link ? (
    <Link className="w-full no-underline" {...link}>
      <div className={`flex w-full items-center justify-between ${padding} ${border}`}>
        <div className="flex gap-2">
          {icon && <Image src={icon} alt={alt} width={44} height={44} />}
          <div className="flex flex-col gap-2">
            <h5 className="font-semibold text-white"> {header} </h5>
            <p className="font-medium text-white opacity-70"> {sub} </p>
          </div>
        </div>
        <Image src={externalIcon} alt="external link icon" width={24} height={24} />
      </div>
    </Link>
  ) : (
    <div />
  )
}
