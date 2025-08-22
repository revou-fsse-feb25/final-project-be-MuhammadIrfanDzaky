import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { CourtsModule } from './courts/courts.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { JwtMiddleware } from './global/jwt.middleware';
import { ValidationMiddleware } from './global/validation.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [PrismaModule,UsersModule, AuthModule, BookingsModule, CourtsModule, DashboardModule, JwtModule.register({
    secret: process.env.JWT_SECRET || 'secret',
    signOptions: { expiresIn: process.env.JWT_EXPIRATION || '1d' },
  })],
  controllers: [AppController],
  providers: [AppService, JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: class {
        intercept(context, next) {
          const response = context.switchToHttp().getResponse();
          const request = context.switchToHttp().getRequest();
          
          // Ensure CORS headers are always present
          const origin = request.headers.origin;
          if (origin) {
            response.header('Access-Control-Allow-Origin', origin);
          }
          response.header('Access-Control-Allow-Credentials', 'true');
          response.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
          response.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Accept,Origin,X-Requested-With');
          
          return next.handle();
        }
      }
    }
  ],
  
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
        { path: 'auth/register', method: RequestMethod.POST },
        { path: '*' , method: RequestMethod.OPTIONS }
      );
  }
}