const { PrismaClient } = require('@prisma/client');
const faker = require('faker');

const prisma = new PrismaClient();

const TECHSTACK_COUNT = 100;
const PROJECT_COUNT = 500;
const BLOG_COUNT = 2000;
const TAG_COUNT = 100;

async function seed() {
  // Seed TechStacks
  const techStacks = [];
  for (let i = 0; i < TECHSTACK_COUNT; i++) {
    techStacks.push({
      id : i+1,
      description: faker.lorem.sentence(),
      name: faker.lorem.word(),
      logo_link: faker.image.imageUrl()
    });
  }

  // Seed Projects
  const projects = [];
  for (let i = 0; i < PROJECT_COUNT; i++) {
    projects.push({
      id : i+1,
      hero_image_link: faker.image.imageUrl(), 
      title: faker.lorem.words(3),
      sub_title: faker.lorem.sentence(),
      content: faker.lorem.sentence(),
      date: faker.date.recent(),
      github_link: faker.internet.url(),
      deployed_link: faker.internet.url(),
      blog_link: faker.internet.url(),
      type: faker.lorem.word(),
      techstacks: {
        connect: techStacks.slice(i % TECHSTACK_COUNT, (i % TECHSTACK_COUNT) + 2).map(el => ({ id: el.id })),
      },
      
    });
  }

  const tags = [];
  const generatedTagNames = new Set();

  for (let i = 0; i < TAG_COUNT; i++) {
    let tagName;
    do {
        tagName = faker.lorem.words(1);
    } while (generatedTagNames.has(tagName));
    generatedTagNames.add(tagName);


    tags.push({
      id : i+1,
      tag_name: tagName,
      tag_description: faker.lorem.sentence(),
    });
  }

  // Seed Blogs
  const blogs = [];
  for (let i = 0; i < BLOG_COUNT; i++) {
    blogs.push({
      title: faker.lorem.words(4),
      hero_image: faker.image.imageUrl(),
      sub_title: faker.lorem.sentence(),
      content:  faker.lorem.sentence(4),
      tags: {
        connect: tags.slice(i % TAG_COUNT, (i % TAG_COUNT) + 2).map(el => ({ id: el.id })),
      },
    });
  }


//   await prisma.techStack.createMany( { data: [...techStacks] } );

  //Create it inside loop:
//   for(let project of projects){
//       await prisma.project.create({ data: {...project} } );
//   }

  await prisma.tag.createMany({ data: [...tags] } );

  for(let blog of blogs){
      await prisma.blog.create({ data: {...blog } } );
  }

}

seed()
  .then(() => {
    console.log('Seeding completed successfully.');
  })
  .catch((e) => {
    console.error('Error seeding data:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });