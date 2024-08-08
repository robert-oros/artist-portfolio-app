// src/repositories/portfolio-item.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortfolioItem } from '../entities/portfolio-item.entity';

@Injectable()
export class PortfolioItemRepository {
  constructor(
    @InjectRepository(PortfolioItem)
    private portfolioItemRepository: Repository<PortfolioItem>
  ) {}

  async findAll(): Promise<PortfolioItem[]> {
    return this.portfolioItemRepository.find();
  }

  async findById(id: number): Promise<PortfolioItem> {
    return this.portfolioItemRepository.findOneBy({ id });
  }

  async create(portfolioItem: PortfolioItem): Promise<PortfolioItem> {
    return this.portfolioItemRepository.save(portfolioItem);
  }

  async update(id: number, updates: Partial<PortfolioItem>): Promise<PortfolioItem> {
    await this.portfolioItemRepository.update(id, updates);
    return this.portfolioItemRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.portfolioItemRepository.delete(id);
  }
}