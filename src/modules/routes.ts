import { AuthModule } from './auth';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { TokensModule } from './tokens';
import { UsersModule } from './users';

const modules = {
  AuthGoogleModule,
  AuthModule,
  TokensModule,
  UsersModule,
};

export default Object.values(modules);
