import React from "react";
import "./AssetDetail.css";
import Accordion from "react-bootstrap/Accordion";

export default function Faq() {
  return (
    <div className="col-md-12 pt-3 pb-3" >
      <h6 className="subtitle" style={{textAlign:"center"}}>
        <span className="orange-circle" ></span>
        COMMON QUERIES
      </h6>
      <h2
        className="headings"
        style={{ color: "#101010" }}
      >
        Frequently Asked Questions
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "#343a40",
          fontSize: "16px",
          
          marginBottom: "30px",
        }}
      >
        You will find answers to about our electric vehicles and electric
        vehicle specialists service and more. Please feel free to contact us if
        you don't get your question's answer in below.
      </p>
      <div className="col-md-12 mt-5 mb-5">
      <Accordion eventKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>What is the business model?</Accordion.Header>
          <Accordion.Body>
            This is buy, lease and earn model. You Buy the assets and lease out
            to Mooving. Mooving will pay you monthly assured returns
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            What is the min investment Amount?
          </Accordion.Header>
          <Accordion.Body>
            You can start investing in min 1 asset
          </Accordion.Body>
        </Accordion.Item>
        
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            {" "}
            What return I can expect from my investment?{" "}
          </Accordion.Header>
          <Accordion.Body>
            The returns varies as per assets you are investing in. You can
            expect upto 22% returns
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="11">
          <Accordion.Header>
            {" "}
            What does my investment include?{" "}
          </Accordion.Header>
          <Accordion.Body>
            You can invest in Lectrix ecity zip , Livguard 40AH and Livguard 100AH battery.
          </Accordion.Body>
        </Accordion.Item>
        
        <Accordion.Item eventKey="3">
          <Accordion.Header> When would my returns start?</Accordion.Header>
          <Accordion.Body>
            You will start getting returns from the next month of completion of
            payment of investment amount. Mooving will pay returns in every
            first week of month till 36 months
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            How can I track my investment related details?{" "}
          </Accordion.Header>
          <Accordion.Body>
            The user have to login in Invest&Earn user dasboard to track
            investment related details
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header> How long the agreement last? </Accordion.Header>
          <Accordion.Body>The agreement is for 3 yrs</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>
            What happen after 3 years’ agreement?{" "}
          </Accordion.Header>
          <Accordion.Body>
            No, this is one-time investment. All the opertational and
            maintainance cost will be taken care by Mooving
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="7">
          <Accordion.Header>
            Do we need to pay any other amount apart from the Investment?{" "}
          </Accordion.Header>
          <Accordion.Body>
            You can start investing in min 1 asset
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="8">
          <Accordion.Header>
            {" "}
            What are the payment mode available?{" "}
          </Accordion.Header>
          <Accordion.Body>
            Only online mode is available for payment
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="9">
          <Accordion.Header>Is IRR different from ROI? </Accordion.Header>
          <Accordion.Body>
            ROI and IRR are complementary metrics where the main difference
            between the two is the time value of money. ROI gives you the total
            return of an investment but doesn’t take into consideration the time
            value of money. IRR hence not only represents the amount of money
            earned but also how fast it was earned 
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      </div>
    </div>
  );
}
