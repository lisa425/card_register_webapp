import React from 'react'
import logo from './logo.svg'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import './App.css'
import Text from '@shared/Text'
import Button from './components/shared/Button'

function App() {
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
    </div>
  )
}

export default App
