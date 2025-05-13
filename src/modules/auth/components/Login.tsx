import { useState, type FC, type ReactElement } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginForm } from "@/modules/auth/schemas/services";
import type { ILoginDTO } from "@/types/login";
import { loginUser } from "../api/auth.api";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Login: FC = (): ReactElement => {
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const loginData: ILoginDTO = data;
      await loginUser(loginData);
      // login(response.user);
      toast.success("You have been logged in successfully.");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
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
          "Sign In"
        )}
      </Button>
    </form>
  );
};
