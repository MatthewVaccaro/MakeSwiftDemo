'use client'

import Image from 'next/image'

import { Area, AreaChart, ResponsiveContainer } from 'recharts'

import { ImageWithDimensions } from '@/lib/types'

import { Hover } from '../Minor/Minor'

export const Major = ({
  background,
  color,
  icon,
  category,
  mainPoint,
  description,
  graphData = [],
  additionalContext,
}: {
  icon?: string
  background: string
  color: string
  category?: string
  mainPoint?: string
  description?: string
  graphData: number[]
  additionalContext: string
}) => {
  const mappedData = graphData.map(v => ({ value: v }))
  console.log({ icon })
  return (
    <Hover content={additionalContext}>
      <div
        style={{ background }}
        className="flex h-[207px] w-full max-w-[350px] flex-col justify-between rounded-xl px-4 py-4 transition-all duration-300 hover:scale-110"
      >
        <div>
          <div className="flex items-end gap-1">
            {icon && <Image src={icon} width={24} height={24} alt={`${category} icon`} />}
            <p style={{ color }} className="font-semibold">
              {category}
            </p>
          </div>
        </div>
        <div>
          <div className="flex h-16 w-full items-end justify-between gap-6">
            <h2 style={{ color }} className=" font-semibold leading-[60px] ">
              {mainPoint}
            </h2>
            <ResponsiveContainer width="100%" height="100%" className="w-full">
              <AreaChart width={200} height={400} data={mappedData}>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  fill={color}
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p style={{ color }} className="mt-2 opacity-75">
            {description}
          </p>
        </div>
      </div>
    </Hover>
  )
}
