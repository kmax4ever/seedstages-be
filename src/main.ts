import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import { json, urlencoded } from 'express'
import { getBodyParserOptions } from '@nestjs/platform-express/adapters/utils/get-body-parser-options.util'
import { CmsAdminModule } from './modules/aggregators/admin-cms/admin-cms.module'
import { ExternalsModule } from './modules/aggregators/externals/externals.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false })

  app.enableCors()
  app.use(helmet())
  app.useGlobalPipes(new ValidationPipe())

  // Kafka

  // Logger

  // Monitor

  const internalOptions = new DocumentBuilder()
    .setTitle('rAsset Internal Swagger')
    .setDescription('The Internal API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const internalDocument = SwaggerModule.createDocument(app, internalOptions, {
    include: []
  })
  SwaggerModule.setup('swagger-internal', app, internalDocument)

  const adminCmsConfig = new DocumentBuilder()
    .setTitle('rAsset Admin')
    .setDescription('rAsset Admin API document')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const adminCmsDocument = SwaggerModule.createDocument(app, adminCmsConfig, {
    include: [CmsAdminModule]
  })
  SwaggerModule.setup('/swagger-admin', app, adminCmsDocument)

  const depositoryConfig = new DocumentBuilder()
    .setTitle('redao External')
    .setDescription('redao External API document')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const depositoryDocument = SwaggerModule.createDocument(
    app,
    depositoryConfig,
    {
      include: [ExternalsModule]
    }
  )
  SwaggerModule.setup('/swagger-externals', app, depositoryDocument)

  app.use(json(getBodyParserOptions(true, { limit: '50mb' })))
  app.use(urlencoded(getBodyParserOptions(true, { limit: '50mb' })))

  await app.listen('8080')

  const logger = new Logger('Main')
  logger.log('REST port: 8080')
}
bootstrap()
