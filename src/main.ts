import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableShutdownHooks();
    app.setGlobalPrefix('api');
    app.enableCors();
    app.use(cookieParser());
    const config = new DocumentBuilder()
        .setTitle('Deep Dive Card API')
        .setDescription('---The DDC API Description---')
        .setVersion('1.0')
        .addTag('ddc')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
