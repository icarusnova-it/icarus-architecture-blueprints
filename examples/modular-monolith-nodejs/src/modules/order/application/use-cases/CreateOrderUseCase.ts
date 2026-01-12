/**
 * Order Module: Create Order Use Case
 * 
 * This use case demonstrates how the Order module uses the User module
 * via interface (in-process communication).
 * 
 * Benefits:
 * - Order module doesn't depend on User module's internals
 * - Can extract User module to service later without changing this code
 * - Easy to test (can mock IUserService)
 */

import { IUserService } from '../../../user/application/interfaces/IUserService';

export interface CreateOrderRequest {
  userId: string;
  items: OrderItem[];
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export class CreateOrderUseCase {
  constructor(
    private userService: IUserService,  // In-process interface, not network call
    private orderRepository: IOrderRepository
  ) {}

  async execute(request: CreateOrderRequest): Promise<OrderDTO> {
    // In-process call to User module - fast, no network
    const user = await this.userService.getUserById(request.userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    if (user.status !== 'ACTIVE') {
      throw new Error('User is not active');
    }

    // Create order logic
    const order = {
      id: this.generateOrderId(),
      userId: request.userId,
      items: request.items,
      total: this.calculateTotal(request.items),
      status: 'PENDING',
      createdAt: new Date(),
    };

    await this.orderRepository.save(order);

    return order;
  }

  private generateOrderId(): string {
    return `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private calculateTotal(items: OrderItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}

// Simplified interfaces for example
interface IOrderRepository {
  save(order: any): Promise<void>;
}

interface OrderDTO {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: Date;
}
