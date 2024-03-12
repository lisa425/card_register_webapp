import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import FixedBottomButton from '@shared/FixedBottomButton'
import { css } from '@emotion/react'
import Spacing from '../shared/Spacing'

function Form() {
  return (
    <Flex direction="column">
      <TextField label="이메일" placeholder="olaf@gamil.com" />
      <Spacing size={16} />
      <TextField label="비밀번호" type="password" />
      <Spacing size={16} />
      <TextField label="비밀번호 확인" type="password" />
      <Spacing size={16} />
      <TextField label="이름" placeholder="이름을 입력해주세요." />

      <FixedBottomButton label="회원가입" disabled={true} onClick={() => {}} />
    </Flex>
  )
}

export default Form

const formContainerStyles = css`
  padding: 24px;
`
