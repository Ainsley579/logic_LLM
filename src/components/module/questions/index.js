import { useEffect, useState } from "react";
import { Intro } from "./intro";
import {Spin} from 'antd';

import { SingleChoice } from "./singleChoice";
import { Slides } from "./slides";

export function Questions({currentPhrase, setFinalPageFlag, setPassTraining, 
    goNextSection, group, questionLen}){
    const [showIntro, setShowIntro] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [ifLast, setIfLast] = useState(false);
    const [answerList, setAnswerList] = useState([]);
    const [spinning, setSpinning] = useState(false);

    const showLoader = () => {
        setSpinning(true);
        setTimeout(() => {
          setSpinning(false);
        }, 700);
    };

    const setInitState = () => {
        setShowIntro(true);
        setCurrentIndex(null);
        setCurrentQuestion(null);
        setIfLast(false);
        setAnswerList([]);
    };

    const updateDemographic = (answer) => {
        //console.log('updateDemo', answer);
        setInitState();
        goNextSection(currentPhrase.name, answer);
    };

    const updateAnswer = (answer, question, qtype) => {
        console.log(answer, question, qtype, currentPhrase);
        const trainSections = ["general_training", "takeaway_training", "uncertainty_training"];
        const qlength =currentPhrase.question.length;
        if(trainSections.includes(qtype)){
            const ifCorrect = question.choices[answer].isAnswer;
            if(!ifCorrect){ // fail the training
                setPassTraining(false);
                setFinalPageFlag(true);
            }else{ // correct
                if(currentIndex < qlength-1){
                    setCurrentIndex(currentIndex+1);
                }else if(currentIndex === qlength-2){
                    setIfLast(true);
                    setCurrentIndex(currentIndex+1);
                }else{
                    // next survey section
                    setInitState();
                    goNextSection(currentPhrase.name, []);
                }
            }
        }else if(qtype === "vlat"){
            const ifCorrect = question.choices[answer].isAnswer;
            let anwserlist_ = answerList.map(e=>e);
            const answer_ = {
                anwser: ifCorrect,
                question: question
            };
            anwserlist_.push(answer_);
            if(currentIndex < qlength-1){
                setAnswerList(anwserlist_);
                setCurrentIndex(currentIndex+1);
            }else if(currentIndex === qlength-2){
                setIfLast(true);
                setAnswerList(anwserlist_);
                setCurrentIndex(currentIndex+1);
            }else{
                //console.log(anwserlist_);
                // next survey section
                setInitState();
                goNextSection(currentPhrase.name, anwserlist_);
            }
        }else{
            let anwserlist_ = answerList.map(e=>e);
            const answer_ = {
                anwser: answer,
                question: question
            };
            anwserlist_.push(answer_);
            if(currentIndex < qlength-1){
                setAnswerList(anwserlist_);
                setCurrentIndex(currentIndex+1);
            }else if(currentIndex === qlength-2){
                setIfLast(true);
                setAnswerList(anwserlist_);
                setCurrentIndex(currentIndex+1);
            }else{
                //console.log(anwserlist_);
                // next survey section
                setInitState();
                goNextSection(currentPhrase.name, anwserlist_);
            }
        }
    };

    useEffect(()=>{
        !showIntro && showLoader();
        currentIndex !== null && setCurrentQuestion(currentPhrase.question[currentIndex]);
    },[currentIndex]);

    return(
        <>
            {showIntro && 
                <Intro
                    currentPhrase={currentPhrase.name}
                    setShowIntro={setShowIntro}
                    setCurrentIndex={setCurrentIndex}
                    updateDemographic={updateDemographic}
                />
            }
            {(currentQuestion!==null && currentQuestion.type === "single_choice") && 
                <SingleChoice
                    group={group}
                    currentPhrase={currentPhrase.name}
                    question={currentQuestion}
                    updateAnswer={updateAnswer}
                    ifLast={ifLast}
                    questionLen={questionLen}
                    currentIndex={currentIndex}
                />
            }
            {(currentQuestion!==null && currentQuestion.type === "slides") &&
                <Slides
                    currentPhrase={currentPhrase.name}
                    question={currentQuestion}
                    updateAnswer={updateAnswer}
                    ifLast={ifLast}
                    group={group}
                    questionLen={questionLen}
                    currentIndex={currentIndex}
                    adjList={currentPhrase.adjList}
                />
            }
            <Spin spinning={spinning} fullscreen />
        </>
    );
}