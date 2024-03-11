import Button from '@shared/Button'
import { card_list } from '@/mock/data'
import { store } from '@remote/firebase'
//collection: 파이어베이스 컬렉션에 접근하기 위한 함수, doc: 문서, Batch를 이용하면 데이터를 한번에 밀어넣음.
import { collection, doc, writeBatch } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'

//Test Page의 여러 관심사들 분리를 위해 CardListAddButton을 별도의 컴포넌트로 분리.
//이 컴포넌트 안에서는 카드 리스트를 추가하는 액션만 관리
function CardListAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    card_list.forEach((card) => {
      const docRef = doc(collection(store, COLLECTIONS.CARD))

      //쌓을 데이터와 doc과 매칭 - 카드 데이터를 하나하나의 문서로 저장
      batch.set(docRef, card)
    })

    await batch.commit()

    alert('카드리스트 추가 완료')
  }
  return <Button onClick={handleButtonClick}>카드 리스트 추가하기</Button>
}

export default CardListAddButton
