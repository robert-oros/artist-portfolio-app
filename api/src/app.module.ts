// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioItem } from './entities/portfolio-item.entity';
import { PortfolioController } from './controllers/portfolio.controller';
import { PortfolioService } from './services/portfolio.service';
import { PortfolioItemRepository } from './repositories/portfolio-item.repository';
import { FileUploadController } from './controllers/file-upload.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'portfolio.db',
      entities: [PortfolioItem],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([PortfolioItem]),
  ],
  controllers: [PortfolioController, FileUploadController],
  providers: [PortfolioService, PortfolioItemRepository],
})
export class AppModule {}