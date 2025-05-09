import { useState, type FC, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z
    .string()
    .nonempty("Name cannot be empty")
    .min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type ResgisterFormData = z.infer<typeof registerSchema>;

const LoginPage: FC = (): ReactElement => {
  const [isLogin, setIsLogin] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData | ResgisterFormData>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = (data: any) => {
    console.log(isLogin ? "Logging in..." : "Registering...", data);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
      <section className="rounded-lg p-4 flex flex-col gap-10 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--color-foreground)]">
            {isLogin ? "Let's Sign You In" : "Create Your Account"}
          </h1>
          <p className="text-base sm:text-lg font-normal text-[var(--color-foreground)]">
            {isLogin
              ? "Welcome back! You've been missed."
              : "Join us today. It takes only a few seconds!"}
          </p>
        </div>

        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            {!isLogin && (
              <div className="flex flex-col gap-1">
                <Label htmlFor="Full Name">Full Name</Label>
                <Input
                  autoComplete="off"
                  id="Full Name"
                  type="text"
                  placeholder="Full Name"
                  {...register("name")}
                  className="bg-[var(--color-input)] text-[var(--color-foreground)] border border-[var(--color-border)] p-2 rounded-md"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                autoComplete="off"
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="password">Password</Label>
              <Input
                autoComplete="off"
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </a>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full cursor-pointer">
            {isLogin ? "Sign In" : "Register"}
          </Button>
        </form>

        <div className="text-center text-sm">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin((prev) => !prev)}
            className="cursor-pointer underline text-primary ml-1"
          >
            {isLogin ? "Register Now" : "Login Now"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
