import { PayMethodDTO } from 'src/dto/pay-method.dto';

export interface PayMethodServiceInterface {
    getPayMethods(): Promise<PayMethodDTO[]>;
}
