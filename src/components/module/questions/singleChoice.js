import React, {useEffect, useState} from "react";
import { Row, Col, Image, Typography, Radio, Space, Button, message,
    Popconfirm } from 'antd';

export function SingleChoice (props){
    const [messageApi, contextHolder] = message.useMessage();
    const [answer, setAnswer] = useState(null);

    const popconfirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
      };
      const popcancel = (e) => {
        console.log(e);
        message.error('Click on No');
      };

    const onChange = (e) => {
        //console.log('radio checked', e.target.value);
        setAnswer(e.target.value);
    };

    const onFinish = () => {
        answer === null ? messageApi.info('Please choose an answer!')
            : props.updateAnswer(answer, props.question, props.currentPhrase);
    };

    useEffect(()=>{
        setAnswer(null);
    }, [props.question]);

    const { Title, Paragraph, Text, Link } = Typography;

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
                <Col span={1}>
                    <Text>Question:</Text>
                    <Text strong>{props.currentIndex+1}/{props.questionLen}</Text>
                </Col>
                <Col span={23}>
                    <Image
                        width={900}
                        src={process.env.PUBLIC_URL+props.question.pictureURL}
                        preview={false}
                    />
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Title level={4}>Q{props.currentIndex+1}: {props.question.title}</Title>
                </Col>
            </Row>

            <Row >
                <Radio.Group onChange={onChange} value={answer}>
                    <Space direction="vertical">
                        {props.question.choices.map(e=><Radio key={e.value} value={e.value}>{e.text}</Radio>)}
                    </Space>
                </Radio.Group>
            </Row>

            <Row style={{marginTop: 15}}>
            {props.currentPhrase !== "vlat" && <Popconfirm
                title="Confirm the answer"
                placement="right"
                description="This question helps confirm that you have understood our instructions. Please confirm that you've chosen the intended option."
                onConfirm={onFinish}
                okText="Yes, I confirm"
                cancelText="No, I want to change my selection"
            >
                {props.ifLast ? <Button type="primary" >Next Section</Button> :
                    <Button type="primary" >Next Question</Button>
                }
            </Popconfirm>}
            {props.currentPhrase === "vlat" &&
            <>
            {props.ifLast ? <Button onClick={onFinish} type="primary" >Next Section</Button> :
                    <Button onClick={onFinish} type="primary" >Next Question</Button>
            }
            </>
            }
            </Row>
        </div>
    );
}