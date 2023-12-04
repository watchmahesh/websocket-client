import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { WsAdapter } from '@nestjs/platform-ws';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  // Load environment variables from .env
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(3002);
}
bootstrap();
