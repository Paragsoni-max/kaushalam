"use client"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"
import EditTodoDialog from "./EditTodoDialog"

const TodoList = ({ data }: { data: any }) => {
    const { toast } = useToast();

    const handleTodoDelete = async (id: any) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            if (response.status === 200) {
                toast({
                    title: response.data.message,
                    description: "Deleted successfully",
                })
            }
            window.location.reload()

        } catch (error) {

        }
    }

    const handleTodoComplete = async (id: any) => {
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos/mark-completed/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            if (response.status === 200) {
                toast({
                    title: response.data.message,
                    description: "completed successfully",
                })
            }
            window.location.reload()

        } catch (error) {

        }
    }
    const handleTodoPriority = async (id: any, priority: 'low' | 'high') => {
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos/add-priority/${id}`, { priority }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            console.log(response)
            if (response.status === 200) {
                toast({
                    title: response.data.message,
                    description: "Added successfully",
                })
            }
            window.location.reload()

        } catch (error) {

        }
    }

    return (
        <div>
            <h1>Todo List</h1>
            <div className="mt-8">
                <Table>
                    <TableCaption>A list of your Todos.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">SNo</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((singleTodo: any, index: number) => {
                            const todoPriority = singleTodo.priority === 'low' ? 'high' : 'low'
                            return (
                                <TableRow key={singleTodo._id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{singleTodo.title}</TableCell>
                                    <TableCell className="w-96">{singleTodo.description}</TableCell>
                                    <TableCell className="relative">
                                        <button onClick={() => handleTodoPriority(singleTodo._id, todoPriority)} className={`text-white absolute top-0 bottom-0 left-0 right-0 m-auto w-12 h-8 center  ${singleTodo.priority === "low" ? "bg-gray-500" : "bg-red-500"} text-center mx-auto font-semibold rounded-lg`}>{singleTodo.priority}</button >
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        <EditTodoDialog id={singleTodo._id} />
                                        <Button onClick={() => handleTodoDelete(singleTodo._id)} className='bg-red-500 text-white hover:bg-red-700 flex-1'>Delete</Button>
                                        <Button onClick={() => handleTodoComplete(singleTodo._id)} className='bg-green-500 text-white hover:bg-green-700 flex-1'>{!singleTodo.completed ? "Mark complete" : "Completed"}</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default TodoList
