import Form from '@/components/signin/Form'
import React, { useCallback } from 'react'
import { FormValues } from '@/models/signin'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/remote/firebase'
import { useAlertContext } from '@/contexts/AlertContext'
import { FirebaseError } from 'firebase/app'
import { useNavigate } from 'react-router-dom'
function SignInPage() {
  const { open } = useAlertContext()
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password } = formValues
      try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        navigate('/')
      } catch (e) {
        if (e instanceof FirebaseError) {
          if (e.code == 'auth/wrong-password') {
            open({
              title: '계정의 정보를 다시 확인해주세요',
              onButtonClick: () => {},
            })
            return
          }
        } else {
          open({
            title: '잠시 후 다시 시도해주세요.',
            onButtonClick: () => {},
          })
          return
        }
      }
    },
    [open],
  )
  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SignInPage
