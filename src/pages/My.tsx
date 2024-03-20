import Flex from '@shared/Flex'
import Text from '@shared/Text'
import useUser from '@/hooks/auth/useUser'
import Button from '@shared/Button'
import { useCallback } from 'react'
import { auth } from '@/remote/firebase'
import { signOut } from 'firebase/auth'
import MyImage from '@/components/my/MyImage'
import Spacing from '@/components/shared/Spacing'
function MyPage() {
  const user = useUser()
  console.log(user)

  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  return (
    <Flex direction="column" align="center">
      <Spacing size={40} />
      <MyImage size={80} mode="upload" />
      <Spacing size={20} />
      <Text>{user?.displayName}</Text>
      <Spacing size={20} />
      <Button onClick={handleLogout}>로그아웃</Button>
    </Flex>
  )
}

export default MyPage
