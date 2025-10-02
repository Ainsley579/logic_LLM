import React, {useEffect, useState, useRef} from "react";
import { Row, Col, Image, Typography, Radio, Space, Button, message,
    Popconfirm, Divider, Form, Slider } from 'antd';

export function Slides (props){
    const [messageApi, contextHolder] = message.useMessage();
    const [answer, setAnswer] = useState(null);

    const questionRef = useRef(null);

    const [form] = Form.useForm();

    const options = [
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 },
      { label: '6', value: 6 },
      { label: '7', value: 7 },
    ];

    const onChange = (e) => {
        //console.log('radio checked', e.target.value);
        setAnswer(e.target.value);
    };

    const onFormFinish = (values) => {
          console.log('Success:', values);
          props.updateAnswer(values, props.question, props.currentPhrase);
          form.resetFields();
          questionRef.current.scrollTop = 0;
          window.scrollTo(0, 0);
      };
    
    const onFormFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('Please finish the MUST SELECT options to continue.');
    };

    useEffect(()=>{
        setAnswer(null);
        //console.log("adjective list:", props.adjList);
        questionRef.current.scrollTop = 0;
        window.scrollTo(0, 0);
    }, [props.question]);

    const { Title, Paragraph, Text, Link } = Typography;
    //console.log(adjectiveDefinitions[props.adjList[0]]);

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
                    <Text strong>{props.currentIndex+1}/{props.questionLen}</Text>
                </Col>
                <Col span={22}>
                    <Image
                        width={700}
                        src={process.env.PUBLIC_URL+props.question.pictureURL}
                        preview={true}
                    />
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Title level={5} style={{marginTop:2}}>[Task {props.currentIndex+1}/{props.questionLen}]: Please rate to what extent the following items describe the map shown above (Click map to preview, click the question mark to see the definition).</Title>
                </Col>
                <Col span={12}>
                  <Text mark style={{marginLeft: 50}}>1 = Describes the map very poorly</Text>
                </Col>
                <Col span={12}>
                    <Text mark style={{marginLeft: -400}}>7 = Describes the map very well</Text>
                </Col>
              </Row>

            <Divider style={{
                marginTop: 0,
                marginBottom: 0,
                fontSize: 12
            }}>Scroll to see all adjectives</Divider>

            <div ref={questionRef} style={{
                marginTop: 10,
                maxHeight: 305,
                overflow: "scroll"
            }}>
              <Form
                name="takeawayForm"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 900 }}
                 //layout="horizontal"
                form={form}
                autoComplete="off"
                onFinish={onFormFinish}
                onFinishFailed={onFormFinishFailed}
              >
                {props.adjList.map((e)=>
                  <Form.Item
                    key={'key-'+e.name}
                    name={e.name}
                    label={e.name}
                    tooltip={e.definition}
                    rules={[{ required: true, message: 'Please rate for '+e.name }]}
                  > 
                    <Radio.Group
                      block
                      options={options}
                      optionType="button"
                      buttonStyle="solid"
                    />
                  </Form.Item>
                )}
                <Row>
                  <Col style={{marginTop: 15}}>
                  {props.ifLast ? <Form.Item><Button type="primary" htmlType="submit" >Next Section</Button></Form.Item> :
                  <Form.Item><Button type="primary" htmlType="submit" >Next Question</Button></Form.Item>
                  }
                  </Col>
                </Row>
              </Form>
            </div>
        </div>
    );
}