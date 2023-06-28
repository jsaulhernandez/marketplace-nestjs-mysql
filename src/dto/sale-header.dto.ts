import { ApiProperty } from '@nestjs/swagger';

import { PaymentMethodDTO } from './payment-method.dto';
import { SaleDetailDTO } from './sale-detail.dto';
import { UserDTO } from './user.dto';

export class SaleHeaderDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    shippingCost: number;
    @ApiProperty()
    tax: number;
    @ApiProperty()
    paymentMethod: PaymentMethodDTO;
    @ApiProperty()
    user: UserDTO;
    @ApiProperty()
    detail: SaleDetailDTO[];
}
