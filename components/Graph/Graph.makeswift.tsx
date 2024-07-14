import { ComponentIcon } from '@makeswift/runtime'
import {
  Checkbox,
  Color,
  List,
  Number,
  Select,
  Shape,
  Slot,
  TextInput,
} from '@makeswift/runtime/controls'

import { runtime } from '@/lib/makeswift/runtime'

import { Graph } from './Graph'

runtime.registerComponent(Graph, {
  type: 'graph',
  label: 'Graph',
  props: {
    legends: Checkbox({ label: 'Legends', defaultValue: true }),
    title: TextInput({ label: 'Title', defaultValue: 'My Graph' }),
    bars: List({
      label: 'Graph Bars',
      type: Shape({
        type: {
          name: TextInput({ label: 'Bar Name', defaultValue: 'myBar' }),
          color: Color({ label: 'Bar Color', defaultValue: 'red' }),
          type: Select({
            label: 'Bar Type',
            defaultValue: 'curved',
            options: [
              { label: 'Curved', value: 'curved' },
              { label: 'Straight', value: 'straight' },
            ],
          }),
          values: List({
            label: 'Values',
            type: Number({ label: 'Value', defaultValue: 0 }),
            getItemLabel(item) {
              return `${item}` ?? '0'
            },
          }),
        },
      }),
      getItemLabel(item) {
        return `${item?.name}` ?? 'Bar Name'
      },
    }),
    xAxis: Shape({
      type: {
        label: TextInput({ label: 'X Axis Label', defaultValue: 'Label' }),
        values: List({
          label: 'Values',
          type: TextInput({ label: 'Value', defaultValue: '' }),
          getItemLabel(item: string | undefined) {
            return `${item}` ?? '0'
          },
        }),
      },
    }),
    yAxis: Checkbox({ label: 'Show Y Axis', defaultValue: false }),
  },
})
