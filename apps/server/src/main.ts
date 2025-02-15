import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.use(bodyParser.json({ limit: '50mb' })); // 设置JSON请求体大小限制为50MB
  const options = new DocumentBuilder()
    .setTitle('YouXiaoTong')
    .setDescription(
      '优校通，让校园缴费更优质、更便捷，一键搞定水电费、食堂充值，畅享无忧校园生活！',
    )
    .setVersion('1.00')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger/api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(8000);
}
bootstrap();
