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
} from "@/modules/auth/schemas/services";
import type { IRegisterDTO } from "@/types/register";
import { registerUser } from "../api/auth.api";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Register: FC = (): ReactElement => {
  const [show, setShow] = useState(true);
  const [confirmShow, setConfirmShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      const registerData: IRegisterDTO = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      await registerUser(registerData);
      toast("Success!", {
        description: "You have registered successfully.",
      });
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("Something went wrong during registration.");
    } finally {
      setLoading(false);
    }
  };

  const toggleShow = () => setShow((prev) => !prev);
  const toggleConfirmShow = () => setConfirmShow((prev) => !prev);

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <Label htmlFor="name">Full Name</Label>
        <Input
          autoComplete="off"
          id="name"
          type="text"
          placeholder="Full Name"
          className="bg-[var(--color-input)] text-[var(--color-foreground)] border border-[var(--color-border)] p-2 rounded-md"
          {...register("name")}
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
          className="bg-[var(--color-input)] text-[var(--color-foreground)] border border-[var(--color-border)] p-2 rounded-md"
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
            className="bg-[var(--color-input)] text-[var(--color-foreground)] border border-[var(--color-border)] p-2 rounded-md"
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
            type={confirmShow ? "password" : "text"}
            placeholder="••••••••"
            className="bg-[var(--color-input)] text-[var(--color-foreground)] border border-[var(--color-border)] p-2 rounded-md"
            {...register("confirmPassword")}
          />
          <span className="absolute right-2 top-2 cursor-pointer">
            {confirmShow ? (
              <GoEye onClick={toggleConfirmShow} />
            ) : (
              <GoEyeClosed onClick={toggleConfirmShow} />
            )}
          </span>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            Please wait
          </>
        ) : (
          "Register"
        )}
      </Button>
    </form>
  );
};
