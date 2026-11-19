import { motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import { PI_URL, usePiDigits } from '../hooks/usePiDigits.ts'

const PAGE_SIZE = 10_000

const message = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4 },
}

export default function PiDigits() {
  const state = usePiDigits()
  const [page, setPage] = useState(1)

  if (state.status === 'ready') {
    const pageCount = Math.max(1, Math.ceil(state.text.length / PAGE_SIZE))
    const start = (page - 1) * PAGE_SIZE
    const end = Math.min(start + PAGE_SIZE, state.text.length)

    function goToPage(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      const requested = Number(new FormData(event.currentTarget).get('page'))
      if (Number.isInteger(requested) && requested >= 1 && requested <= pageCount) {
        setPage(requested)
      }
    }

    return (
      <>
        <nav aria-label="Digit pages" className="mb-4 flex flex-wrap items-center gap-3">
          <button type="button" className="underline disabled:opacity-50" disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <button type="button" className="underline disabled:opacity-50" disabled={page === pageCount} onClick={() => setPage(page + 1)}>
            Next
          </button>
          <form key={page} onSubmit={goToPage} className="flex items-center gap-2">
            <label htmlFor="digit-page">Page</label>
            <input id="digit-page" name="page" type="number" min={1} max={pageCount} defaultValue={page} required className="w-20 rounded border px-1" />
            <span>of {pageCount}</span>
            <button className="underline" type="submit">Go</button>
          </form>
          <a className="underline" href={PI_URL} download>Download all digits</a>
        </nav>
        <p className="mb-2" role="status">Decimal digits {start + 1}–{end}</p>
        <div>{page === 1 ? '3.' : ''}{state.text.slice(start, end)}</div>
      </>
    )
  }

  return (
    <motion.div {...message}>
      {state.status === 'loading' ? 'Loading...' : 'Could not load Pi digits.'}
    </motion.div>
  )
}
