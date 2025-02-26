import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderitemService } from './orderitem.service';

@Controller('orderitem')
@ApiTags('订单条目管理')
@ApiBearerAuth()
export class OrderitemController {
  constructor(private readonly orderItemService: OrderitemService) {}
}
