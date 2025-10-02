import React, {useEffect, useState} from "react";
import {Typography, Button, Form, Input, Modal, Image} from 'antd';

export function Initpage({setProlificID}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const {Title, Paragraph, Text, Link} = Typography;

    const onFinish = (values) => {
        //console.log('Success:', values.prolificIDInput);
        setProlificID(values.prolificIDInput);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div style={{padding: 20}}>
            <Typography>
                <Title>Introduction</Title>
                <Paragraph>
                    Welcome to our study on <Text strong>Reading Symbol Maps.</Text>
                    This study should take around 25 minutes to complete.
                </Paragraph>

                <Paragraph>
                    This study will ask you to answer questions and select/write your takeaways from reading maps.
                </Paragraph>

                <Title level={2}>When Finished...</Title>
                <Paragraph>
                    After you have finished all the questions, there is a Demographics Questionnaire. Please complete
                    it.
                    When you have completed the Demographics Questionnaire, a redeem code will be spawned in the page.
                    Please enter this redeem code in order to get your compensation.
                </Paragraph>

                <Text mark strong>
                    Please do not use the back/forward or refresh features of your browser as
                    they will end your session and you will not be paid.
                </Text>

                <Paragraph>
                    {/** I will use popover window show the consent form soon */}
                    Please read the <Button type="link" onClick={showModal}><b>Consent Form</b></Button> before you
                    start this user study.
                    If you agree to participate in this user study,
                    please input your ID and click “Start”.
                </Paragraph>
            </Typography>

            <Modal width={1200} open={isModalOpen} onOk={handleOk} onCancel={handleOk}
                   styles={{maxHeight: 800, overflow: "auto"}}
                   footer={[
                       <Button type="primary" key="back" onClick={handleOk}>
                           OK
                       </Button>
                   ]}
            >
                <Typography>
                    <Title level={3}>CONSENT FORM</Title>
                    <Title level={4} style={{marginTop: 1, marginBottom: 5}}>INTRODUCTION</Title>
                    <Paragraph>
                        The purposes of this form are to provide you (as a prospective research study participant)
                        information that may affect your decision as to whether or not to participate in this research
                        and to record the consent of those who agree to be involved in the study. This study is funded
                        by Arizona State University internally. </Paragraph>

                    <Title level={4} style={{marginTop: 1, marginBottom: 5}}>RESEARCHERS</Title>
                    <Paragraph>
                        {/*"REMOVED FOR ANONYMOUS REQUIREMENT"*/}
                        Ross Maciejewski, Assistant Professor, Varun Srivastava, Graduate Research Associate, and Fan Lei, Graduate Research Associate
                    </Paragraph>

                    <Title level={4} style={{marginTop: 1, marginBottom: 5}}>STUDY PURPOSE</Title>
                    <Paragraph>
                        This research aims to assess how inferences are made while reading maps that present diverse topics, visual variables, and data distributions. <Text underline strong>You will be given a list of statements about each map. Select the ones that you believe are true based on the data shown. You can also provide your detailed interpretations for each map.</Text>
                    </Paragraph>

                    <Title level={4} style={{marginTop: 1, marginBottom: 5}}>DESCRIPTION OF RESEARCH STUDY</Title>
                    <Paragraph>
                        We will not ask your name or any other identifying information in this survey. For research
                        purposes, an anonymous numeric code will be assigned to your responses. We will destroy any
                        personal information from the start, and it will be impossible to identify you. In this study,
                        we will present you with a few bar charts and ask you to answer some questions directly related
                        to the charts. We anticipate that this study will take approximately <Text underline strong>20-25
                        minutes</Text>. Your participation is completely voluntary, and you may cease participation at
                        any time.
                    </Paragraph>

                    <Title level={4} style={{marginTop: 1, marginBottom: 5}}>INCLUSION CRITERIA</Title>
                    <Paragraph>
                        In order to participate in this study, you must be between 18 and 75 years of age, have the
                        ability to communicate in English, have average or corrected-to-average vision, and have manual
                        dexterity sufficient to operate a computer mouse and keyboard.
                    </Paragraph>

                    <Title level={4} style={{marginTop: 1, marginBottom: 5}}>RISKS</Title>
                    <Paragraph>
                        There are no known risks from taking part in this study. There are no foreseeable risks or
                        discomforts to your participation.
                    </Paragraph>

                    <Title level={4} style={{marginTop: 1, marginBottom: 5}}>BENEFITS</Title>
                    <Paragraph>
                        You will also be compensated for your participation. We will compensate $4.00 upon successful
                        completion of the survey. If you do not make it to the end of the survey, then you will not be
                        eligible for compensation. In order to be compensated properly, a keycode will be generated at
                        the end of the survey. You must copy-paste the code into Prolific.co to receive payment.
                    </Paragraph>
                </Typography>

                <Title level={4} style={{marginTop: 1, marginBottom: 5}}>CONFIDENTIALITY</Title>
                <Paragraph>
                    All information obtained in this study is strictly confidential. The results of this research study
                    may be used in reports, presentations, and publications, but the researchers will not identify you
                    by name. In order to maintain confidentiality of your records, we will follow these procedures: (1)
                    Each participant will be assigned a number; (2) The researchers will record any data collected
                    during the study by number, not by name; (3) Any original data files will be stored in a secured
                    location accessed only by authorized researchers. (4) Your Prolific.co profile will be temporarily
                    stored in order to pay you for your time. Your data and survey results will only by shared in the
                    aggregate form. Your data will not be shared with other investigators, nor will it be re-used in a
                    future study.
                </Paragraph>

                <Title level={4} style={{marginTop: 1, marginBottom: 5}}>WITHDRAWAL PRIVILEGE</Title>
                <Paragraph>
                    Participation in this study is completely voluntary. It is ok for you to say no. Even if you say yes
                    now, you are free to say no later, and withdraw from the study at any time. Your participation is
                    voluntary and that nonparticipation or withdrawal from the study will not affect your employment
                    status.
                </Paragraph>

                <Title level={4} style={{marginTop: 1, marginBottom: 5}}>VOLUNTARY CONSENT</Title>
                <Paragraph> {/**"REMOVED FOR ANONYMOUS REQUIREMENT" */}
                    If you have any questions concerning the research study, please contact principal investigator Dr. Ross Maciejewski at rmacieje@asu.edu and the research team member Varun Srivastava vsriva11@asu.edu. If you have any questions about your rights as a subject/participant in this research, or if you feel you have been placed at risk, you can contact the Chair of the Human Subjects Institutional Review Board, through the ASU Office of Research Integrity and Assurance, at (480) 965-6788.
                </Paragraph>
                <Paragraph>By starting the study, you are consenting to participate in this study.</Paragraph>
            </Modal>

            <Form
                name="prolificIDForm"
                //style={{ maxWidth: 500 }}
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Enter your Prolific ID:"
                    name="prolificIDInput"
                    style={{maxWidth: 500}}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your prolific ID!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item style={{width: '100%'}}>
                    <Button type="primary" htmlType="submit"
                            style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
                        <b>Start</b>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
