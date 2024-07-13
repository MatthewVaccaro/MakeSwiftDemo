export type Pattern = { x: number[]; y: number[]; scale?: number[]; opacity?: number[] }

export function generateCirclePoints(width: number, height: number, orbSize: number) {
  const x = []
  const y = []
  const points = 52

  const centerX = width / 1.5 - orbSize
  const centerY = height / 2 - orbSize
  const radius = Math.max(width, height) / 4

  for (let i = 0; i < points; i++) {
    const angle = (i / (points - 1)) * 2 * Math.PI
    const xCords = centerX + radius * Math.cos(angle)
    const yCords = centerY + radius * Math.sin(angle)
    x.push(Math.round(xCords))
    y.push(Math.round(yCords))
  }

  return { x, y }
}

export function generateDiamondPoints(
  width: number,
  height: number,
  orbSize: number,
  padding: number = 0
): Pattern {
  const adjustedHeight = height - orbSize - padding
  const adjustedWidth = width - orbSize - padding

  const x = [padding, adjustedWidth / 2, adjustedWidth, adjustedWidth / 2, padding]
  const y = [adjustedHeight / 2, padding, adjustedHeight / 2, adjustedHeight, adjustedHeight / 2]

  return { x, y }
}

export function generateTrianglePoints(
  width: number,
  height: number,
  orbSize: number,
  padding: number = 0
): Pattern {
  const adjustedHeight = height - orbSize - padding
  const adjustedWidth = width - orbSize - padding

  const x = [padding, adjustedWidth / 2, adjustedWidth, padding]
  const y = [adjustedHeight, padding, adjustedHeight, adjustedHeight]

  return { x, y }
}

export function generateCarouselPoints(
  width: number,
  height: number,
  orbSize: number,
  padding: number = 0
): Pattern {
  const adjustedHeight = height - orbSize - padding
  const adjustedWidth = width - orbSize - padding

  const x = [padding, adjustedWidth / 2, adjustedWidth, adjustedWidth / 2, padding]
  const y = [
    adjustedHeight / 2,
    adjustedHeight / 2,
    adjustedHeight / 2,
    adjustedHeight / 2,
    adjustedHeight / 2,
  ]
  const scale = [0.7, 1.2, 0.7, 0.3, 0.7]
  const opacity = [0.7, 1, 0.7, 0.4, 0.7]

  return { x, y, scale, opacity }
}

export function reverseFrames({
  x,
  y,
  scale,
  opacity,
}: {
  x: number[]
  y: number[]
  scale?: number[]
  opacity?: number[]
}) {
  // This only works because all animations are are five
  // If there were animation more then this I would write real logic to support the effort
  //
  //
  console.log(x.length, y.length)
  const newX = [x[2], x[1], x[0], x[3], x[2]]
  const newY = [y[2], y[1], y[0], y[3], y[2]]
  const newSacle = scale ? [scale[2], scale[1], scale[0], scale[3], scale[2]] : []
  const newOpacity = opacity ? [opacity[2], opacity[1], opacity[0], opacity[3], opacity[2]] : []

  return { x: newX, y: newY, scale: newSacle, opacity: newOpacity }
}
