const getDatabaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.DEV_POSTGRES_PRISMA_URL;
  } else {
    return process.env.POSTGRES_PRISMA_URL;
  }
}

process.env.DATABASE_URL = getDatabaseUrl();

console.log(`Current NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`Loaded DATABASE_URL: ${process.env.DATABASE_URL}`);