export const blurImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNUUHCpBwAB8QEFGb0nOgAAAABJRU5ErkJggg=="
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="2s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (svg: string) =>
  typeof window === 'undefined'
    ? Buffer.from(svg).toString('base64')
    : window.btoa(svg)

const base64Shimmer = (w: number, h: number) => `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`

export default base64Shimmer