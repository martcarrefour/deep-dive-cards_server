import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: false });
    app.enableShutdownHooks();
    app.setGlobalPrefix('api');
    app.enableCors({ credentials: true, origin: true });
    app.use(cookieParser());
    const config = new DocumentBuilder()
        .setTitle('Deep Dive Card API')
        .setDescription('---The DDC API Description---')
        .setVersion('1.0')
        .addBearerAuth()

        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document, {
        swaggerOptions: { persistAuthorization: true },
    });
    await app.listen(3000);
}
bootstrap();
