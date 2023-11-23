import { z } from "zod";

const FullNameValidaionSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      {
        message: "First name must start with uppercase letter",
      },
    ),
  lastName: z
    .string()
    .min(1)
    .max(20)
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      {
        message: "First name must start with uppercase letter",
      },
    ),
});

const AddressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const OrderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const UserValidationSchema = z.object({
  userId: z.number().min(1),
  username: z.string().min(1).max(20),
  password: z.string(),
  fullName: FullNameValidaionSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressValidationSchema,
  orders: z.array(OrderValidationSchema),
});

export default UserValidationSchema;
