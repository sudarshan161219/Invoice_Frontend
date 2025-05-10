import { useState, type FC, type ReactElement } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginForm } from "@/features/auth/pages/authSchema";

export const Login: FC = (): ReactElement => {
  const [show, setShow] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mode: "login",
    },
  });

  const onSubmit = (data: LoginForm) => {
    console.log("Login data:", data);
    // handle registration (e.g., API call)
  };

  const toggleShow = () => setShow((prev) => !prev);

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="input-icon-container relative">
          <Input
            autoComplete="off"
            id="password"
            type={show ? "password" : "text"}
            placeholder="••••••••"
            {...register("password")}
          />
          <span className="absolute right-2 top-2 cursor-pointer">
            {show ? (
              <GoEye onClick={toggleShow} />
            ) : (
              <GoEyeClosed onClick={toggleShow} />
            )}
          </span>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full cursor-pointer">
        Sign In
      </Button>
    </form>
  );
};
