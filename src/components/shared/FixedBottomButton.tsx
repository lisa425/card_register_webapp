import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import { createPortal } from 'react-dom'
import Button from './Button'
import { colors } from '@/styles/colorPalette'

interface FixedBottomButtonProps {
  label: string
  disabled?: boolean
  onClick: () => void
}

function FixedBottomButton({
  label,
  disabled,
  onClick,
}: FixedBottomButtonProps) {
  const $portalRoot = document.getElementById('root-portal')
  if ($portalRoot == null) {
    return null
  }
  return createPortal(
    <Container>
      <Button size={'medium'} full={true} onClick={onClick} disabled={disabled}>
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

const slideup = keyframes`
  to{
    transform: translateY(0)
  }
`

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
  transform: translateY(100%);
  animation: ${slideup} 0.5s forwards ease-in-out;
`

const buttonStyles = css`
  border-radius: 12px;
`
export default FixedBottomButton
