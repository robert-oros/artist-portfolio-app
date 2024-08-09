import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from '../services/portfolio.service';
import { PortfolioItem } from '../entities/portfolio-item.entity';

const mockPortfolioItems: PortfolioItem[] = [
  { id: 1, title: 'Title 1', description: 'Desc 1', imageUrl: 'http://image1.com', clientWebsiteUrl: 'http://client1.com', isVisible: true },
  { id: 2, title: 'Title 2', description: 'Desc 2', imageUrl: 'http://image2.com', clientWebsiteUrl: 'http://client2.com', isVisible: false },
];

describe('PortfolioController', () => {
  let controller: PortfolioController;
  let service: PortfolioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioController],
      providers: [
        {
          provide: PortfolioService,
          useValue: {
            getAllPortfolioItems: jest.fn().mockResolvedValue(mockPortfolioItems),
            getPortfolioItemById: jest.fn().mockImplementation((id: number) =>
              Promise.resolve(mockPortfolioItems.find(item => item.id === id)),
            ),
            createPortfolioItem: jest.fn().mockImplementation((portfolioItem: PortfolioItem) => Promise.resolve({ id: 3, ...portfolioItem })),
            updatePortfolioItem: jest.fn().mockImplementation((id: number, updates: Partial<PortfolioItem>) => Promise.resolve({ id, ...updates })),
            deletePortfolioItem: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<PortfolioController>(PortfolioController);
    service = module.get<PortfolioService>(PortfolioService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllPortfolioItems', () => {
    it('should return all portfolio items', async () => {
      const result = await controller.getAllPortfolioItems();
      expect(result).toEqual(mockPortfolioItems);
      expect(service.getAllPortfolioItems).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPortfolioItemById', () => {
    it('should return a single portfolio item by id', async () => {
      const result = await controller.getPortfolioItemById(1);
      expect(result).toEqual(mockPortfolioItems[0]);
      expect(service.getPortfolioItemById).toHaveBeenCalledWith(1);
    });

    it('should return null if item not found', async () => {
      const result = await controller.getPortfolioItemById(999);
      expect(result).toBeUndefined();
      expect(service.getPortfolioItemById).toHaveBeenCalledWith(999);
    });
  });

  describe('createPortfolioItem', () => {
    it('should create and return a new portfolio item', async () => {
      const newItem = { title: 'New Title', description: 'New Desc', imageUrl: 'http://newimage.com', clientWebsiteUrl: 'http://newclient.com', isVisible: true };
      const result = await controller.createPortfolioItem(newItem as PortfolioItem);
      expect(result).toEqual({ id: 3, ...newItem });
      expect(service.createPortfolioItem).toHaveBeenCalledWith(newItem);
    });
  });

  describe('updatePortfolioItem', () => {
    it('should update and return the updated portfolio item', async () => {
      const updates = { title: 'Updated Title' };
      const result = await controller.updatePortfolioItem(1, updates);
      expect(result).toEqual({ id: 1, ...updates });
      expect(service.updatePortfolioItem).toHaveBeenCalledWith(1, updates);
    });
  });

  describe('deletePortfolioItem', () => {
    it('should delete the portfolio item', async () => {
      await controller.deletePortfolioItem(1);
      expect(service.deletePortfolioItem).toHaveBeenCalledWith(1);
    });
  });
});
