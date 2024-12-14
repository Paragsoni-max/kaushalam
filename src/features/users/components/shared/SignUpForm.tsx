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
import { signUpFormSchema } from '../../validation-schema/validation'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

const SignUpForm = () => {

    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
        },
    })
    const onSignInSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
        setLoading(true)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`, values)
            if (response.status === 201) {
                setLoading(false)
                toast({
                    title: response.data.message,
                    description: "Sign in to continue",
                })
                router.push('/sign-in')
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
            <form onSubmit={form.handleSubmit(onSignInSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Firstname</FormLabel>
                            <FormControl>
                                <Input placeholder="john" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lastname</FormLabel>
                            <FormControl>
                                <Input placeholder="doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <Button className='bg-foreground text-gray-100 hover:bg-foreground/90 block' type="submit">
                    {!loading ? "Sign up" : "Loading..."}
                </Button>
            </form>
        </Form>
    )
}

export default SignUpForm
