import { css } from '@emotion/react'
import Flex from './Flex'
import Skeleton from './Skeleton'
import Spacing from './Spacing'
import Text from './Text'

//List Row: 레이아웃 틀을 담당.
interface ListRowProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode
  onClick?: () => void
  withArrow?: boolean
  as?: 'div' | 'li'
}

function ListRow({
  as = 'li',
  left,
  contents,
  right,
  onClick,
  withArrow,
}: ListRowProps) {
  return (
    <Flex as={as} css={listRowContainerStyles} onClick={onClick} align="center">
      <Flex css={listRowLeftStyles}>{left}</Flex>
      <Flex css={listRowContentStyles}>{contents}</Flex>
      <Flex>{right}</Flex>
      {withArrow ? <IconArrow /> : null}
    </Flex>
  )
}

const listRowContainerStyles = css`
  padding: 8px 24px;
`

const listRowLeftStyles = css`
  margin-right: 14px;
`

const listRowContentStyles = css`
  flex: 1;
`
function IconArrow() {
  return (
    <svg
      width={20}
      height={20}
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 " />
    </svg>
  )
}

function ListRowSekeleton() {
  return (
    <Flex as="li" css={listRowContainerStyles} align="center">
      <Flex css={listRowLeftStyles}></Flex>
      <Flex css={listRowContentStyles}>
        <ListRow.Texts
          title={
            <>
              <Skeleton width={67} height={23} />
              <Spacing size={2} />
            </>
          }
          subTitle={<Skeleton width={85} height={20} />}
        />
      </Flex>
      <Flex></Flex>
      <IconArrow />
    </Flex>
  )
}

function ListRowTexts({
  title,
  subTitle,
}: {
  title: React.ReactNode
  subTitle: React.ReactNode
}) {
  return (
    <Flex direction="column">
      <Text bold={true}>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

ListRow.Texts = ListRowTexts
ListRow.Skeleton = ListRowSekeleton

export default ListRow
