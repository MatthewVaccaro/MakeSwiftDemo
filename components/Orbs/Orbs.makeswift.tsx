import { Checkbox, Color, List, Number, Select, Shape, Slot } from '@makeswift/runtime/controls'

import { runtime } from '@/lib/makeswift/runtime'

import { Orbs } from './Orbs'

runtime.registerComponent(Orbs, {
  type: 'orbs',
  label: 'Orbs Hero',
  props: {
    slot: Slot(),
    opacity: Number({
      label: 'Background Opacity',
      defaultValue: 0.5,
      min: 0,
      max: 1,
      step: 0.05,
    }),
    orbs: List({
      label: 'orb',
      type: Shape({
        type: {
          color: Color({ defaultValue: 'red', label: 'color' }),
          movementType: Select({
            label: 'Movement Type',
            options: [
              { value: 'diamond', label: 'Diamond' },
              { value: 'triangle', label: 'Triangle' },
              { value: 'carousel', label: 'Carousel' },
            ],
            defaultValue: 'diamond',
          }),
          duration: Number({
            label: 'Duration',
            defaultValue: 20,
            min: 1,
            max: 60,
          }),
          padding: Number({
            label: 'Padding',
            defaultValue: 0,
            min: 1,
            max: 120,
            step: 5,
          }),
          orbSize: Number({
            label: 'Orb Size',
            defaultValue: 90,
            min: 40,
            max: 415,
            step: 5,
          }),
          reverse: Checkbox({
            label: 'Reverse Movement',
            defaultValue: false,
          }),
          heightOverride: Number({
            label: 'Height Override',
            max: 1000,
            min: 0,
          }),
        },
      }),
    }),
  },
})
