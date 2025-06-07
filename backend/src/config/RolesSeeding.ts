import { IRole, RoleModel } from "../models/roleModel";
import mongoose, { Schema, Document, model } from "mongoose";


export default async function seedRoles(): Promise<void> {
  try {

    const roles: IRole[] = [
      { role_name: "Admin", created_at: new Date(), updated_at: new Date() } as IRole,
      { role_name: "Normal", created_at: new Date(), updated_at: new Date() } as IRole
    ];

    for (const role of roles) {
      const exists = await RoleModel.findOne({ role_name: role.role_name });
      if (!exists) {
        await RoleModel.create(role);
        console.log(`Inserted role: ${role.role_name}`);
      }
    }

    console.log("Roles seeded successfully!");
  } catch (error) {
    console.error("Error seeding roles:", error);
  } 
}

