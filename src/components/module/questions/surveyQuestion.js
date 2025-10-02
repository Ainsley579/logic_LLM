import React, {useEffect, useState, useRef} from "react";
import { Row, Col, Image, Typography, Checkbox, Space, Button, message, 
    Input, Divider, Radio, Form } from 'antd';

export function SurveyQuestion ({currentPhrase, question, updateAnswer, ifLast, group,
    currentIndex, questionLen}){
    const [messageApi, contextHolder] = message.useMessage();
    const [answer, setAnswer] = useState(null);
    const [Q2answer, setQ2Answer] = useState(null);
    const [unselect, setUnselect] = useState([]);
    const [finishQ1, setFinishQ1] = useState(false);

    const questionRef = useRef(null);

    const [form] = Form.useForm();

    const setInitState = () => {
        setAnswer(null);
        setQ2Answer(null);
        setUnselect([]);
        setFinishQ1(false);
    };

    const onMultiSelectionChange = (e) => {
        //console.log('radio checked', e);
        setAnswer(e);
    };

    const onQ2Change = (e) => {
        //console.log('radio checked', e.target.value);
        setQ2Answer(e.target.value);
    };

    const ifIllegalSelect = (answer, choices) => {
        const val = choices.filter(e=>e.text === "None of the above")[0].value;
        return(answer.includes(val));
    };

    const onFormFinish = (values) => {
        //console.log('Success:', values, values.question2);
        updateAnswer(values, question, currentPhrase);
        setInitState();
        form.resetFields();
        questionRef.current.scrollTop = 0;
        window.scrollTo(0, 0);
    };

    const onFormFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('Please finish the MUST SELECT or WRITE options to continue.');
    };

    const onFinish = () => {
        const qlength = question.choices.length;
        const qIDs = question.choices.filter(e=>e.text !== "None of the above").map((e,i)=>i);
        //const textTakeAway = [textAreaVal1, textAreaVal2, textAreaVal3];
        if(answer !== null){
            if(answer.length <= qlength && answer.length !== 0){
                if(answer.length === 1 && question.choices[answer[0]].text === "None of the above"){
                    //console.log("None of the above");
                    setUnselect(answer);
                    setFinishQ1(true);
                }else if(ifIllegalSelect(answer, question.choices)){
                    message.error('Please do not select "None of the above" and other options at the same time');
                }else{
                    //console.log(ifIllegalSelect(answer, question.choices));
                    const difference = qIDs.filter(x => !answer.includes(x));
                    //console.log(difference);
                    setUnselect(difference);
                    setFinishQ1(true);
                }
            }else{
                message.error('Please select options to continue.');
            }
        }else{
            message.error('Please select options to continue.');
        }
        
        /*answer === null ? messageApi.info('Please choose an answer!')
            : updateAnswer(answer, question, currentPhrase);*/
        //console.log(answer);
    };

    useEffect(()=>{
        setAnswer(null);
    }, [question]);

    const { Title, Paragraph, Text, Link } = Typography;
    const { TextArea } = Input;
    
    return(
        <div
            style={{
                padding: 15,
                //maxHeight: 1080,
                overflow: "scroll"
            }}
        >
        {contextHolder}
            <Row>
                <Col span={2}>
                    <Text>Task:</Text>
                    <Text strong>{currentIndex+1}/{questionLen}</Text>
                </Col>
                <Col span={22}>
                    <Image
                        width={800}
                        src={process.env.PUBLIC_URL+question.pictureURL}
                        preview={false}
                    />
                </Col>
            </Row>
            <Divider style={{
                marginTop: 0,
                marginBottom: 0,
                fontSize: 12
            }}>Scroll to see all questions</Divider>
            <div ref={questionRef} style={{
                marginTop: 10,
                maxHeight: 380,
                overflow: "scroll"
            }}>
            <Row>
                <Col span={24}>
                <Text>Task: </Text>
                <Text strong>{currentIndex+1}/{questionLen}:</Text>
                </Col>
                <Col span={24}>
                    <Title level={5} style={{marginTop:2}}>Q1. {question.title} <Text type="danger">(Select one or more)</Text></Title>
                </Col>
            </Row>

            <Form
                name="takeawayForm"
                //style={{ maxWidth: 500 }}
                layout="vertical"
                form={form}
                autoComplete="off"
                onFinish={onFormFinish}
                onFinishFailed={onFormFinishFailed}
            >

            <Row>
            <Space size="small" direction="vertical" >
                <Form.Item
                    name={'question1'}
                    noStyle
                    rules={[{ required: true }]}
                >                
                <Checkbox.Group onChange={onMultiSelectionChange} value={answer}>
                    <Space direction="vertical">
                        {question.choices.map((e,i)=><Checkbox key={e.value} value={e.value}>
                            <b>({i+1})</b> {e.text}
                        </Checkbox>)}
                    </Space>
                </Checkbox.Group>
                </Form.Item>
                {!finishQ1 && <Button type="primary" size="small" onClick={onFinish} >Confirm selection & show following questions</Button>}
            </Space>  
            </Row>

            {finishQ1 && 
            <Row>
            {unselect.length>0 && <Col span={24}>
                <Title level={5} style={{marginTop: 15}}>Q2. Reasons about the unselected options: <Text type="danger">*</Text></Title>
            </Col>}
            {unselect.length>0 && unselect.map((e,i)=>
            <div key={"div-"+i} style={{marginLeft: 10}}>
                {question.choices[e].text === "None of the above" &&
                <Space size="small" direction="vertical" key={"coltitle-"+i}>
                <Text key={"textarea-"+i}>Q2.{i+1}. Please explain why you think none of the takeaways provided are true <Text type="danger">*(must write)</Text></Text> 
                <Form.Item
                    name={['question2', 'textarea-'+e]}
                    noStyle
                    rules={[{ required: true, message: 'Please specify why you select "none of the above"' }]}
                >
                    <TextArea 
                    style={{marginBottom: 5, width: 900}}
                    showCount 
                    rows={1}
                    maxLength={500} 
                    //onChange={onTextAreaChangeSelection} 
                    placeholder="provide your explanation here" 
                    />
                </Form.Item>
                </Space>
                }

                {question.choices[e].text !== "None of the above" &&
                <Space size="small" direction="vertical" key={"coltitle-"+i}>
                <Text key={"textarea-"+i}><b>Q2.{i+1}.</b> Why do you believe Takeaway <b>"({e+1}) {question.choices[e].text}"</b> is not true? Please choose the MOST relevant option and provide a brief explanation.<Text type="danger">(Select only one)</Text></Text>
                <Form.Item
                    name={['question2', 'singleChoice-'+e]}
                    noStyle
                    rules={[{ required: true, message: 'please select one option' }]}
                >
                    <Radio.Group onChange={onQ2Change} value={Q2answer} key={"radiogroup-"+i} >
                    <Space size="small" direction="vertical">
                        {group === 2 && <Radio value={0} key={"radioselection1"+i}>
                            This may not be true due to data uncertainty
                        </Radio>}
                        <Radio value={1} key={"radioselection2"+i}>
                            The circle size pattern on the map suggests otherwise
                        </Radio>
                        <Radio value={2} key={"radioselection3"+i}>
                        Based on my prior knowledge of this topic, this is not true
                        </Radio>
                        <Radio value={3} key={"radioselection4"+i}>
                        Other
                        </Radio>
                    </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name={['question2', 'textarea-'+e]}
                    noStyle
                >
                    <TextArea 
                    key={"textselection4"+i}
                    style={{marginBottom: 5, marginTop: -5}}
                    showCount 
                    rows={1}
                    maxLength={500} 
                    //onChange={onTextAreaChangeSelection} 
                    placeholder="Provide explanation of your choice here" 
                    />

                </Form.Item>
                </Space>
                }
            </div>
            )}
        
            <Col span={24}>
                <Title level={5} style={{marginTop: 10}}>Q3. Please provide any additional takeaways about {question.attribute} in the US (optional, add up to 3).</Title>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={24} style={{marginBottom: 2}}>Takeaway-{1}</Col>
                    <Col span={24}>
                    <Form.Item
                    name={['question3', 'textarea1']}
                    noStyle
                    >
                    <TextArea 
                    style={{marginBottom: 5}}
                    showCount 
                    rows={1}
                    maxLength={500} 
                    //onChange={onTextAreaChange1} 
                    placeholder="Write your own takeaway here (optional)" 
                    />
                    </Form.Item>
                    </Col>

                    <Col span={24} style={{marginBottom: 2}}>Takeaway-{2}</Col>
                    <Col span={24}>
                    <Form.Item
                    name={['question3', 'textarea2']}
                    noStyle
                    >
                    <TextArea 
                    style={{marginBottom: 5}}
                    showCount 
                    rows={1}
                    maxLength={500} 
                    //onChange={onTextAreaChange2} 
                    placeholder="Write your own takeaway here (optional)" 
                    />
                    </Form.Item>
                    </Col>

                    <Col span={24} style={{marginBottom: 2}}>Takeaway-{3}</Col>
                    <Col span={24}>
                    <Form.Item
                    name={['question3', 'textarea3']}
                    noStyle
                    >
                    <TextArea 
                    style={{marginBottom: 5}}
                    showCount 
                    rows={1}
                    maxLength={500} 
                    //onChange={onTextAreaChange3} 
                    placeholder="Write your own takeaway here (optional)" 
                    />
                    </Form.Item>
                    </Col>
                </Row>
            </Col>
        

        <Col style={{marginTop: 15}}>
            {ifLast ? <Form.Item><Button type="primary" htmlType="submit" >Next Section</Button></Form.Item> :
                <Form.Item><Button type="primary" htmlType="submit" >Next Question</Button></Form.Item>
            }
        </Col>
        </Row>
            }

            

            </Form> 
            </div>
        </div>
    );
}