import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS
  app.enableCors()
  app.setGlobalPrefix('v1')

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  )

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Account Book API')
    .setDescription('The Account Book API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const port = process.env.PORT ?? 3000
  await app.listen(port)
  console.log(`Application is running on: http://localhost:${port}`)
  console.log(`Swagger documentation: http://localhost:${port}/api`)
}
void bootstrap()
