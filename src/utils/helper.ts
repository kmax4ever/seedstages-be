export const waitMs = (msDuration: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null)
    }, msDuration)
  })
}
