"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: 
    z.string()
    .min(5,"Username must be at least 5 characters.")
    .max(50, "Username must not excede 50 characters."),
  password: 
    z.string()
    .min(8,"Password must be at least 5 characters.")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and a special character.")
})

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="container">
        <img className="h-dvh" src="/mapImage.jpg" alt="Cordillera boscosa con un cielo semi despejado"/>
      </div>
      <div className="flex flex-col items-center w-3/4">
        <div className="flex items-end justify-center">
          <h1 className="text-7xl font-semibold p-5" style={{color: "#FF678B"}}>QUEST</h1>
          <Image className="py-5" src="/logo.png" alt="Planeta con signo de ubicación" width={200} height={200}/>
        </div>
        <Card className="w-2/3">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Traveler" {...field} />
                      </FormControl>
                      <FormDescription>
                        Correo electronico con el que se registro.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription>
                        Contraseña de acceso.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" style={{background: "#FF678B"}} onClick={form.handleSubmit(onSubmit)}>Submit</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
