// src/entities/portfolio-item.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('portfolio_items')
export class PortfolioItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  clientWebsiteUrl: string;

  @Column()
  isVisible: boolean;
}