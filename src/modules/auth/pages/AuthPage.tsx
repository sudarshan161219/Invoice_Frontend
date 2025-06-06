import "./index.css";
import { useState, type FC, type ReactElement } from "react";
import { Register } from "@/modules/auth/components/Register";
import { Login } from "@/modules/auth/components/Login";
import { IoLogoGoogle, IoLogoGithub } from "react-icons/io";
import { Button } from "@/components/button/Button";
import { GalleryVerticalEnd } from "lucide-react";
// import bg from "../../../assets/bg.svg";
import boy from "../../../assets/boy.svg";
import girl from "../../../assets/girl.svg";
export const AuthPage: FC = (): ReactElement => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const loginG = (): void => {
    console.log("google login");
  };
  const registerG = (): void => {
    console.log("google register");
  };

  const googleBtn = isLogin ? loginG : registerG;

  return (
    // <main className="min-h-screen flex items-center justify-center p-5 bg-background text-foreground">
    //   <section className="rounded-lg bg-[var(--card)] p-4 border flex flex-col gap-6 w-full md:w-96">
    //     <div className="flex flex-col gap-5 text-center">
    //       <div>
    //         <h1 className="text-xl  font-semibold text-[var(--color-foreground)]">
    //           {isLogin ? "Welcome back" : "Create Your Account"}
    //         </h1>
    //         <p className="text-sm  text-[var(--label)]">
    //           {isLogin
    //             ? "Sign in with your Google or Github account"
    //             : "Join us today. It takes only a few seconds!"}
    //         </p>
    //       </div>

    //       <div className="flex flex-col gap-2">
    //         <Button
    //           onClick={googleBtn}
    //           isLoading={loading}
    //           type="submit"
    //           loadingText="Please wait..."
    //           variant="outline"
    //           size="md"
    //           className="text-sm w-full flex items-center gap-2"
    //         >
    //           <IoLogoGoogle
    //             size={17}
    //             className="text-[var(--color-foreground)]"
    //           />
    //           {isLogin ? "Sign in with Google" : "Sign up with Google"}
    //         </Button>

    //         <Button
    //           onClick={googleBtn}
    //           isLoading={loading}
    //           type="submit"
    //           loadingText="Please wait..."
    //           variant="outline"
    //           size="md"
    //           className="text-sm w-full flex items-center gap-2"
    //         >
    //           <IoLogoGithub
    //             size={17}
    //             className="text-[var(--color-foreground)]"
    //           />
    //           {isLogin ? "Sign in with Github" : "Sign up with Github"}
    //         </Button>
    //       </div>

    //       <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
    //         <span className="bg-card text-muted-foreground relative z-10 px-2">
    //           Or continue with
    //         </span>
    //       </div>
    //     </div>

    //     {isLogin ? <Login /> : <Register />}

    //     <div className="text-center text-sm">
    //       {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
    //       <button
    //         onClick={() => setIsLogin((prev) => !prev)}
    //         className="cursor-pointer underline text-primary ml-1"
    //       >
    //         {isLogin ? "Sign up" : "Sign in"}
    //       </button>
    //     </div>
    //   </section>
    // </main>

    <div className="grid min-h-svh lg:grid-cols-2">
      <div className=" relative hidden lg:block register_bg border-r">
        <div className="register_bg_heading_container">
          <h2 className="text-2xl font-bold text-primary">Welcome to Invii</h2>
          <p className="text-normal text-muted-foreground">
            Send professional invoices, track payments, and manage clients — all
            in one place, with zero hassle.
          </p>
        </div>
        <div className="register_bg_img_container">
          <img src={boy} alt="Image" width={150} />
          <img src={girl} alt="Image" width={210} />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center justify-start gap-2 md:justify-between">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Invii Online.
          </a>

          <div className="btn-container">
            <span>Already have an account?</span>
            <button
              onClick={() => setIsLogin((prev) => !prev)}
              className="cursor-pointer font-normal underline text-primary ml-1 "
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Register />

            <div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className=" text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" className="w-full">
                  <IoLogoGoogle
                    size={17}
                    className="text-[var(--color-foreground)]"
                  />
                  <span className="sr-only">Login with Google</span>
                </Button>

                <Button variant="outline" type="button" className="w-full">
                  <IoLogoGithub
                    size={17}
                    className="text-[var(--color-foreground)]"
                  />
                  <span className="sr-only">Login with Github</span>
                </Button>
              </div>

              <div className="mobile-btn-container">
                <span>Already have an account?</span>
                <button
                  onClick={() => setIsLogin((prev) => !prev)}
                  className="cursor-pointer font-normal underline text-primary ml-1 "
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
