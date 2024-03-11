import {
  collection,
  getDocs,
  QuerySnapshot,
  query,
  limit,
  startAfter,
  getDoc,
} from 'firebase/firestore'
import { store } from './firebase'
import Card from '@/models/card'
import { COLLECTIONS } from '@/constants'
import { doc } from 'firebase/firestore'

//pageParam: 지금 보이고 있는 맨 마지막 요소
export async function getCards(pageParam?: QuerySnapshot<Card>) {
  //커서의 여부에 따라 쿼리 생성. 10개씩 자르고, null이 아니면 pageParam 커서 이후부터 10개씩 불러오는 쿼리
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(10))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(10),
        )

  const cardSnapshot = await getDocs(cardQuery)

  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]
  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  //받아온 데이터, 마지막 커서 리턴 -> 마지막 커서를 기준으로 또 그다음 데이터 호출, 마지막 커서 리턴
  return { items, lastVisible }
}

export async function getCard(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.CARD, id))
  return {
    id,
    ...(snapshot.data() as Card),
  }
}
