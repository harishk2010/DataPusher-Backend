import { Schema, model, Document } from "mongoose";

export interface IRole extends Document {
  role_name: string;
  created_at: Date;
  updated_at: Date;
}

const RoleSchema = new Schema<IRole>({
  role_name: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export const RoleModel = model<IRole>("Role", RoleSchema);
