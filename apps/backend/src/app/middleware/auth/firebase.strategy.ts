import { FirebaseAdmin, InjectFirebaseAdmin } from '@levi-math/firebase';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { DecodedIdToken } from 'firebase-admin/auth';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import { User, UserCollection } from '../../database/schema/user.schema';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth'
) {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
    @InjectModel(User.name) private readonly userModel: UserCollection
  ) {
    super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() });
  }

  async validate(token: string): Promise<DecodedIdToken> {
    try {
      const firebaseUser = await this.firebase.auth.verifyIdToken(token, true);
      if (!firebaseUser) {
        throw new UnauthorizedException();
      }

      const user = await this.userModel.findOne({
        firebaseId: firebaseUser.uid,
      });

      const name = firebaseUser['name'];
      const firstName = name?.split(' ')[0];

      if (!user) {
        await this.userModel.create({
          firebaseId: firebaseUser.uid,
          username: firstName ? firstName : name,
        });
      }

      return firebaseUser;
    } catch (e) {
      console.error(e.message);

      throw new UnauthorizedException('Error validating token');
    }
  }
}
