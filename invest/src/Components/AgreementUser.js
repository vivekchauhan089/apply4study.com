import React from 'react'
import './agreement.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Header from './assets/Header';
import Footer from './assets/Footer'
import { Tabs,TabPanel,Tab,TabList } from 'react-tabs';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
export default function Agreement() {

  
    const navigate=useNavigate();
    const [show,setShow]=React.useState(false);
    const investor=base64_decode( localStorage.getItem('investor_detail'));
    const token = localStorage.getItem("token")?localStorage.getItem("token"):'';
    const investor_detail=JSON.parse(investor);
    const mobile=investor_detail.investor_details?.[0].mobile_no;
    // const agreement_status;
    // useEffect(() => {
    //     window.scrollTo(0, 0)

    //   }, [])
      useEffect(()=>{
     window.scrollTo(0, 0)
        setTimeout(() => {
         setShow(false);
       
       }, 7000)});

       const submit=()=>{
        setShow(true)
        var raw =  {"token":token,"jobType":"investor_agreement", "mobile_no":mobile , agreement_status:"1"}
        var requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(raw),
        };
      fetch("http://localhost/investor_api/index.php/InvestorApis", requestOptions)
        .then(response => response.text())
        .then((result) =>{
          console.log(result);
          navigate("/investment_summery")
        }); 
       }
  return (

    <div >
      <div className='container'>
       {show&& <Alert style={{backgroundColor:"#f47920",color:"#fff" , fontWeight:"500" , fontSize:"16px" , marginTop:"20px"}} >
           Payment Link will be sent in a while.
        </Alert>}
      <div className='agreement-content' style={{margin:"0 !important",padding:"10px 0 !important"}}>
          <h3 className='heading02'>Leasing Agreement</h3>
          <div className='mt-2'>
         <Tabs>
            <TabList>
              <Tab>
                <p>1. Agreement</p>
              </Tab>
              <Tab>
                <p>2. Defination & Scope Of Agreement</p>
              </Tab>
              <Tab>
                <p>3. Restrictions on Resale & Lease Rent</p>
              </Tab>
              <Tab>
                <p>4. Term and Termination</p>
              </Tab>
              <Tab>
                <p>5. Indemnification</p>
              </Tab>
              <Tab>
                <p>6. Dispute Resolution</p>
              </Tab>
              <Tab>
                <p>7. Miscellaneous</p>
              </Tab>
              <Tab>
                <p>8. Witness</p>
              </Tab>
            </TabList>
            <TabPanel>
              <div className="panel-content">
                <p>This leasing agreement (this “Agreement”) is entered on ____ day of _____ 2022:</p>
                <h2>BY AND BETWEEN</h2>
                <p>Mooving Smart Mobility & Energy Pvt Ltd, (hereinafter referred to as “Mooving”), a private limited company incorporated and existing under the laws of India bearing CIN: U31100DL2010PTC198278, having its registered address at WZ-106/101, Rajouri Garden Extn., New Delhi 110027 Delhi, India and principal place of business at 221, Udyog Vihar Phase 1, Gurugram 122016 (which expression shall, unless it be repugnant to the meaning or context thereof, be deemed to mean and include its successors and assigns) of the One Part; </p>
                <h2>AND</h2>
                <p>The person whose details mentioned in Schedule hereto (hereinafter referred to as the “Lessor”, which expression shall, unless it be repugnant to the context or meaning hereof, mean legal heirs, successors and permitted assigns) of the Other Part; and</p>
                <p>Mooving and the Lessor shall hereinafter be referred to individually as a “Party” and collectively as the “Parties”.</p>
                <h2><u>WHEREAS:</u></h2>
                <ul style={{listStyle: 'upper-alpha' }}>
                  <li>Mooving is, inter alia, engaged in the business of (a) leasing of electric vehicles (“EVs”); (b) leasing of batteries and chargers for EVs; and (c) swapping of batteries at its batteries charging stations, (collectively, referred to as the “Business”).</li>
                  <li>The Lessor desires to provide on lease the Product(s) to Mooving and Mooving desires to take on lease the Product(s) from the Lessor subject to the terms and conditions set forth in this Agreement.</li>
                </ul>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <p><b>IN CONSIDERATION OF THE MUTUAL COVENANTS AND AGREEMENTS SET FORTH HEREIN AND FOR OTHER GOOD AND VALUABLE CONSIDERATION, THE RECEIPT AND SUFFICIENCY OF WHICH IS HEREBY ACKNOWLEDGED, THE PARTIES HERETO AGREE AS FOLLOWS:</b></p>
                <h2>Defination</h2>
                <p><b>“Product”</b> means EVs, EV batteries and chargers of OEMs/ manufacturers approved by Mooving more specifically detailed in Annexure “A” attached hereto;
                    <br></br>
                  <b>“Business”</b> shall have meaning assigned to the term in recital A above.
                </p>
                <h2>scope of agreement</h2>
                <ul style={{listStyle: 'number' }}>
                  <li>The Lessor leases to Mooving and Mooving hereby leases from the Lessor, the Products for the Term specified in Clause 5. </li>
                  <li>Mooving shall use the Product(s) solely for the purpose of its Business. Mooving shall have right to use its brand on the Product(s) to denote that the Product(s) is/are being used for Mooving’s Business.</li>
                  <li>In case Product being EV, unless otherwise agreed between the Parties, EV will be registered in the name Mooving before the RTO.</li>
                  <li>The Lessor will be responsible for maintenance, insurance, taxes and other charges leviable on the Product during the Term. However, Mooving will bear the repair and maintenance and running cost of EV / other Product for its leasing / swapping business to the end customer.  Mooving will ensure necessary insurance of the Product covering theft and damage. </li>
                  <li>The warranty obligations towards the Products, during the warranty period, will be fulfilled by the respective OEMs / manufacturers. After the warranty period, the Products will be continued to be serviced and maintained by Mooving. </li>
                  <li>During the warranty period and upon expiry of the warranty period, the service arrangement for the Products will be between Mooving and the Lessor and between Mooving and its end customers for which service fee will be charged from the Lessor and/or the end customers, by Mooving. </li>
                </ul>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <h2>Restriction on Resale</h2>
                <p>During the Term of this Agreement, the Lessor will not re-sale or mortgage the Products, without prior written approval of Mooving.</p>
                <h2>Lease Rent</h2>
                <ul style={{listStyle: 'number' }}>
                  <li>In consideration of the lease of Product(s), Mooving shall pay to the Lessor, the lease rent (the “Lease Rent”) as set forth in Annexure “B”, attached hereto. </li>
                  <li>The Lease Rent will be due on or before the first day of each calendar month. If the Term does not start on the first day of the month or end on the last day of a month, the Lease Rent will be prorated accordingly. </li>
                  <li>Mooving shall have right to withhold / adjust from the Lease Rent any fees, claims, damages, expenses or other amounts owed, or alleged to be owed, to Mooving from the Lessor under this Agreement or any other agreement.</li>                 
                </ul>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <h2>Term</h2>
                <p>This Agreement shall commence on the Effective Date specified in Annexure “B” and, unless terminated earlier in accordance with the terms of this Clause 5, shall continue in effect until thirty-six (36) months after the Effective Date (the “Initial Term”). Post expiry of Initial Term (or any Renewal Term), the Parties may extend the term of this Agreement by agreeing to such renewal at least thirty (30) days prior to the end of the Term, or unless and until earlier terminated in terms of Clause 5.2 (each, a “Renewal Term” and, together with the Initial Term, the “Term”). If no such written renewal is executed, the Agreement shall expire automatically at the end of the Term without further action being required by either Party.</p>
                <h2>Termination</h2>
                <p>Mooving may terminate this Agreement immediately upon written notice to Lessor (and without any right to cure by Lessor) at any time after the occurrence of any of the following:</p>
                <ul  style={{listStyle: 'lower-roman' }}>
                  <li>If Lessor breaches its obligations under this Agreement.</li>
                  <li>Any actions by Lessor which cause, or in the reasonable belief of Mooving are likely to cause:
                    <ul style={{listStyle: 'lower-alpha' }}>
                      <li>substantial harm to Mooving’s business, goodwill or reputation (or the goodwill or reputation of any of the Products); or</li>
                      <li>substantial harms to Lessor’s Business, Goodwill or reputation;</li>
                      <li>repeated breaches of this Agreement or other instances of good cause, regardless of whether those breaches or instances are cured by Lessor after notice and regardless of whether those breaches or instances are similar in nature.</li>
                    </ul>
                  </li>
                </ul>
                <p><i><b>Consequences of termination</b></i> In the event of the expiration or termination of Agreement, without limiting either Party’s right and remedies at law and in equity, but subject to any exclusive remedies set forth herein, the Parties shall have the following rights and obligations:</p>
                <ul  style={{listStyle: 'lower-roman' }}>
                  <li>If Lessor breaches its obligations under this Agreement.</li>
                  <li>Any actions by Lessor which cause, or in the reasonable belief of Mooving are likely to cause:
                    <ul style={{listStyle: 'lower-alpha' }}>
                      <li>termination of this Agreement shall not release either Party from the obligation to make payment of all amounts then due and payable hereunder, up to the date of termination. On the date of termination, Mooving will hand over to the Lessor the possession of the Product(s), subject to normal wear and tear. Mooving will continue to be liable to the Lessor for the outstanding Lease Rent payable in respect of all Products, and such payments will be made within 30 days from the date of termination of the Agreement</li>
                      <li>Mooving, shall not, by reason of the expiration or termination of this Agreement be liable to Lessor for compensation, or damages either on account of present or prospective profits on sales or anticipated sales, or on account of expenditures, investments or commitments made in connection therewith or in connection with the establishment, development or maintenance of the business or goodwill of the Lessor</li>
                      <li>Upon the expiry / early determination of the Lease, the Lessor may offer to sell the Products to Mooving at the value stipulated in Annexure “B”, attached to this Agreement. Mooving shall have option (but not the obligation) to purchase the Products from the Lessor.</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <h2>Indemnification</h2>
                <p>The Lessor agrees to defend, indemnify and hold Mooving and its affiliates, officers, directors and employees from and against any claim or demand, losses, liabilities, costs, suits, expenses and fees (including attorneys’ fees) made or incurred by any third party due to, arising out of, or in connection with the Lessor’s breach of the Agreement or violation of any law or the rights of a third party relating to this Agreement.</p>
                <br></br>
                <p>This Clause is intended to be supplementary to, and not to replace or supersede, any other rights and/or remedies available to the Parties under this Agreement or applicable law. The rights and obligations hereunder shall survive the expiration or termination of this Agreement.  </p>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <h2>dispute resolution</h2>
                <ul style={{listStyle: 'lower-roman' }}>
                  <li>All claims, disputes, difference or questions of any nature arising between the parties hereto, whether during or after the termination of this Agreement, in relation to the construction, meaning or interpretation, of any term used or Clause of this Agreement or as to the rights, duties, liabilities of the parties arising under this Agreement shall be referred to the sole arbitrator appointed by Mooving. The parties hereof mutually agree and confirm that the arbitration proceedings shall be conducted in accordance with the Arbitration and Conciliation Act 1996 as amended from time to time, and proceedings shall be held at Delhi, India. The language of the Arbitration shall be English.</li>
                  <li>Subject to Clause (i) above, the courts at Delhi, India shall have exclusive jurisdiction.</li>   
                </ul>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <h2>Miscellaneous</h2>
                <ul style={{listStyle: 'Upper-roman' }}>
                  <li><b><i>Relationship. </i></b> Nothing contained in this Agreement shall constitute or be deemed to constitute a partnership or agency between the Parties, and no Party shall hold himself out as an agent for the other Party or any of them, except with the express prior written consent of the other Party</li>
                  <li><b><i>Entire Agreement. </i></b>This Agreement constitutes the whole agreement between the Parties relating to the subject matter hereof and supersedes any other prior agreements or understanding relating to such subject matter.</li>   
                  <li><b><i>Amendment.  </i></b> No variation of this Agreement shall be binding on any Party unless such variation is in writing and signed by each Party.</li>
                  <li>
                    <b><i>Assignment</i></b><br></br>
                    <ul style={{listStyle: 'lower-alpha' }}>
                      <li>The Lessor will not without Mooving’s prior written consent, assign or purport to assign the benefit of this Agreement either in whole or in part to any third party. Any attempted or actual transfer or assignment by the Lessor of this Agreement, or any of the rights granted to it under this Agreement, or any attempted or actual transfer, assignment or delegation by Lessor of any of the responsibilities assigned to the Lessor under this Agreement, without Mooving’s prior written consent, will warrant termination of this Agreement. </li>
                      <li>Mooving shall have a right to transfer, assign the rights and obligation under this Agreement. In case this Agreement stands transferred / assigned by Mooving, the Lessor shall be obligated to perform all its obligations and fulfill all its liabilities towards Mooving, existing prior to the date of such transfer, as per the terms of this Agreement. The Lessor shall be obligated to perform all its obligations and fulfill all its liabilities, existing after such transfer, towards the assignee, as per the terms of this Agreement. </li>
                    </ul>
                  </li>
                  <li><b><i>Waiver</i></b>.  No failure or delay by a Party in exercising any right, power or remedy under this Agreement shall operate as a waiver thereof, nor shall any single or partial exercise of the same preclude any further exercise thereof or the exercise of any other right, power or remedy.</li>
                  <li><b><i>Force Majeure</i></b>. Notwithstanding anything contained in this Agreement, neither Party will be liable for damages for any delay or failure to perform its obligations hereunder, if such delay or failure is due to causes beyond its control, including, without limitation, strikes, riots, wars, fires, epidemics, diseases, lack of human or material resources, quarantine restrictions, unusually severe weather, earthquakes, explosions, acts of god or state or any public enemy, or acts mandated by any applicable laws, regulation or order (whether valid or invalid) of any governmental authority.</li>
                  <li><b><i>Compliance with Laws</i></b> : Both the Parties shall comply in all respects with the provisions of all applicable laws, rules and regulations from time to time in force in India as applicable or relevant to the business and transaction herein contemplated.</li>
                  <li><b><i>Severability</i></b>.  If any provision of this Agreement is invalid, unenforceable or prohibited by law, this Agreement shall be considered divisible as to such provision and such provision shall be inoperative and shall not be part of the consideration moving from either Party hereto to the other, and the remainder of this Agreement shall be valid, binding and of like effect as though such provision was not included herein.  The Parties will in good faith attempt to substitute for the invalid or unenforceable provision a valid and legally enforceable provision, which achieves to the greatest extent possible the economic, legal and commercial objectives of the provision, which is invalid or unenforceable</li>
                  <li><b><i>Survival</i></b>. Any and all obligations under this Agreement which, by their very nature should reasonably survive the termination or expiration of this Agreement, will so survive, including, but not limited to, those arising from the confidentiality and intellectual property provisions of this Agreement.  </li>
                  <li><b><i>Notices</i></b>. All notices, requests, demands, consents, waivers or other communications (“Notices”) required to be given by any Party to the other Party(ies) pursuant to this Agreement shall be written in English and shall be delivered by hand delivery or internationally recognized courier or prepaid registered post or transmitted by e-mail properly addressed as follows, and such notice, if given by e-mail, shall also be forthwith given by an internationally recognized courier or prepaid registered post or hand delivery:
                  <p><b>In the case of notices to Mooving:</b></p>
                    <table class="table-bordered" style={{width:'100%', margin:'10px 0'}}>
                      <tbody>
                        <tr>
                          <td>Address</td>
                          <td>221, Udyog Vihar Phase 1, Gurugram 122016</td>
                        </tr>
                        <tr>
                          <td>Attention</td>
                          <td>Attention</td>
                        </tr>
                        <tr>
                          <td>E mail</td>
                          <td>legal@sar-group.com</td>
                        </tr>
                      </tbody>
                    </table>
                    <p><b>In the case of notices to the Lessor:</b></p>
                    <p>At the address /details specified in Schedule attached to this Agreement.</p><br></br>
                    <p>or at such other address as the Party to whom such Notices are to be given shall have last notified the Party giving the same in the manner provided in this Clause, but no such change of address shall be deemed to have been given until it is actually received by the Party sought to be charged with the knowledge of its contents. Unless there is evidence that it was received earlier, any Notice delivered to the Party to whom it is addressed as provided in this Clause shall be deemed to have been given and received (i) if delivered by internationally recognised courier, within 3 (three) days of the dispatch of the said Notice by such courier, (ii) if sent by e-mail, at the time of confirmation of transmission recorded on the sender’s computer, and (iii) if delivered by hand at the time of delivery.</p>
                  </li>
                  <li><b><i>Counterparts</i></b>. This Agreement may be executed in any number of originals or counterparts, each in the like form and all of which when taken together shall constitute one and the same document, and any Party may execute this Agreement by signing any one or more of such originals or counterparts.</li>
                </ul>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <h2>IN WITNESS WHEREOF</h2>
                <p>the Parties hereto have caused this Agreement to be signed and executed by their duly authorized representatives as of the date and year first above written.</p>
                <table class="table-bordered" style={{width:'100%', margin:'10px 0'}}>
                  <tr>
                    <td style={{border: '1px solid #ddd'}}>
                      <p style={{marginBottom:"20px"}}>Mooving Smart Mobility & Energy Private Limited (Mooving)</p>
                      <ul style={{padding: "10px"}}>
                        <li>BY: ___________</li>
                        <li>Name: __________</li>
                        <li>Designation: __________</li>
                      </ul>
                    </td>
                    <td>
                      <p  style={{marginBottom:"20px"}}>____________________<br></br>
                        <span>(Lessor)</span>
                      </p>
                      <ul style={{padding: "10px"}}>
                        <li>BY: ___________</li>
                        <li>Name: __________</li>
                        <li>Designation: __________</li>
                      </ul>
                    </td>
                  </tr>
                </table>
              </div>
            </TabPanel>
          </Tabs>
          {/* <div class="acceptance"  style={{marginTop:'20px'}}>
              <input type="checkbox" class="checkbox"></input>
              <span class="check-label"> I have read and agree to the <u>Terms and Condition</u> and <u>Privacy Policy</u></span>               
          </div> */}
        </div>
      </div>       
    </div>
    </div>
  )
}
