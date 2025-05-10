import { useState, type FC, type ReactElement } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { Button } from "@/components/ui/button";
import {
  registerSchema,
  type RegisterForm,
} from "@/features/auth/pages/authSchema";

export const Register: FC = (): ReactElement => {
  const [show, setShow] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      mode: "register",
    },
  });

  const onSubmit = (data: RegisterForm) => {
    console.log("Register data:", data);
    // handle registration (e.g., API call)
  };

  const toggleShow = () => setShow((prev) => !prev);

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <Label htmlFor="name">Full Name</Label>
        <Input
          autoComplete="off"
          id="name"
          type="text"
          placeholder="Full Name"
          {...register("name")}
          className="bg-[var(--color-input)] text-[var(--color-foreground)] border border-[var(--color-border)] p-2 rounded-md"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

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

      <div className="flex flex-col gap-1">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="input-icon-container relative">
          <Input
            autoComplete="off"
            id="confirmPassword"
            type={show ? "password" : "text"}
            placeholder="••••••••"
            {...register("confirmPassword")}
          />
          <span className="absolute right-2 top-2 cursor-pointer">
            {show ? (
              <GoEye onClick={toggleShow} />
            ) : (
              <GoEyeClosed onClick={toggleShow} />
            )}
          </span>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full cursor-pointer">
        Register
      </Button>
    </form>
  );
};
