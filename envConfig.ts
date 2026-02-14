import { loadEnvConfig } from '@next/env'

const projectDir = process.cwd()

// set dev to true if NODE_ENV is not set
const dev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

loadEnvConfig(projectDir, dev)