import { handle } from 'hono/vercel'
import app from '../../../src/app/api/wallet/route'

export const runtime = 'edge'

export const GET = handle(app)
export const POST = handle(app)
