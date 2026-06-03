// @ts-check
/**
 * Seed Script — test user banana ke liye
 * Run: node tests/seed-test-user.js
 * 
 * Ye script ek verified test user create karta hai DB mein
 * jo Playwright global-setup use karega login ke liye.
 */

const path = require('path');

async function seedTestUser() {
  const { PrismaClient } = require('@prisma/client');
  const { hash } = require('@node-rs/argon2');

  const prisma = new PrismaClient();

  const TEST_EMAIL = process.env.TEST_EMAIL || 'playwright@modewelt.com';
  const TEST_PASSWORD = process.env.TEST_PASSWORD || 'playwright123';
  const TEST_USERNAME = process.env.TEST_USERNAME || 'playwrightuser';

  try {
    console.log(`\n🌱 Seeding test user: ${TEST_EMAIL}`);

    // Check if already exists
    const existing = await prisma.user.findUnique({ where: { email: TEST_EMAIL } });

    if (existing) {
      // Update to make sure isVerified = true
      await prisma.user.update({
        where: { email: TEST_EMAIL },
        data: { isVerified: true, isDeleted: false, isBanned: false },
      });
      console.log('✅ Test user already exists — updated isVerified=true');
    } else {
      // Create new user
      const passwordHash = await hash(TEST_PASSWORD, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });

      await prisma.user.create({
        data: {
          username: TEST_USERNAME,
          displayName: 'Playwright Tester',
          email: TEST_EMAIL,
          phone: '9000000000',
          passwordHash,
          isVerified: true,   // Already verified — login ke liye
          isBanned: false,
          isDeleted: false,
        },
      });
      console.log('✅ Test user created successfully!');
    }

    console.log(`\n📋 Test Credentials:`);
    console.log(`   Email:    ${TEST_EMAIL}`);
    console.log(`   Password: ${TEST_PASSWORD}`);
    console.log(`   Username: ${TEST_USERNAME}`);
    console.log('\n🚀 Ab tests/.env.test mein ye values dalo aur npm test chalaao\n');

  } catch (err) {
    console.error('❌ Error seeding test user:', err.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedTestUser();
