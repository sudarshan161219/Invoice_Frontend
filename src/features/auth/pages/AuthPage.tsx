import "./index.css";
import { useState, type FC, type ReactElement } from "react";
import { Register } from "@/components/authComponents/Register";
import { Login } from "@/components/authComponents/Login";

const AuthPage: FC = (): ReactElement => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
      <section className="rounded-lg p-4 flex flex-col gap-10 w-full input-section">
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

        {isLogin ? <Login /> : <Register />}

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

export default AuthPage;
