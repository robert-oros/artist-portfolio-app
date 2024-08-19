import { Injectable } from '@nestjs/common';
import { PortfolioItem } from '../entities/portfolio-item.entity';
import { PortfolioItemRepository } from '../repositories/portfolio-item.repository';

@Injectable()
export class PortfolioService {
  constructor(private portfolioItemRepository: PortfolioItemRepository) {}

  async getAllPortfolioItems(): Promise<PortfolioItem[]> {
    return this.portfolioItemRepository.findAll();
  }

  async getPortfolioItemById(id: number): Promise<PortfolioItem> {
    return this.portfolioItemRepository.findById(id);
  }

  async createPortfolioItem(portfolioItem: PortfolioItem): Promise<PortfolioItem> {
    return this.portfolioItemRepository.create(portfolioItem);
  }

  async updatePortfolioItem(id: number, updates: Partial<PortfolioItem>): Promise<PortfolioItem> {
    return this.portfolioItemRepository.update(id, updates);
  }

  async deletePortfolioItem(id: number): Promise<void> {
    await this.portfolioItemRepository.delete(id);
  }
}