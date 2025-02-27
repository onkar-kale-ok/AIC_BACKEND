import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, AuthModule, PagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
