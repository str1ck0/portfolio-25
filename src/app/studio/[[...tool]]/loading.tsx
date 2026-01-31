export default function StudioLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#101112]">
      <div className="text-center">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        <p className="text-sm text-white/40">Loading Studio...</p>
      </div>
    </div>
  )
}
