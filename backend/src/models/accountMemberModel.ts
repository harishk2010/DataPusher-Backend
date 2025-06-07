import { Schema, model, Document, Types } from "mongoose";

export interface IAccountMember extends Document {
  account_id: Types.ObjectId;
  user_id: Types.ObjectId;
  role_id: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const AccountMemberSchema = new Schema<IAccountMember>({
  account_id: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  role_id: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export const AccountMemberModel = model<IAccountMember>("AccountMember", AccountMemberSchema);
