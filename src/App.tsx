import { ReactLenis } from 'lenis/react'
import { Route, Routes } from 'react-router-dom'
import PiViewer from './pages/PiViewer.tsx'
import NotFound from './pages/NotFound.tsx'

export default function App() {
  return (
    <>
      <ReactLenis root />
      <Routes>
        <Route path="/" element={<PiViewer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
