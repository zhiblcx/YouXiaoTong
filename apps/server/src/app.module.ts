import { Module } from '@nestjs/common';
import { AddressModule } from './modules/address/address.module';
import { AdminModule } from './modules/admin/admin.module';
import { ArticleModule } from './modules/article/article.module';
import { AuthModule } from './modules/auth/auth.module';
import { BusinessModule } from './modules/business/business.module';
import { MenuModule } from './modules/menu/menu.module';
import { OrderModule } from './modules/order/order.module';
import { OrderitemModule } from './modules/orderitem/orderitem.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { StudentModule } from './modules/student/student.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    StudentModule,
    AddressModule,
    AdminModule,
    BusinessModule,
    MenuModule,
    ArticleModule,
    OrderModule,
    OrderitemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
