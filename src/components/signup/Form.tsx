import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import FixedBottomButton from '@shared/FixedBottomButton'
import { css } from '@emotion/react'
import Spacing from '../shared/Spacing'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { FormValues } from '@/models/signup'
import validator from 'validator'
import { error } from 'console'

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  //하나의 관심사는 하나의 객체에서 관리
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })

  //dirty : 최초 한번 포커싱이 되었는지 체크. dirty가 체크된 이후 에러처리 문구를 띄우기 위함.
  const [dirty, setDirty] = useState<Partial<FormValues>>({})

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: true,
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  //useCallback을 이용하면 계속 생기지 않아서 성능적으로 좋음
  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const canSubmit = Object.keys(errors).length === 0

  return (
    <Flex direction="column">
      <TextField
        label="이메일"
        name="email"
        placeholder="olaf@gamil.com"
        value={formValues.email}
        onChange={handleFormValues}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty.email) ? errors.email : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="비밀번호"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) ? errors.password : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="비밀번호 확인"
        name="rePassword"
        type="password"
        value={formValues.rePassword}
        onChange={handleFormValues}
        hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
        helpMessage={Boolean(dirty.rePassword) ? errors.rePassword : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        name="name"
        placeholder="이름을 입력해주세요."
        value={formValues.name}
        onChange={handleFormValues}
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        helpMessage={Boolean(dirty.name) ? errors.name : ''}
        onBlur={handleBlur}
      />

      <FixedBottomButton
        label="회원가입"
        disabled={canSubmit ? false : true}
        onClick={() => {
          onSubmit(formValues)
        }}
      />
    </Flex>
  )
}

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요.'
  }
  if (formValues.password.length < 8) {
    errors.password = '비밀번호는 8자 이상이어야 합니다.'
  }
  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호는 8자 이상이어야 합니다.'
  } else if (
    validator.equals(formValues.rePassword, formValues.password) === false
  ) {
    errors.rePassword = '비밀번호가 일치하지 않습니다. 다시 확인해주세요.'
  }
  if (formValues.name.length < 2) {
    errors.name = '이름은 2글자 이상이어야 합니다.'
  }

  return errors
}

const formContainerStyles = css`
  padding: 24px;
`

export default Form
