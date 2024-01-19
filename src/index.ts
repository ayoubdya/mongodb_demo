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

  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  console.log("All the users in MongoDB:", allUsers);

  const userWithPosts = await prisma.user.findUnique({
    where: {
      email: "y@gmail.com",
    },
    select: {
      name: true,
      email: true,
      posts: {
        select: {
          title: true,
          content: true,
        },
      },
    },
  });

  console.log("Specific user with his posts:", userWithPosts);

  const postsByUser = await prisma.post.findMany({
    where: {
      author: {
        email: "y@gmail.com",
      },
    },
    select: {
      title: true,
      content: true,
    },
  });

  console.log("Find posts by user email:", postsByUser);
}

main();
