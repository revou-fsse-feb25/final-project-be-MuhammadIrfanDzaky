import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { CourtsModule } from './courts/courts.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { JwtMiddleware } from './global/jwt.middleware';
import { ValidationMiddleware } from './global/validation.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, AuthModule, BookingsModule, CourtsModule, DashboardModule, JwtModule.register({
    secret: process.env.JWT_SECRET || 'secret',
    signOptions: { expiresIn: process.env.JWT_EXPIRATION || '1d' },
  })],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST }
      )
    .forRoutes({ path: '{*splat}', method: RequestMethod.ALL });
    consumer
      .apply(ValidationMiddleware)
      .forRoutes(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST }
      );
  }
}