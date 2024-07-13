import {
  Checkbox,
  Color,
  Image,
  Link,
  List,
  Number,
  Select,
  Shape,
  Slot,
  Style,
  TextInput,
} from '@makeswift/runtime/controls'
import { GetColorName } from 'hex-color-to-color-name'

import { runtime } from '@/lib/makeswift/runtime'

import { ExternalLink } from './ExternalLink'

runtime.registerComponent(ExternalLink, {
  type: 'external link',
  label: 'External Link',
  props: {
    border: Style({ properties: [Style.Border, Style.BorderRadius] }),
    padding: Style({ properties: [Style.Padding] }),
    icon: Image({
      label: 'Icon',
      format: Image.Format.URL,
    }),
    alt: TextInput({ label: 'Alt Text', defaultValue: '' }),
    header: TextInput({ label: 'Headline', defaultValue: '' }),
    sub: TextInput({ label: 'Subline', defaultValue: '' }),
    link: Link(),
  },
})
