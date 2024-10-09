import { PrismaClient } from '@prisma/client'
import { Hono } from 'hono'

const app = new Hono()
app.get('/',(c) => c.text('Hello Bun!'))

const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
          name: 'Alice',
          email: 'alice@prisma.io',
          password: 'password',
          profile: {
            create: { bio: 'I like turtles' },
          },
        },
      })
    
      const allUsers = await prisma.user.findMany({
        include: {
          profile: true,
        },
      })
      console.dir(allUsers, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


  export default app