export const COHORT_NAME = '2303-ftb-et-web-pt'

export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

const returned = await fetch(`${BASE_URL}/posts`)

