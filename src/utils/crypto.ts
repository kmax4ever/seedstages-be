import {
  createPrivateKey,
  createPublicKey,
  generateKeyPairSync,
  privateDecrypt,
  publicEncrypt,
  verify,
  sign,
  createHash
} from 'crypto'

export async function generateKeypair() {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    // The standard secure default length for RSA keys is 2048 bits
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  })

  console.log('publicKey', publicKey)
  console.log('privateKey', privateKey)
  return { publicKey, privateKey }
}

export async function rsaEncrypt(publicKey: string, dataToEncrypt: string) {
  const publicKeyObj = createPublicKey(Buffer.from(publicKey, 'base64'))

  const encryptedData = publicEncrypt(
    {
      key: publicKeyObj
    },
    // We convert the data string to a buffer using `Buffer.from`
    Buffer.from(dataToEncrypt)
  )
  return encryptedData.toString('base64')
}

export async function rsaDecrypt(privateKey: string, encryptedData: string) {
  const privateKeyObj = createPrivateKey(Buffer.from(privateKey, 'base64'))
  const decryptedData = privateDecrypt(
    {
      key: privateKeyObj
    },
    Buffer.from(encryptedData, 'base64')
  )
  return decryptedData.toString()
}

export async function verifyData(
  publicKey: string,
  signature: string,
  data: string
) {
  try {
    const isValid = verify(
      'RSA-SHA256',
      Buffer.from(data),
      Buffer.from(publicKey, 'base64'),
      Buffer.from(signature, 'base64')
    )
    return isValid
  } catch (error) {
    return false
  }
}

export async function signData(privateKey: string, data: string) {
  const signature = sign(
    'RSA-SHA256',
    Buffer.from(data),
    Buffer.from(privateKey, 'base64')
  ).toString('base64')
  return signature
}

export async function hashMd5Data(data: string) {
  const hashData = createHash('md5').update(data).digest('hex')
  return hashData
}
