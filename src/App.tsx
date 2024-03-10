import React from 'react'
import logo from './logo.svg'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import './App.css'
import Text from '@shared/Text'
import Button from './components/shared/Button'
import Input from './components/shared/Input'
import TextField from '@shared/TextField'
import Alert from './components/shared/Alert'
import { useAlertContext } from './contexts/AlertContext'
function App() {
  const { open } = useAlertContext()
  return (
    <div className="App">
      <Text typography="t1" display="block" color="blue">
        t1
      </Text>
      <Text typography="t2">t2</Text>
      <Text typography="t3">t3</Text>
      <Text typography="t4">t4</Text>
      <Text typography="t5">t5</Text>
      <div style={{ height: 10, width: '100%', background: '#efefef' }} />

      <Button color="error" size="medium">
        클릭
      </Button>
      <Button color="success" full>
        클릭
      </Button>
      <Button weak={true}>클릭</Button>
      <Button disabled={true}>클릭</Button>
      <div style={{ height: 10, width: '100%', background: '#efefef' }} />
      <TextField label="아이디" />
      <Input placeholder="아이디를 입력하세요" aria-invalid={true} />
      <Input placeholder="비밀번호를 입력하세요" />

      {/* <Alert
        open={true}
        title="알럿이 떴습니다."
        onButtonClick={() => {}}
        description="안녕하세요"
      /> */}

      <Button
        onClick={() => {
          open({
            title: '카드신청완료',
            description: '내역페이지에서 확인해주세요',
            onButtonClick: () => {},
          })
        }}
      />
    </div>
  )
}

export default App
