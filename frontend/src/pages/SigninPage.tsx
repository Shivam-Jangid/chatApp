import BlurText from "@/components/ui/blurtext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/useAuthstore";
import { useState } from "react";
import { signinSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {Eye, EyeOff, Lock, Mail} from "lucide-react";
import { Link } from "react-router-dom";
import Particles from "@/components/particles";

export default function SignupPage() {
  const [showPass, setshowPass] = useState(false);
  const {isSigningin,signin} = useAuthStore();

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email:"",
      password: ""
    },
  });

  async function onSubmit(values: z.infer<typeof signinSchema>) {
    await signin(values);
  }
  return (
    <div className="h-screen flex items-center w-screen">
      <div className="absolute w-full h-full -z-10">
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
      <div className="flex flex-col mx-auto items-center max-w-4xl justify-center p-8 sm:p-30 gap-10">
        <div className="space-y-9 w-full">
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex gap-3 items-center justify-center w-full">
            <BlurText
              text="Welcome Back"
              delay={150}
              animateBy="words"
              direction="bottom"
              className="text-4xl font-bold"
            />
          </div>
          <div className="text-center text-md max-w-sm">Access your chats instantly. The network never sleeps</div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="md:size-6 size-5 opacity-80 absolute top-1/4 left-2"/>
                        <Input className="pl-10" placeholder="email@gmail.com" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="md:size-6 size-5 opacity-80 absolute top-1/4 left-2"/>
                        <Input type={showPass ? "text" : "password"} className="pl-10" placeholder="password" {...field} />
                        <button type="button" className="absolute cursor-pointer opacity-80 right-3 top-1/4" onClick={() => setshowPass(v => !v)}>
                          {showPass ? <EyeOff className="md:size-6 size-5"/>:<Eye className="size-5 md:size-6"/>}
                        </button>

                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
            <Button variant = {isSigningin ? "destructive" : "default"} className=" w-full py-6 rounded-xl cursor-pointer font-semibold text-lg" size="lg" type="submit">  
                  Launch Chat
            </Button>
            </div>
          </form>
        </Form>
        <div className="-mt-7 text-center">
          <span className="flex gap-2 justify-center items-center">New to Synapse?<Link className="cursor-pointer hover:underline hover:opacity-80 transition-all" to="/signup" >Sign up</Link></span>
        </div>
        </div>
      </div>
    </div>
  );
}
