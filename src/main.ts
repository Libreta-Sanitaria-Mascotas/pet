import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
//import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { envs } from './config';

async function bootstrap() {
  const { port, nodeEnv } = envs;
  const logger = new Logger('Pet-Service');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port,
    },
  });
  //app.setGlobalPrefix('api');
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // );
  //const config = new DocumentBuilder()
  //  .setTitle('Pet Service')
  //  .setDescription('API documentation for Pet Service')
  //  .setVersion('1.0')
  //  .addBearerAuth()
  //  .build();
  //const document = SwaggerModule.createDocument(app, config);
  //SwaggerModule.setup('docs', app, document);
  await app.listen();
  logger.log(`Pet Service is running on: ${port} in ${nodeEnv} mode`);
}
bootstrap();
