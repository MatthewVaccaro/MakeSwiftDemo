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
import { GetColorName } from 'hex-color-to-color-name'

import { runtime } from '@/lib/makeswift/runtime'

import { Gradient } from './Gradient'

runtime.registerComponent(Gradient, {
  type: 'gradient',
  label: 'Gradient Background',
  props: {
    colors: List({
      label: 'Graident Colors',
      type: Color({ label: 'color', defaultValue: '#EA3BA7' }),
      getItemLabel() {
        return 'color'
      },
    }),
    degree: Number({ label: 'degree', min: 0, max: 360, step: 5, defaultValue: 45 }),
    height: Number({ label: 'height', min: 200, step: 25, defaultValue: 600 }),
    opacity: Number({ label: 'opacity', min: 0, max: 1, step: 0.1, defaultValue: 0.5 }),
    flip: Checkbox({ label: 'Flip Gradient', defaultValue: false }),
    slot: Slot(),
  },
})
