import '../../dotenv.config'; // Импортируйте конфигурацию переменных окружения
import { PrismaClient } from '@prisma/client';

interface Global {
  prisma: PrismaClient;
}

declare const global: Global;

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Чтобы избежать создания новых клиентов при каждом перезапуске сервера в режиме разработки
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

console.log(`Connecting to database: ${process.env.DATABASE_URL}`);

export default prisma;
