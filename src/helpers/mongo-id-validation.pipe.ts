import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Types } from 'mongoose'

@Injectable()
export class MongoIdValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value || !Types.ObjectId.isValid(value)) {
      throw new HttpException(
        `Invalid ${metadata.data}`,
        HttpStatus.BAD_REQUEST
      )
    }
    return value
  }
}
