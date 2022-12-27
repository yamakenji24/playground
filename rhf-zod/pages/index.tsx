import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../styles/Home.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  firstName: z.string().min(1, { message: "firstname is Required" }),
  lastName: z.string().min(1, { message: "lastName is required" }),
});

type User = z.infer<typeof schema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<User> = (data) =>
    console.log("submti: ", data.firstName);

  console.log(watch("firstName")); // watch input value by passing the name of it

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <div className={styles.input}>
              <input {...register("firstName")} />
              {errors.firstName && (
                <span>{errors.firstName.message as string}</span>
              )}
            </div>

            <div className={styles.input}>
              <input {...register("lastName")} />
              {errors.lastName && (
                <span>{errors.lastName.message as string}</span>
              )}
            </div>

            <input type="submit" />
          </form>
        </div>
      </main>
    </div>
  );
}