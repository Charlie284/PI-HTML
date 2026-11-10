import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="p-5 leading-[normal]">
      <h1 className="my-[0.67em] text-[2em] font-bold text-accent">
        404 - Page not found
      </h1>
      <Link to="/" className="underline">
        Back to Pi
      </Link>
    </main>
  )
}
