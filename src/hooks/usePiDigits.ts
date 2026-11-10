import { useEffect, useState } from 'react'

const PI_URL = `${import.meta.env.BASE_URL}Pi.txt`

export type PiDigitsState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; text: string }

/** Fetches the static Pi.txt dataset and prefixes it with the leading "3.". */
export function usePiDigits(): PiDigitsState {
  const [state, setState] = useState<PiDigitsState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    fetch(PI_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok')
        return response.text()
      })
      .then((data) => {
        setState({ status: 'ready', text: `3.${data}` })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setState({ status: 'error' })
        console.error(error)
      })

    return () => controller.abort()
  }, [])

  return state
}
