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

import { Minor } from './Minor'

runtime.registerComponent(Minor, {
  type: 'minor',
  label: 'Minor Stat',
  props: {
    image: Image({
      label: 'Graphics',
      format: Image.Format.WithDimensions,
    }),
    background: Color({ label: 'Background Color', defaultValue: '#EA3BA7' }),
    imageAlt: TextInput({ label: 'Image Alt', defaultValue: '' }),
    sub: TextInput({ label: 'Subline', defaultValue: '' }),
    header: TextInput({ label: 'Headline', defaultValue: '' }),
    additionalContent: TextInput({ label: 'Additional Content', defaultValue: '' }),
  },
})
