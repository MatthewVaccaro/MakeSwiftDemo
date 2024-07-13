import {
  Checkbox,
  Color,
  Image,
  List,
  Number,
  Select,
  Shape,
  Slot,
  TextInput,
} from '@makeswift/runtime/controls'

import { runtime } from '@/lib/makeswift/runtime'

import { Major } from './Major'

runtime.registerComponent(Major, {
  type: 'Major',
  label: 'Major Stat',
  props: {
    icon: Image({
      label: 'Icon',
      format: Image.Format.URL,
    }),
    background: Color({ label: 'Background Color', defaultValue: '#EA3BA7' }),
    color: Color({ label: 'Forground Color', defaultValue: '#FFFFFF' }),
    category: TextInput({ label: 'Category', defaultValue: '' }),
    mainPoint: TextInput({ label: 'Main Content', defaultValue: '' }),
    description: TextInput({ label: 'Additional Details', defaultValue: '' }),
    additionalContext: TextInput({ label: 'Additional Context', defaultValue: '' }),
    graphData: List({
      label: 'Values',
      type: Number({ step: 5, min: 1, max: 100, defaultValue: 0 }),
      getItemLabel(item) {
        return `${item}` ?? '0'
      },
    }),
  },
})
