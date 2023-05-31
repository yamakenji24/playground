import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../styles/Home.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const createPasswordSchema = () => {
  const password = z
    .object({
      currentPassword: z.string().min(1),
      newPassword: z.string().min(8),
      confirmPassword: z.string().min(1),
    })
    .superRefine(({currentPassword, newPassword, confirmPassword}, ctx) => {
      if (currentPassword === newPassword) {
        ctx.addIssue({
          path: ['newPassword'],
          code: 'custom',
          message: 'password is same with current password',
        });
      }

      if (newPassword !== confirmPassword) {
        ctx.addIssue({
          path: ['confirmPassword'],
          code: 'custom',
          message: 'password is not same',
        });
      }
    });

  return password;
};
type Password = z.infer<ReturnType<typeof createPasswordSchema>>;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Password>({
    resolver: zodResolver(createPasswordSchema()),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(({ currentPassword, newPassword }) =>
    console.log("submti: ", currentPassword)
  );
  console.log(errors);

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <input type="text" {...register("currentPassword")} />
        <input type="text" {...register("newPassword")} />
        {errors.newPassword && <p>{errors.newPassword.message as string}</p>}
        <input type="text" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <p>{errors.confirmPassword.message as string}</p>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
