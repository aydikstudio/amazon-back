import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ReviewDto } from './review.dto';
import { ProductService } from 'src/product/product.service';

@Controller('reviews')
export class ReviewController {
  constructor(
    private reviewService: ReviewService
    ) {}

  @UsePipes(new ValidationPipe())
  @Get()
  @Auth('admin')
  async getAll() {

    return this.reviewService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('leave/:productId')
  @Auth('user')
  async leaveReview(@CurrentUser('id') id: number,
  @Body() dto:ReviewDto,
  @Param('productId') productId: string) {
    return this.reviewService.create(id, dto, +productId)
  }


  @Get('average-by-product/:productId')
  async getAverageByProduct(@Param('productId') productId: string) {
    return this.reviewService.getAverageValueByProductId(+productId)
  }

}
