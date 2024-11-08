function getRandomKey() {
  const options = ['A', 'B', 'C', 'D']
  return options[Math.floor(Math.random() * options.length)]
}

function getRandomStat(min = 0, max = 1) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

export const MOCK_ITEM_DATA: Item[] = Array.from(
  { length: 40 },
  (_, index) => ({
    item_no: index + 1,
    key: getRandomKey(),
    p_difficulty: getRandomStat(),
    p_discrimination: getRandomStat(),
    metrics: {
      phancach: {
        A: getRandomStat(),
        B: getRandomStat(),
        C: getRandomStat(),
        D: getRandomStat(),
      },
      dokho: {
        A: getRandomStat(),
        B: getRandomStat(),
        C: getRandomStat(),
        D: getRandomStat(),
      },
      rpbis: {
        A: getRandomStat(),
        B: getRandomStat(),
        C: getRandomStat(),
        D: getRandomStat(),
      },
      tile: {
        A: getRandomStat(),
        B: getRandomStat(),
        C: getRandomStat(),
        D: getRandomStat(),
      },
      nhomcao: {
        A: getRandomStat(),
        B: getRandomStat(),
        C: getRandomStat(),
        D: getRandomStat(),
      },
      nhomthap: {
        A: getRandomStat(),
        B: getRandomStat(),
        C: getRandomStat(),
        D: getRandomStat(),
      },
    },
  })
)

export type Item = {
  item_no: number
  key: string
  p_difficulty: number
  p_discrimination: number
  metrics: {
    phancach: Record<string, number>
    dokho: Record<string, number>
    rpbis: Record<string, number>
    tile: Record<string, number>
    nhomcao: Record<string, number>
    nhomthap: Record<string, number>
  }
}
