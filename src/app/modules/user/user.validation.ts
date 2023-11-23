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
  street: z.string().min(1).max(20),
  city: z.string().min(1).max(20),
  country: z.string().min(1).max(20),
});

const OrderValidationSchema = z.object({
  productName: z.string().min(1).max(20),
  price: z.number().min(1).max(20),
  quantity: z.number().min(1).max(20),
});

const UserValidationSchema = z.object({
  userId: z.number().min(1).max(20),
  username: z.string().min(1).max(20),
  password: z.string().min(1).max(20),
  fullName: FullNameValidaionSchema,
  age: z.number().min(1).max(20),
  email: z.string().min(1).max(20),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1).max(20)),
  address: AddressValidationSchema,
  orders: z.array(OrderValidationSchema),
});
