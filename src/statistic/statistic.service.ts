import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatisticService {
    constructor(private prisma: PrismaService, private useService: UserService) {}

    async getMainStatistics(userId: number) {
        const user = await this.useService.byId(userId, {
            orders: {
                select: {
                    items: {
                        select: {
                            price: true
                        }
                    }
                }
            },
            reviews: true
        })

    	const totalAmount = await this.prisma.order.aggregate({
			_sum: {
				total: true
			}
		})

  

        return [{
            name: 'Orders',
            value: user.orders.length
        }, {
            name: 'Reviews',
            value: user.reviews.length
        } , {
            name: 'Favorites',
            value: user.favorites.length
        } , {
            name: 'Total amount',
            value: 10000
        }]
    }
}
