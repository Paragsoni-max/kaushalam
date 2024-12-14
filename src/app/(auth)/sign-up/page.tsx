"use client"

import SignUpForm from '@/features/users/components/shared/SignUpForm'

const SignUpRoute = () => {
  return (
    <main className="min-h-[calc(100vh-8rem)] py-4 center">
      <div className='min-w-[360px] w-1/3 p-8 rounded-lg shadow-lg border'>
        <div className='mb-4'>
          <h2 >Sign up</h2>
          <small>Sign up with your credentials to add Todos !</small>
        </div>
        <SignUpForm />
      </div>
    </main>
  )
}

export default SignUpRoute
