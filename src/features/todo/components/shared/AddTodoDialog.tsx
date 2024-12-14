"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { todoSchema } from '../../validation-schema/todoValidation'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'


const AddTodoDialog = ({ userId }: { userId: string }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const { toast } = useToast()
    const router = useRouter();
    const form = useForm<z.infer<typeof todoSchema>>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })
    const onSubmit = async (values: z.infer<typeof todoSchema>) => {
        setLoading(true)
        const reqObj = {
            userId: userId,
            priority: "low",
            ...values
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos/add`, reqObj, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            setLoading(false)
            toast({
                title: response.data.message,
            })
            form.reset()
            router.push('/todos')
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-gray-800 text-white hover:bg-gray-700'>Add Todo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Todo</DialogTitle>
                </DialogHeader>
                <DialogDescription />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="title" type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Add a description"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <DialogClose asChild> */}
                            <Button className='bg-foreground text-gray-100 hover:bg-foreground/90' type="submit">
                                {!loading ? "Add" : "Loading..."}
                            </Button>
                        {/* </DialogClose> */}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddTodoDialog
