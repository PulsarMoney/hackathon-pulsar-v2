import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Link } from 'src/endpoints/linktree/model/link';

export type UserDocument = User & Document;

@Schema()
export class User {
  constructor(init: Partial<User>) {
    Object.assign(this, init);
  }

  @Prop({ type: String })
  firstName!: string;

  @Prop({ type: String })
  lastName!: string;

  @Prop({ type: String })
  description: string | undefined;

  @Prop({ type: String })
  imageUrl: string | undefined;

  @Prop([Link])
  linktree: Link[] | undefined;

  @Prop({ type: String })
  walletAddress!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
