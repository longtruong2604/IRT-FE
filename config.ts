import { z } from 'zod'

const configSchema = z.object({
  API_ENDPOINT: z.string(),
})

const configProject = configSchema.safeParse({
  API_ENDPOINT: process.env.API_ENDPOINT,
})

if (!configProject.success) {
  console.error(configProject.error.errors)
  throw new Error('Invalid env config')
}

const envConfig = configProject.data
export default envConfig
