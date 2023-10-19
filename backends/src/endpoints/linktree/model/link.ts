import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LinkDocument = Link & Document;

@Schema()
export class Link {
  @Prop({ type: String })
  url!: string;

  @Prop({ type: String })
  description: string | undefined;

  @Prop({ type: String })
  logo: string | undefined;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
