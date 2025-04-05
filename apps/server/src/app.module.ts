import { Module } from '@nestjs/common';
import { AddressModule } from './modules/address/address.module';
import { AdminModule } from './modules/admin/admin.module';
import { ApplicationModule } from './modules/application/application.module';
import { ArticleModule } from './modules/article/article.module';
import { AuthModule } from './modules/auth/auth.module';
import { BusinessModule } from './modules/business/business.module';
import { MenuModule } from './modules/menu/menu.module';
import { OrderModule } from './modules/order/order.module';
import { OrderitemModule } from './modules/orderitem/orderitem.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { SpeciesModule } from './modules/species/species.module';
import { StockModule } from './modules/stock/stock.module';
import { StudentModule } from './modules/student/student.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { TransporterModule } from './modules/transporter/transporter.module';

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
    TransactionModule,
    TransporterModule,
    SpeciesModule,
    ApplicationModule,
    StockModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
