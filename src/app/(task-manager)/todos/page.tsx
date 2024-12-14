import TodoList from '@/features/todo/components/shared/TodoList'
import { AddTodo } from '@/features/todo/components/shared/AddTodo'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'
const TodoRoute = async () => {

  const userId = await getCookie('userid', { cookies })
  const token = await getCookie('token', { cookies })

  const response = await axios.get(`${process.env.BACKEND_URL}/api/todos/?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const data = response.data
  return (
    <main className='min-h-[calc(100vh-8rem)] py-4'>
      <section className='box'>
        <AddTodo userId={userId as string} />
        <TodoList data={data} />
      </section>
    </main>
  )
}

export default TodoRoute
