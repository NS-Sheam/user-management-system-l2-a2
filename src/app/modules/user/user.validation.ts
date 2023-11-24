import { z } from "zod";

const FullNameValidaionSchema = z.object({
  firstName: z
    .string({
      required_error: "firstName is required",
    })
    .min(1)
    .max(20)
    .refine((value) => value.charAt(0).toUpperCase() === value.charAt(0), {
      message: "First name must start with uppercase letter",
    }),
  lastName: z
    .string({
      required_error: "lastName is required",
    })
    .min(1)
    .max(20)
    .refine((value) => value.charAt(0).toUpperCase() === value.charAt(0), {
      message: "First name must start with uppercase letter",
    }),
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
  userId: z
    .number({
      required_error: "userId is required",
    })
    .min(1),
  username: z
    .string({
      required_error: "userName is required",
    })
    .min(1)
    .max(20),
  password: z.string({
    required_error: "password is required",
  }),
  fullName: FullNameValidaionSchema,
  age: z.number({
    required_error: "age is required",
  }),
  email: z
    .string({
      required_error: "email is required",
    })
    .email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressValidationSchema,
  orders: z.array(OrderValidationSchema).optional(),
});

export default UserValidationSchema;
