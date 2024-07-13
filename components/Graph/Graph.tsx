'use client'

import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'

type GraphBar = {
  name: string
  color: string
  type: 'straight' | 'curved'
  values: (string | number)[]
}
type XAxisProps = {
  label: string
  values: (string | number)[]
}

type GraphProps = {
  title?: string
  legends?: boolean
  bars: GraphBar[]
  xAxis: XAxisProps
  yAxis: boolean
}

export function Graph({ legends, title, bars, xAxis, yAxis = false }: GraphProps) {
  const cache = bars.reduce(
    (struct, current) => {
      current.values.forEach((value, index) => {
        if (struct[index]) {
          struct[index] = {
            ...struct[index],
            [current.name]: value,
          }
        } else {
          struct[index] = { [current.name]: value, [`xAxis_${xAxis.label}`]: xAxis.values[index] }
        }
      })

      return struct
    },
    {} as Record<string, Record<string, number | string>>
  )

  const mappedData = Object.values(cache).map(value => value)

  console.log({ mappedData, xAxis })

  return (
    <div className="w-full">
      <h2 className="my-3 font-semibold text-white"> {title} </h2>
      {legends && (
        <div className="flex gap-6">
          {bars.map(v => (
            <div className="flex items-center gap-2">
              <div style={{ background: v.color }} className="h-2 w-4 rounded-full" />
              <h6 className="font-medium capitalize text-white opacity-80"> {v.name} </h6>
            </div>
          ))}
        </div>
      )}

      <div className="w-full overflow-x-scroll">
        <div className="mx-auto h-[600px] w-[800px] min-w-[600px]">
          <ResponsiveContainer height="100%" width="100%">
            <LineChart width={200} height={200} data={mappedData}>
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              <XAxis dataKey={`xAxis_${xAxis.label}`} axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tick={yAxis} tickLine={false} />
              {mappedData.map(v => (
                <ReferenceLine
                  key={v[`xAxis_${xAxis.label}`]}
                  x={v[`xAxis_${xAxis.label}`]}
                  stroke="#D9D9D9"
                  opacity={0.1}
                />
              ))}
              {bars.map(value => (
                <Line
                  type={value.type === 'straight' ? 'linear' : 'monotone'}
                  key={value.name}
                  dataKey={value.name}
                  stroke={value.color}
                  strokeWidth={12}
                  dot={false}
                  strokeLinecap="round"
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className=" rounded-xl border-2 border-white border-opacity-15 bg-white bg-opacity-5 p-3 backdrop-blur-md">
        <p className="mb-3 font-semibold text-white text-opacity-80">{label}</p>
        <div className="flex flex-col gap-2">
          {payload.map(v => {
            if (
              (typeof v.dataKey === 'string' && !v.dataKey.includes('_')) ||
              typeof v.dataKey === 'number'
            ) {
              return (
                <div key={label + v.name} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: v.color }} />
                  <p className="capitalize text-white">
                    {v.name} <span className="text-white">{v.value} </span>
                  </p>
                </div>
              )
            }
          })}
        </div>
      </div>
    )
  }

  return null
}
