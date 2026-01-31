'use client'

import dynamic from 'next/dynamic'

// Dynamically import PixelBlast to avoid SSR issues with Three.js
const PixelBlast = dynamic(() => import('./PixelBlast'), {
  ssr: false,
  loading: () => null,
})

export default function Background() {
  return (
    <div className="fixed inset-0 z-0">
      <PixelBlast
        variant="circle"
        pixelSize={4}
        color="#ffffff"
        patternScale={1.5}
        patternDensity={0.2}
        enableRipples={true}
        rippleIntensityScale={0.8}
        rippleThickness={0.15}
        rippleSpeed={0.25}
        speed={0.3}
        edgeFade={0.3}
        transparent={true}
      />
    </div>
  )
}
