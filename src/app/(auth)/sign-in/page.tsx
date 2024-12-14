"use client"

import SignInForm from '@/features/users/components/shared/SignInForm'
import React from 'react'

const SignInRoute = () => {
  return (
    <main className="min-h-[calc(100vh-8rem)] py-4 center">
      <div className='min-w-[360px] w-1/3 p-8 rounded-lg shadow-lg border'>
        <div className='mb-4'>
          <h2 >Sign in</h2>
          <small>Sign in with your credentials to see Todos !</small>
        </div>
        <SignInForm />
      </div>
    </main>
  )
}

export default SignInRoute
