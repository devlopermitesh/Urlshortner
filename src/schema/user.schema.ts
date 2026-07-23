import z from "zod";

/** Schema for creating a new user (signup) */
export const CreateUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must not exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z
    .email("Invalid email format")
    .max(255, "Email must not exceed 255 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters"),
});
export const LoginUserSchema = z.object({

  email: z
    .email("Invalid email format")
    .max(255, "Email must not exceed 255 characters"),
  Password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters"),
});
export const UserEmailSchema = z.object({

  email: z
    .email("Invalid email format")
    .max(255, "Email must not exceed 255 characters"),

});
export const UserPasswordUpdateSchema=z.object({
    oldpassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters"),
    newpassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters"),
}).refine((data)=>data.oldpassword!==data.newpassword,{
  path:["newpassword"],
  message:"new Password must be not same as old password"
})
export const VerifyUserEmailSchema = z.object({

  email: z
    .email("Invalid email format")
    .max(255, "Email must not exceed 255 characters"),
  Otp: z
    .string()
    .length(6, "Otp must be 6 characters")
});
/** Schema for updating an existing user (partial fields) */
export const UpdateUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must not exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .optional(),
  email: z
    .email("Invalid email format")
    .max(255, "Email must not exceed 255 characters")
    .optional(),
  email_verified: z.boolean().optional(),
  razorPay_customer_id: z.string().optional(),
});

/** Schema for full user record as returned from DB */
export const UserResponseSchema = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string(),
  email_verified: z.boolean(),
  razorPay_customer_id: z.string().nullable().optional(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type TCreateUser = z.infer<typeof CreateUserSchema>;
export type TUpdateUser = z.infer<typeof UpdateUserSchema>;
export type TUserResponse = z.infer<typeof UserResponseSchema>;
export type TLoginRequest=z.infer<typeof LoginUserSchema>
export type TVerifyUserEmailSchema=z.infer<typeof VerifyUserEmailSchema>;
export type TUserEmail =z.infer<typeof UserEmailSchema>
export type TUserPasswordUpdate=z.infer<typeof UserPasswordUpdateSchema>