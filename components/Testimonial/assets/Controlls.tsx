export const Play = ({ fill = '#EA3BA7' }: { fill?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M28.4223 14.2111C29.8964 14.9482 29.8964 17.0518 28.4223 17.7889L2.89443 30.5528C1.56462 31.2177 -1.3223e-06 30.2507 -1.25731e-06 28.7639L-1.41453e-07 3.23607C-7.64645e-08 1.7493 1.56463 0.782311 2.89443 1.44721L28.4223 14.2111Z"
      fill={fill}
    />
  </svg>
)

export const Pause = ({ fill = '#EA3BA7' }: { fill?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="13.4737" height="32" rx="3.04762" fill={fill} />
    <rect x="18.5264" width="13.4737" height="32" rx="3.04762" fill={fill} />
  </svg>
)
