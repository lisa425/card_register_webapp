//인증 처리
import { useState } from 'react'
//파이버베이스의 인증상태가 바뀌면 동작하는 함수
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/remote/firebase'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@/atoms/user'
function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  onAuthStateChanged(auth, (user) => {
    setInitialize(true)
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      })
    } else {
      setUser(null)
    }
  })

  if (initialize === false) {
    return null
  }

  return <>{children}</>
}

export default AuthGuard
