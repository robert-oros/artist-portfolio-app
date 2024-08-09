import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioService } from './portfolio.service';
import { PortfolioItemRepository } from '../repositories/portfolio-item.repository';
import { PortfolioItem } from '../entities/portfolio-item.entity';

const mockPortfolioItems: PortfolioItem[] = [
  { id: 1, title: 'Title 1', description: 'Desc 1', imageUrl: 'http://image1.com', clientWebsiteUrl: 'http://client1.com', isVisible: true },
  { id: 2, title: 'Title 2', description: 'Desc 2', imageUrl: 'http://image2.com', clientWebsiteUrl: 'http://client2.com', isVisible: false },
];

describe('PortfolioService', () => {
  let service: PortfolioService;
  let repository: PortfolioItemRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioService,
        {
          provide: PortfolioItemRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockPortfolioItems),
            findById: jest.fn().mockImplementation((id: number) =>
              Promise.resolve(mockPortfolioItems.find(item => item.id === id)),
            ),
            create: jest.fn().mockImplementation((portfolioItem: PortfolioItem) => Promise.resolve({ id: 3, ...portfolioItem })),
            update: jest.fn().mockImplementation((id: number, updates: Partial<PortfolioItem>) => Promise.resolve({ id, ...updates })),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<PortfolioService>(PortfolioService);
    repository = module.get<PortfolioItemRepository>(PortfolioItemRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPortfolioItems', () => {
    it('should return all portfolio items', async () => {
      const result = await service.getAllPortfolioItems();
      expect(result).toEqual(mockPortfolioItems);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPortfolioItemById', () => {
    it('should return a single portfolio item by id', async () => {
      const result = await service.getPortfolioItemById(1);
      expect(result).toEqual(mockPortfolioItems[0]);
      expect(repository.findById).toHaveBeenCalledWith(1);
    });

    it('should return null if item not found', async () => {
      const result = await service.getPortfolioItemById(999);
      expect(result).toBeUndefined();
      expect(repository.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('createPortfolioItem', () => {
    it('should create and return a new portfolio item', async () => {
      const newItem = { title: 'New Title', description: 'New Desc', imageUrl: 'http://newimage.com', clientWebsiteUrl: 'http://newclient.com', isVisible: true };
      const result = await service.createPortfolioItem(newItem as PortfolioItem);
      expect(result).toEqual({ id: 3, ...newItem });
      expect(repository.create).toHaveBeenCalledWith(newItem);
    });
  });

  describe('updatePortfolioItem', () => {
    it('should update and return the updated portfolio item', async () => {
      const updates = { title: 'Updated Title' };
      const result = await service.updatePortfolioItem(1, updates);
      expect(result).toEqual({ id: 1, ...updates });
      expect(repository.update).toHaveBeenCalledWith(1, updates);
    });
  });

  describe('deletePortfolioItem', () => {
    it('should delete the portfolio item', async () => {
      await service.deletePortfolioItem(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
