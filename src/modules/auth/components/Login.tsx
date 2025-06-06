import { useState, type FC, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginForm } from "@/modules/auth/schemas/services";
import type { ILoginDTO } from "@/types/login";
import { loginUser } from "../api/auth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/input/Input";
import { Button } from "@/components/button/Button";
import { Checkbox } from "@/components/checkbox/Checkbox";

export const Login: FC = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const { login, user } = useAuth();
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
      console.log(user);
      login();
      toast.success("You have been logged in successfully.");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          {...register("email")}
          error={errors.email?.message}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Input
          type="password"
          label="Password"
          {...register("password")}
          placeholder="••••••••"
          error={errors.password?.message}
        />

        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      {/* <input
        id="remember"
        type="checkbox"
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary bg-[var(--foreground)]"
      /> */}
      <Checkbox />

      <Button
        isLoading={loading}
        type="submit"
        loadingText="Please wait..."
        variant="default"
        size="md"
        className="text-sm"
      >
        Sign In
      </Button>
    </form>
  );
};
