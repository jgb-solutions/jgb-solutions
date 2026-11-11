import type { ImgHTMLAttributes } from 'react'
import manifest from '@/lib/image-manifest.json'

type ManifestEntry = { width: number; height: number; base: string; widths: Array<number> }
const images: Record<string, ManifestEntry | undefined> = manifest

type ResponsiveImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  src: string
  /** How wide the image is shown, for the browser to pick a size, e.g. "(min-width: 1024px) 33vw, 100vw". */
  sizes: string
}

/**
 * A project image as AVIF or WebP at the size the screen needs (made by
 * scripts/optimize-images.ts), with the original JPEG as the fallback. Images missing from the
 * manifest render as a plain <img>.
 */
export function ResponsiveImage({ src, sizes, ...props }: ResponsiveImageProps) {
  const entry = images[src]
  if (!entry) return <img src={src} {...props} />
  const srcSet = (ext: string) =>
    entry.widths.map(w => `${entry.base}-${w}.${ext} ${w}w`).join(', ')
  return (
    <picture className='contents'>
      <source type='image/avif' srcSet={srcSet('avif')} sizes={sizes} />
      <source type='image/webp' srcSet={srcSet('webp')} sizes={sizes} />
      <img src={src} width={entry.width} height={entry.height} {...props} />
    </picture>
  )
}
