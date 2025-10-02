import { useCallback, useEffect, useState } from 'react';
import {Layout, Row, Col, Button} from 'antd';
import './App.css';
import axios from 'axios';

/** system components */
import { NavBar } from './components/nav';
import { Initpage } from './components/module/initPage';
import { FinalPage } from './components/module/finalPage';
import { Questions } from './components/module/questions';

/** data resource */
import surveyQuestions from "./data/questions.json";

function App() {
  const { Header, Content } = Layout;
  const [prolificID, setProlificID] = useState(null);
  const [UID, setUID] = useState(null);
  const [group, setGroup] = useState(null); // pls set to "null" before upload to the server
  const [block, setBlock] = useState(null); // 0, 1, 2
  const [surveyObjList, setSurveyObjList] = useState([]);
  const [finalPageflag, setFinalPageFlag] = useState(false);
  const [passTraining, setPassTraining] = useState(false);

  const [vlatResult, setVlatResult] = useState([]);
  const [exptResult, setExptResult] = useState([]);
  const [demographicResult, setDemographicResult] = useState({});
  //const [adjectiveList, setAdjectiveList] = useState([0,1,2,3,4,5,6,7,8,9,10,11]);

  const shuffleArray = (array) => array.sort(()=>Math.random()-0.5);

  const codeGenerator = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    //setUID(result);
    return result;
  };

  const getGroup = useCallback(()=>{
    //const groupNum = 2;
    //const blockNum = 0;
    //setGroup(2); // set back to groupNum in real study
    //setBlock(1);
    /** Real study use */
    axios.get('https://demo.vaderlab.org/textmap_services/reg_participant')
      .then(response => {
        //console.log("reg_participant", response);
        const groupNum = response.data.groupNum;
        const blockNum = response.data.block;
        setGroup(groupNum); // set back to groupNum in real study
        setBlock(blockNum);
      })
      .catch(error => {
        console.log(error);
      });
  },[prolificID]);

  const construcrtSurveyList = useCallback(()=>{
    const surveyQuestions_ = JSON.parse(JSON.stringify(surveyQuestions));
    const adjectiveList_ = shuffleArray([
        {name: 'Accurate', definition: 'Represents the underlying data or geographic patterns truthfully, without distortion or misrepresentation.'},
        {name: 'Correct', definition: 'Contains factual information that aligns with the source data.'},
        {name: 'Error-free', definition: 'Free from detectable mistakes, inconsistencies, or technical flaws in the representation.'},
        {name: 'Honest', definition: 'Presents information transparently, without hiding, exaggerating, or selectively omitting details.'},
        {name: 'Trustworthy', definition: 'Consistently demonstrates qualities such as integrity, transparency, and dependability in how information is shown.'},
        {name: 'Credible', definition: 'Believable due to its alignment with established standards, sound methods, or recognized sources.'},
        {name: 'Fair', definition: 'Treats all aspects of the data impartially, without bias toward specific interpretations or stakeholders.'},
        {name: 'Reliable', definition: 'Yields consistent information across different contexts and is dependable for decision-making.'},
        {name: 'Reputable', definition: 'Associated with known quality or authority, enhancing confidence in its use.'},
        {name: 'Objective', definition: 'Shows data without personal judgment, emotional influence, or subjective bias.'},
        {name: 'Authentic', definition: 'Faithfully reflects the original data and context, without artificial alterations.'},
        {name: 'Balanced', definition: 'Offers a comprehensive perspective that includes all relevant information without overemphasis on any single aspect.'}
    ]);
    // for development
    //const trainSections = ["general_training", "takeaway_training", "uncertainty_training"];
    // group 1 == no uncertainty, group 2 == has uncertainty
    if(group === 1){
      const slist = Object.keys(surveyQuestions_).filter(e=>e!=="survey_group_2")
      .map(e=>{
        const sObj = {
          name: e,
          question: e==="survey_group_1" ? shuffleArray(surveyQuestions_[e][block]) : shuffleArray(surveyQuestions_[e]),
          adjList: adjectiveList_
        };
        if(e === "general_training") sObj.question.pop();
        
        return sObj;
      });
      //slist.filter(e=>trainSections.includes(e.name));
      //console.log(slist.filter(e=>!trainSections.includes(e.name)));
      console.log("survey sections:", slist);
      setSurveyObjList(slist);
    }else if(group === 2){
      const slist = Object.keys(surveyQuestions_).filter(e=>e!=="survey_group_1")
      .map(e=>{
        const sObj = {
          name: e,
          question: e==="survey_group_2" ? shuffleArray(surveyQuestions_[e][block]) : shuffleArray(surveyQuestions_[e]),
          adjList: adjectiveList_
        };
        if(e === "general_training") sObj.question.pop();
        return sObj;
      });
      //slist.filter(e=>trainSections.includes(e.name));
      console.log("survey sections:", slist);
      setSurveyObjList(slist);
    }
  },[group]);

  const goNextSection = (sectionName, anwserlist) => {
    const surveyObjList_ = JSON.parse(JSON.stringify(surveyObjList));
    const trainSections = ["general_training", "takeaway_training", "uncertainty_training"];
    if(trainSections.includes(sectionName)){
      //console.log(sectionName);
      surveyObjList_.shift();
    }else if(sectionName === "survey_group_1" || sectionName === "survey_group_2"){
      //console.log("anwserlist", anwserlist);
      setExptResult(anwserlist);
      surveyObjList_.shift();
    }else if(sectionName === "vlat"){
      //console.log("anwserlist", anwserlist);
      setVlatResult(anwserlist);
      surveyObjList_.shift();
    }else if(sectionName === "demographic"){
      // Survey finished!
      setDemographicResult(anwserlist);
      setUID(codeGenerator(6));
      setPassTraining(true);
      setFinalPageFlag(true);
    }
    setSurveyObjList(surveyObjList_);
  };

  const saveSurveyResults = () => {
    const result = {
      prolificID: prolificID,
      UID: UID,
      group: group,
      block: block+1,
      //vlatResult: vlatResult,
      exptResult: exptResult,
      demographicResult: demographicResult
    };
    console.log("FINAL RESULT: ", result);
    storeResult(result); // disable for development
  };

  const storeResult = (result) => {
    axios.post('https://demo.vaderlab.org/textmap_services/store_result', result)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(()=>{
    //get group and block
    prolificID !== null && getGroup();
  },[prolificID]);

  useEffect(()=>{
    //construct survey
    group !== null && construcrtSurveyList();
  },[group]);

  useEffect(()=>{
    (finalPageflag && passTraining) && saveSurveyResults();
  },[finalPageflag]);

  console.log("group: ", group, "block: ", block+1, "finalPageflag", finalPageflag);
  console.log("current step: ", surveyObjList[0]);
  return (
    <div className="App">
      <Layout className="mainContainer">
        <Header style={{height: 50}}>
          <NavBar />
        </Header>
        <Content className='vastContainer'>
          <Row>
          <Col span={20} offset={2}>
            <div className="detailPanel">
            {prolificID === null && 
              <Initpage
                setProlificID={setProlificID}
              />
            }
            {finalPageflag && 
              <FinalPage
                passTraining={passTraining}
                UID={UID}
              />
            }
            {(surveyObjList.length>0 && prolificID !== null && !finalPageflag) && 
              <Questions
                group={group}
                currentPhrase={surveyObjList[0]}
                setFinalPageFlag={setFinalPageFlag}
                setPassTraining={setPassTraining}
                goNextSection={goNextSection}
                questionLen={surveyObjList[0].question.length}
              />
            }
            </div>
          </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
