export type ImageWithDimensions = {
  url: string
  dimensions: {
    width: number
    height: number
  }
}

export type LinkValue = {
  href: string
  target?: '_blank' | '_self'
}
