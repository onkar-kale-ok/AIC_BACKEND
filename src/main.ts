import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    { 
      methods: ['POST', 'PUT', 'DELETE', 'GET']
    }
  );
  app.useGlobalPipes(new ValidationPipe()); // To ensure the protection of endpoints to receiving incorrect data.
  /**swagger implimentation */
  const options = new DocumentBuilder()
    .setTitle('Nestjs PostgreSQL')
    .setDescription(
      'This is a learning APP, which is containing demo of a basic project setup with Nest.js + Typeorm + PostgreSQL',
    )
    .setVersion('1.0')
    .addServer(`http://localhost:${process.env.APP_PORT}`, 'Local environment')
    .addTag('APIs')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('apis', app, document);

  await app.listen(process.env.APP_PORT);
  console.log(`App is listning on : http://localhost:${process.env.APP_PORT}`)
}
bootstrap();
