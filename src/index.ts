import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: "x@gmail.com",
      name: "x",
    },
  });

  await prisma.user.create({
    data: {
      email: "y@gmail.com",
      name: "y",
      posts: {
        create: [
          {
            title: "post 1",
            content: "content for post 1",
          },
          {
            title: "post 2",
            content: "content for post 2",
          },
        ],
      },
    },
  });

  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  console.log(users);

  const user = await prisma.user.findUnique({
    where: {
      email: "y@gmail.com",
    },
    include: {
      posts: true,
    },
  });

  console.log(user);
}

main();
