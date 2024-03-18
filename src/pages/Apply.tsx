import { useState } from "react"
import Apply from "@/components/apply"

function ApplyPage(){
  //관심사 분리 -> apply 컴포넌트에서는 페이지 분기와 데이터 모으기만, 여기서는 실제 데이터 전송만 담당.
  const [step, setStep] = useState(2)
  const handleSubmit = () => {}
  return <Apply step={step} onSubmit={handleSubmit} />
}

export default ApplyPage