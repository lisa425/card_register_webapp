import { getAdBanners } from '@/remote/adBanner'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useQuery } from 'react-query'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import { Link } from 'react-router-dom'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
function AdBanners() {
  const { data, isLoading } = useQuery(['adBanners'], () => getAdBanners())

  if (data == null || isLoading) {
    return (
      <Container>
        <Flex direction="column" css={bannerContainerStyles}>
          <Text bold={true}>&nbsp;</Text>
          <Text typography="t7">&nbsp;</Text>
        </Flex>
      </Container>
    )
  }

  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link}>
                <Flex direction="column" css={bannerContainerStyles}>
                  <Text bold={true}>{banner.title}</Text>
                  <Text typography="t7">{banner.description}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.gray};
  border-radius: 4px;
`
export default AdBanners
