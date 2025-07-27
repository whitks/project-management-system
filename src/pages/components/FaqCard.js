import { useRef, useState } from "react"
function FaqCard({question, answer}) {
    const [showAnswer,setShowAnswer] = useState(false)
    const iconRef = useRef()
    function handleClick(){
        setShowAnswer((prev)=>(!prev))
        iconRef.current.classList.toggle("rotate-icon")
    }
    return (
        <div className="FAQ active" onClick={handleClick}>
            <button className="accordion">
                {question}
                <i class="fa-solid fa-chevron-right" ref={iconRef}></i>
            </button>
            {showAnswer&&<div className="answer">
                <p className="content">
                    {answer}
                </p>
            </div>}
        </div>
    )
}

export default FaqCard