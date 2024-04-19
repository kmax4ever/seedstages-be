import TokenFactory from '../abis/ReDAOIOUTokenFactory.json'
import SeedStage from '../abis/ReDAOSeedStage.json'
import SeedStageFactory from '../abis/ReDAOSeedStageFactory.json'
require('dotenv').config()

export const CONTRACT_NEED_SYNC = [
  process.env.SEEDSTAGE_FACTORY_CONTRACT,
  process.env.TOKEN_FACTORY_CONTRACT
]
export const EVENTS = {
  '0xc331dc3e37e2ab4d6e65d42a119ffdfab8481b9be24d26704f9f4b4a331d4dd0':
    'TokenCreated',
  '0x742a6de8557256bd59fe4a22d3cc4cefefe3eb0a94494d9eed196e0ab496f51e':
    'RoundCreated',
  '0x1bfe99ad5ce4d1ae13655007c460a9d89b737f15b2ec86c60b1e531b76db69c5':
    'UserDeposited',
  '0xd739efca570c496acabced1a81089a2530ff692329ab57b3b05ffd5759fb6f15':
    'ProjectCreated',
  '0xe9aacf3b9877a77a1a8990b1f3df54b3cae09888cadb6dbee452fb474325f536':
    'SeedStageCreated'
}
export const ABIS = [
  ...TokenFactory.abi,
  ...SeedStage.abi,
  ...SeedStageFactory.abi
]
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
