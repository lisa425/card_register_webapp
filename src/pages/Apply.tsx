import { useState } from 'react'
import Apply from '@/components/apply'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import { updateApplyCard } from '@/remote/apply'
import { APPLY_STATUS } from '@/models/apply'
import useUser from '@/hooks/auth/useUser'
import { useNavigate, useParams } from 'react-router-dom'
import useAppliedCard from '@components/apply/hooks/useAppliedCard'
import { useAlertContext } from '@/contexts/AlertContext'
import FullPageLoader from '@/components/shared/FullPageLoader'

function ApplyPage() {
  //관심사 분리 -> apply 컴포넌트에서는 페이지 분기와 데이터 모으기만, 여기서는 실제 데이터 전송만 담당.
  const [readyToPoll, setReadyToPoll] = useState(false)
  const user = useUser()
  const { id } = useParams() as { id: string }
  const navigate = useNavigate()
  const { open } = useAlertContext()
  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (applied == null) {
          return
        }

        if (applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: '이미 발급된 카드입니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })
          return
        }

        setReadyToPoll(true)
      },
      onError: () => {},
      suspense: true,
    },
  })

  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
      navigate('/apply/done?success=true', {
        replace: true,
      })
    },
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
      navigate('/apply/done?success=false', {
        replace: true,
      })
    },
    enabled: readyToPoll,
  })

  const { mutate, isLoading: 카드신청중인가 } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true)
    },
    onError: () => {
      window.history.back()
    },
  })

  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    return null
  }

  if (readyToPoll || 카드신청중인가) {
    return <FullPageLoader message="카드를 신청중입니다." />
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
