import AddTodoDialog from "./AddTodoDialog";


export function AddTodo({userId}:{userId:string}) {
  return (
    <main className="py-4">
      <section className='box'>
        <div className="flex justify-end">
          <AddTodoDialog userId={userId}/>
        </div>
      </section>

    </main>
  )
}
