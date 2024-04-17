import { fibonacci, sleep } from './common'
import fetch from 'node-fetch'

export async function sendCallback(url: string, data: any) {
  const fibs = fibonacci(5)

  for (const key in fibs) {
    if (Object.prototype.hasOwnProperty.call(fibs, key)) {
      const fib = fibs[key]
      try {
        const resData = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
          timeout: 10000
        })

        if (resData.ok) {
          console.log('Send callback succeed.')
          return
        }
      } catch (error) {
        console.log(error.message)
      }

      sleep(fib * 1000)
    }
  }
}
