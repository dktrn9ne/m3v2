import { useEffect, useRef, memo } from 'react'
import Hls from 'hls.js'

const VIDEO_URL = 'https://cdn.midjourney.com/video/e25ec540-9863-4415-9f48-f86a7969a8ce/1.mp4'

const BackgroundVideo = memo(function BackgroundVideo() {
  const videoRef = useRef(null)
  const hlsRef   = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Direct MP4 — no HLS needed
    video.src = VIDEO_URL
    video.load()

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked — video stays paused (fine for background)
      })
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }
      video.pause()
      video.removeAttribute('src')
      video.load()
    }
  }, [])

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover -z-10"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
    />
  )
})

export default BackgroundVideo
