import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    // เพิ่มไว้สำหรับการอ่าน config ผ่าน .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // ใช้ค่าจาก .env แทนฮาร์ดโค้ด
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
      dbName: process.env.MONGO_DB,
    }),
    AuthModule,
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
