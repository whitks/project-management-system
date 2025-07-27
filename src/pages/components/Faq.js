import React from 'react'
import "./styles/faq.css"
import FaqCard from './FaqCard'
function Faq() {
    const allQuestions = [
        {
            "question": "What is the Final Year Project Management Portal?",
            "answer": "This portal is designed to help B.Tech students manage their final year projects efficiently—track progress, collaborate with teammates, communicate with guides, and submit deliverables all in one place."
        },
        {
            "question": "How do I form a project group?",
            "answer": "Once logged in, go to the 'Create/Join Project Team' section. You can invite your group members using their college email IDs. Once they accept, your team is created."
        },
        {
            "question": "Can I change my project title or abstract after submission?",
            "answer": "Yes, you can modify your project title or abstract, but only before it has been approved by your faculty guide. After approval, any further changes must be re-approved by your department head or admin."
        },
        {
            "question": "How do we submit our weekly progress or status reports?",
            "answer": "Your team lead or members can go to the 'Progress Reports' section and upload weekly updates. You can attach documents or write summaries. Mentors will be notified and can give feedback directly through the portal."
        },
        {
            "question": "Is project progress tracked on the platform?",
            "answer": "Yes. Mentors and admins can monitor each team's progress via submissions, deadlines, and mentor feedback. The dashboard provides an overview of which teams are on schedule and which need follow-ups."
        }
    ]


    return (
        <div className='faq-full mt-100'>
            <div className="container">
                <h2 className="heading"> Frequently Asked Questions </h2>
                {allQuestions.map((ob) => (
                    <FaqCard question = {ob.question} answer = {ob.answer}/>
                ))}

            </div></div>
    )
}

export default Faq