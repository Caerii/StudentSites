import ContributionGallery from './ContributionGallery'
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-12">
      <ContributionGallery />
      <Toaster />
    </main>
  )
}
