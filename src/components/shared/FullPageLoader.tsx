import Flex from './Flex'
import Text from './Text'
import Spacing from './Spacing'

function FullPageLoader({ message }: { message?: string }) {
  return (
    <Flex
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}
      justify="center"
      align="center"
    >
      <Flex direction="column" align="center">
        <img
          src="https://png.pngtree.com/png-vector/20190114/ourmid/pngtree-vector-rocket-icon-png-image_314434.jpg"
          alt=""
        />
        {message !== null ? (
          <>
            <Spacing size={120} />
            <Text bold={true} typography="t4">
              {message}
            </Text>
          </>
        ) : null}
      </Flex>
    </Flex>
  )
}

export default FullPageLoader
