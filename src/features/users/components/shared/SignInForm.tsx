import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signInFormSchema } from '../../validation-schema/validation'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { setCookie } from 'cookies-next/client';

const SignInForm = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const onSignInSubmit = async (values: z.infer<typeof signInFormSchema>) => {
        setLoading(true)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, values)
            console.log(response)
            if (response.status === 200) {
                setLoading(false)
                toast({
                    title: response.data.message,
                    description: "Welcome back!",
                })
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                setCookie('token', response.data.token, { path: '/' })
                setCookie('userid', response.data.userId, { path: '/' })
                router.push('/todos')
            } else {
                setLoading(false)
                toast({
                    variant: "destructive",
                    title: response.data.message,
                    description: "There was a problem with  your request.",
                })
            }

        } catch (error) {
            setLoading(false)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
            console.log(error)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSignInSubmit)} className="space-y-4 w-full">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password123" type='password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className='bg-foreground text-gray-100 hover:bg-foreground/90' type="submit">
                    {!loading ? "Sign in" : "Loading..."}
                </Button>
            </form>
        </Form>
    )
}

export default SignInForm
