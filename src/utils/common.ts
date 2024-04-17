import { randomInt } from 'crypto'

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function fibonacci(number: number) {
  let n1 = 0
  let n2 = 1
  let nextTerm = 0
  const fibs = []
  for (let i = 1; i <= number; i++) {
    fibs.push(n1)
    nextTerm = n1 + n2
    n1 = n2
    n2 = nextTerm
  }
  return fibs
}

export function generateRandomCode(prefixCode: string, suffixCode: string) {
  const uuid = randomInt(100000, 999999)
  return `${prefixCode}${uuid.toString()}${suffixCode}`
}

export const validateEmail = (email: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return email.match(regex)
}
