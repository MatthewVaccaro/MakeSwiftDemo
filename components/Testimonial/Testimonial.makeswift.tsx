import { Color, Combobox, Image, TextInput } from '@makeswift/runtime/controls'
import axios from 'axios'

import { runtime } from '@/lib/makeswift/runtime'

import { Testimonial } from './Testimonial'

type AudioFiles = {
  gore: string
  christian: string
  flo: string
  andrew: string
}

type ComboboxOption<T> = {
  id: string
  label: string
  value: T
}

runtime.registerComponent(Testimonial, {
  type: 'testimonial',
  label: 'Testimonial',
  props: {
    color: Color({
      label: 'Brand Color',
      defaultValue: '#EDAC34',
    }),
    name: TextInput({ label: 'Name', defaultValue: '' }),
    employer: TextInput({ label: 'Employer', defaultValue: '' }),
    position: TextInput({ label: 'Position', defaultValue: '' }),
    photo: Image({
      label: 'icon',
      format: Image.Format.WithDimensions,
    }),
    audio: Combobox({
      label: 'Audio',
      async getOptions(query) {
        const { data } = await axios.get<AudioFiles>('http://localhost:3000/audioList')
        return Object.entries(data)
          .reduce((struct, [key, url]) => {
            struct.push({ id: key, label: key, value: url })
            return struct
          }, [] as ComboboxOption<string>[])
          .filter(option => option.label.toLowerCase().includes(query.toLowerCase()) ?? '')
      },
    }),
  },
})
