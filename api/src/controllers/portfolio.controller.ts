import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PortfolioItem } from '../entities/portfolio-item.entity';
import { PortfolioService } from '../services/portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @Get()
  async getAllPortfolioItems(): Promise<PortfolioItem[]> {
    return this.portfolioService.getAllPortfolioItems();
  }

  @Get(':id')
  async getPortfolioItemById(@Param('id') id: number): Promise<PortfolioItem> {
    return this.portfolioService.getPortfolioItemById(id);
  }

  @Post()
  async createPortfolioItem(@Body() portfolioItem: PortfolioItem): Promise<PortfolioItem> {
    return this.portfolioService.createPortfolioItem(portfolioItem);
  }

  @Patch(':id')
  async updatePortfolioItem(
    @Param('id') id: number,
    @Body() updates: Partial<PortfolioItem>
  ): Promise<PortfolioItem> {
    return this.portfolioService.updatePortfolioItem(id, updates);
  }

  @Delete(':id')
  async deletePortfolioItem(@Param('id') id: number): Promise<void> {
    await this.portfolioService.deletePortfolioItem(id);
  }
}