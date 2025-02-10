import React from 'react'
import AuthForm from './AuthForm'

export const metadata = {
    title: "Authentication",
    description: "Authentication page for login and signup",
};

export default function Page() {
    
  return (
    <div>
      <AuthForm />
    </div>
  )
}
