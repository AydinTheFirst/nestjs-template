import { AuthModule } from './auth';
import { TokensModule } from './tokens';
import { UsersModule } from './users';

const modules = {
  AuthModule,
  TokensModule,
  UsersModule,
};

export default Object.values(modules);
