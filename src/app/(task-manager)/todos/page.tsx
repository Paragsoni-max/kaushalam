import { TodoTable } from '@/features/todo/components/shared/TodoTable'
import React from 'react'

const TodoRoute = () => {
  return (
    <main className='min-h-[calc(100vh-8rem)] py-4'>
      <section className='box'>
        <TodoTable />
      </section>
    </main>
  )
}

export default TodoRoute
