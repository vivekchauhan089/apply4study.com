let config = require('../config');
const fs = require('fs');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');
const s3Upload = require('./s3Upload');

let pdfDir = `${__dirname}/../../public/proposals/`
var path = require('path');

global.appRoot = path.resolve();

module.exports.addTextToSpecificPage = async function(leadData) {

  return new Promise(async(resolve) => {
    
    try {

      // Customer Information
      const customerName = leadData.firstname;
      var customerAddress = '';

      if (leadData.city && (leadData.city != '')) 
        customerAddress += `${leadData.city},`;

      if (leadData.state && (leadData.state != '')) 
        customerAddress += `${leadData.state}`;

      if (leadData.pincode && (leadData.pincode != '')) 
        customerAddress += `-${leadData.pincode},`;

      const customerPhone = leadData.phone;

      // ROI Calculator
      const systemPrice = Number(leadData.system_cost);  // System cost in INR
      const subsidy = Number(leadData.subsidy_amount);       // Subsidy availed (Set to 0 if not available)
      const monthlyElectricityCost = Number(leadData.per_unit_electricity); // Monthly savings due to solar installation

      const roiChart = calculatePaybackPeriod(systemPrice, subsidy, monthlyElectricityCost);

      // EMI Calculator
      const systemCost = Number(leadData.system_cost);  // ₹3,55,000
      const downPayment = Number(leadData.system_down_payment);  // ₹67,600
      const annualInterestRate = leadData.emi_rate ?? 10; // Assumed Interest Rate in %
      const monthlySaving = Number(leadData.monthly_saving); // ₹3,733 monthly saving

      const tenures = [12, 24, 36, 60];
      const emiChart = tenures.map(tenure => calculateSavings(systemCost, downPayment, tenure, annualInterestRate, monthlySaving));
      
      const emiChart1 = emiChart.find(emi => emi.tenureMonths == 12);
      const emiChart2 = emiChart.find(emi => emi.tenureMonths == 24);
      const emiChart3 = emiChart.find(emi => emi.tenureMonths == 36);
      const emiChart4 = emiChart.find(emi => emi.tenureMonths == 60);

      var bomValues = (leadData.bom_values) ? JSON.parse(leadData.bom_values) : [];
  
      // Load your existing PDF file
      const inputFilePath = `${appRoot}/routes/lib/proposal_template.pdf`;
      const existingPdfBytes = fs.readFileSync(inputFilePath);

      // Load a PDFDocument from the existing PDF bytes
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Choose the target page (e.g., page 3 is at index 2)
      const pageIndex = 12;
      const pageIndex2 = 11;
      const page = pdfDoc.getPage(pageIndex);
      const page2 = pdfDoc.getPage(pageIndex2);

      // (Optional) Embed a standard font for your text
      // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      pdfDoc.registerFontkit(fontkit);
      const inputFont1File = `${appRoot}/routes/lib/BreuerText.ttf`;
      const fontBytes = fs.readFileSync(inputFont1File);
      const helveticaFont = await pdfDoc.embedFont(fontBytes);

      const boldFontFile = `${appRoot}/routes/lib/BreuerTextBold.ttf`;
      const boldFontBytes = fs.readFileSync(boldFontFile);
      const helveticaBoldFont = await pdfDoc.embedFont(boldFontBytes);

      // Coordinates are measured from the bottom-left corner.
      const padding = 2

      // Calculate text dimensions to determine the size of the background rectangle
      textSize = 12;
      const textWidth = helveticaFont.widthOfTextAtSize(customerName, textSize);
      const textHeight = helveticaFont.heightAtSize(textSize);


      /*****************************************************
       ***************** Set Page - 12 Data ****************
       *****************************************************/

      const textOptions = {
        x: 90,         // x-coordinate
        y: 320,         // y-coordinate
        size: 10.6,       // font size
        font: helveticaFont,
        color: rgb(0, 0, 0), // black color
      };

      const textOptionsAddress = {
        x: 240,         // x-coordinate
        y: 320,         // y-coordinate
        size: 10.6,       // font size
        font: helveticaFont,
        color: rgb(0, 0, 0), // black color
      };

      const textOptionsPhone = {
        x: 455,         // x-coordinate
        y: 320,         // y-coordinate
        size: 10.6,       // font size
        font: helveticaFont,
        color: rgb(0, 0, 0), // black color
      };

      // Draw the text on the chosen page
      page.drawText(customerName, textOptions);
      page.drawText(customerAddress, textOptionsAddress);
      page.drawText(customerPhone, textOptionsPhone);

      const SystemCap1 = {
        x: 290,         // x-coordinate
        y: 245,         // y-coordinate
        size: 10.6,       // font size
        font: helveticaFont,
        color: rgb(0, 0, 0), // black color
      };
      const SystemCap2 = {
        x: 290,         // x-coordinate
        y: 210,         // y-coordinate
        size: 10.6,       // font size
        font: helveticaFont,
        color: rgb(0, 0, 0), // black color
      };

      page.drawText(leadData.lead_sys_capacity.toString(), SystemCap1);
      page.drawText(leadData.lead_sys_capacity.toString(), SystemCap2);

      const SystemPrice1 = {
        x: 380,         // x-coordinate
        y: 245,         // y-coordinate
        size: 10.6,       // font size
        font: helveticaFont,
        color: rgb(0, 0, 0), // black color
      };
      const SystemPrice2 = {
        x: 380,         // x-coordinate
        y: 210,         // y-coordinate
        size: 10.6,       // font size
        font: helveticaFont,
        color: rgb(0, 0, 0), // black color
      };

      page.drawText(roiChart.systemPrice.toString(), SystemPrice1);
      page.drawText(roiChart.systemPrice.toString(), SystemPrice2);

      const SystemTax1 = {
        x: 471,         // x-coordinate
        y: 236,         // y-coordinate
        size: 10.6,       // font size
        font: helveticaFont,
        color: rgb(0, 0, 0), // black color
      };
      const SystemTax2 = {
        x: 480,         // x-coordinate
        y: 210,         // y-coordinate
        size: 10.6,       // font size
        font: helveticaFont,
        color: rgb(0, 0, 0), // black color
      };

      //page.drawText("Included", SystemTax1);
      page.drawText("NA", SystemTax2);


      
      /*****************************************************
       ***************** Set Page - 11 Data ****************
       *****************************************************/
      const SystmeCapacityPos1 = {
        x: 98,         // x-coordinate
        y: 616,         // y-coordinate
        size: 16,       // font size
        font: helveticaBoldFont,
        color: rgb(0, 0, 0), // black color
      };
      const SystmeCapacityPos2 = {
        x: 96,         // x-coordinate
        y: 616,         // y-coordinate
        size: 16,       // font size
        font: helveticaBoldFont,
        color: rgb(0, 0, 0), // black color
      };
      const SystmeCapacityPos3 = {
        x: 92,         // x-coordinate
        y: 617,         // y-coordinate
        size: 15,       // font size
        font: helveticaBoldFont,
        color: rgb(0, 0, 0), // black color
      };
      const SystmeTypePos = {
        x: 486,         // x-coordinate
        y: 653,         // y-coordinate
        size: 10,       // font size
        font: helveticaBoldFont,
        color: rgb(1, 1, 1), // black color
      };
      if(leadData.lead_sys_capacity.toString().length == 1) {
        page2.drawText(leadData.lead_sys_capacity.toString() + 'kW', SystmeCapacityPos1);
      } else if(leadData.lead_sys_capacity.toString().length == 2) {
        page2.drawText(leadData.lead_sys_capacity.toString() + 'kW', SystmeCapacityPos2);
      } else {
        page2.drawText(leadData.lead_sys_capacity.toString() + 'kW', SystmeCapacityPos3);
      }
      page2.drawText(leadData.lead_system_type.toString().replace('_', ' '), SystmeTypePos);

      const TotalModule1Pos = {
        x: 465,         // x-coordinate
        y: 638,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0, 0, 0), // black color
      };
      const TotalModule2Pos = {
        x: 525,         // x-coordinate
        y: 638,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0, 0, 0), // black color
      };
      const ModuleCapPos = {
        x: 465,         // x-coordinate
        y: 620,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0, 0, 0), // black color
      };
      const ModuleBatCapPos = {
        x: 465,         // x-coordinate
        y: 605,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0, 0, 0), // black color
      };
      page2.drawText(leadData.lead_total_panels.toString(), TotalModule1Pos);
      // page2.drawText("Wp", TotalModule2Pos);
      page2.drawText(leadData.lead_sys_capacity.toString(), ModuleCapPos);
      page2.drawText(leadData.dc_capacity.toString(), ModuleBatCapPos);


      const Spec1LabelPos = {
        x: 150,         // x-coordinate
        y: 560,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec1Label1Pos = {
        x: 90,         // x-coordinate
        y: 576,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec1Label2Pos = {
        x: 90,         // x-coordinate
        y: 564,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec1Labe3Pos = {
        x: 90,         // x-coordinate
        y: 552,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec1Label11Pos = {
        x: 90,         // x-coordinate
        y: 570,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec1Label21Pos = {
        x: 90,         // x-coordinate
        y: 558,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec1Label111Pos = {
        x: 90,         // x-coordinate
        y: 565,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec1QtyPos = {
        x: 470,         // x-coordinate
        y: 560,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec1LabelTxt = (bomValues && bomValues.length > 0) ? bomValues[0].item_name.toString() : '';
      const Spec1QtyVal = (bomValues && bomValues.length > 0) ? bomValues[0].qty.toString() : '';

      if (Spec1LabelTxt.length > 120)
      {
        page2.drawText(Spec1LabelTxt.substr(0,56), Spec1Label1Pos);
        page2.drawText(Spec1LabelTxt.substr(57,58), Spec1Label2Pos);
        page2.drawText(Spec1LabelTxt.substr(116,56), Spec1Labe3Pos);
      } else if (Spec1LabelTxt.length > 55 && Spec1LabelTxt.length < 100) {
        page2.drawText(Spec1LabelTxt.substr(0,56), Spec1Label11Pos);
        page2.drawText(Spec1LabelTxt.substr(57,58), Spec1Label21Pos);
      } else if (Spec1LabelTxt.length > 30 && Spec1LabelTxt.length < 55) {
        page2.drawText(Spec1LabelTxt.substr(0,56), Spec1Label111Pos);
      } else {
        page2.drawText(Spec1LabelTxt, Spec1LabelPos);
      }
      page2.drawText(Spec1QtyVal, Spec1QtyPos);

      const Spec2LabelPos = {
        x: 150,         // x-coordinate
        y: 530,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec2Label1Pos = {
        x: 90,         // x-coordinate
        y: 530,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec2QtyPos = {
        x: 470,         // x-coordinate
        y: 530,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec2LabelTxt = (bomValues && bomValues.length > 1) ? bomValues[1].item_name.toString() : '';
      const Spec2QtyVal = (bomValues && bomValues.length > 1) ? bomValues[1].qty.toString() : '';
      if ( Spec2LabelTxt.length > 30 )
      {
        page2.drawText(Spec2LabelTxt, Spec2Label1Pos);
      } else {
        page2.drawText(Spec2LabelTxt, Spec2LabelPos);
      }
      page2.drawText(Spec2QtyVal, Spec2QtyPos);

      const Spec3LabelPos = {
        x: 150,         // x-coordinate
        y: 480,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec3Label1Pos = {
        x: 90,         // x-coordinate
        y: 494,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec3Label2Pos = {
        x: 90,         // x-coordinate
        y: 482,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec3Label3Pos = {
        x: 90,         // x-coordinate
        y: 470,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec3Label11Pos = {
        x: 90,         // x-coordinate
        y: 488,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec3Label21Pos = {
        x: 90,         // x-coordinate
        y: 476,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec3Label111Pos = {
        x: 90,         // x-coordinate
        y: 482,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec3QtyPos = {
        x: 470,         // x-coordinate
        y: 480,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec3LabelTxt = (bomValues && bomValues.length > 2) ? bomValues[2].item_name.toString() : '';
      const Spec3QtyVal = (bomValues && bomValues.length > 2) ? bomValues[2].qty.toString() : '';
      if (Spec3LabelTxt.length > 120)
      {
        page2.drawText(Spec3LabelTxt.substr(0,56), Spec3Label1Pos);
        page2.drawText(Spec3LabelTxt.substr(57,59), Spec3Label2Pos);
        page2.drawText(Spec3LabelTxt.substr(116,56), Spec3Label3Pos);
      } else if (Spec3LabelTxt.length > 55 && Spec3LabelTxt.length < 100 ) {
        page2.drawText(Spec3LabelTxt.substr(0,56), Spec3Label11Pos);
        page2.drawText(Spec3LabelTxt.substr(57,59), Spec3Label21Pos);
      } else if (Spec3LabelTxt.length > 30 && Spec3LabelTxt.length < 50 ) {
        page2.drawText(Spec3LabelTxt.substr(0,56), Spec3Label111Pos);
      } else {
        page2.drawText(Spec3LabelTxt, Spec3LabelPos);
      }
      page2.drawText(Spec3QtyVal, Spec3QtyPos);

      const Spec7CatPos = {
        x: 385,         // x-coordinate
        y: 410,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const Spec8CatPos = {
        x: 385,         // x-coordinate
        y: 390,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      page2.drawText("Others", Spec7CatPos);
      page2.drawText("Others", Spec8CatPos);

      

      const ROILabel1Pos = {
        x: 80,         // x-coordinate
        y: 270,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const ROILabel2Pos = {
        x: 134,         // x-coordinate
        y: 270,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const ROILabel3Pos = {
        x: 240,         // x-coordinate
        y: 270,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const ROILabel4Pos = {
        x: 340,         // x-coordinate
        y: 270,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const ROILabel5Pos = {
        x: 425,         // x-coordinate
        y: 270,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const ROILabel6Pos = {
        x: 510,         // x-coordinate
        y: 270,         // y-coordinate
        size: 10,       // font size
        font: helveticaFont,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      page2.drawText(leadData.lead_sys_capacity.toString(), ROILabel1Pos);
      page2.drawText(leadData.lead_meter_type.toString().replace('_', ' '),ROILabel2Pos);
      page2.drawText(roiChart.systemPrice.toString(), ROILabel3Pos);
      page2.drawText(roiChart.subsidy.toString(), ROILabel4Pos);
      page2.drawText(roiChart.monthlyElectricityCost.toString(), ROILabel5Pos);
      page2.drawText(roiChart.paybackPeriod.toString(), ROILabel6Pos);



      const inputFont2File = `${appRoot}/routes/lib/BreuerTextLight.ttf`;
      const fontBytes1 = fs.readFileSync(inputFont2File);
      const helveticaFont1 = await pdfDoc.embedFont(fontBytes1);

      const EMISystmeCapacityPos = {
        x: 348,         // x-coordinate
        y: 186,         // y-coordinate
        size: 10,       // font size
        font: helveticaBoldFont,
        color: rgb(1, 1, 1), // black color
      };
      page2.drawText(leadData.lead_sys_capacity.toString(), EMISystmeCapacityPos);

      const TotalProjectPos = {
        x: 340,         // x-coordinate
        y: 170,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      page2.drawText(systemCost.toString(), TotalProjectPos);

      const DownPayment1Pos = {
        x: 185,         // x-coordinate
        y: 140,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const DownPayment2Pos = {
        x: 285,         // x-coordinate
        y: 140,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const DownPayment3Pos = {
        x: 385,         // x-coordinate
        y: 140,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const DownPayment4Pos = {
        x: 485,         // x-coordinate
        y: 140,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      page2.drawText(emiChart1.totalDownPayment.toString(), DownPayment1Pos);
      page2.drawText(emiChart2.totalDownPayment.toString(), DownPayment2Pos);
      page2.drawText(emiChart3.totalDownPayment.toString(), DownPayment3Pos);
      page2.drawText(emiChart4.totalDownPayment.toString(), DownPayment4Pos);

      const LoanPayment1Pos = {
        x: 185,         // x-coordinate
        y: 125,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const LoanPayment2Pos = {
        x: 285,         // x-coordinate
        y: 125,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const LoanPayment3Pos = {
        x: 385,         // x-coordinate
        y: 125,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const LoanPayment4Pos = {
        x: 485,         // x-coordinate
        y: 125,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      page2.drawText(emiChart1.loanAmount.toString(), LoanPayment1Pos);
      page2.drawText(emiChart2.loanAmount.toString(), LoanPayment2Pos);
      page2.drawText(emiChart3.loanAmount.toString(), LoanPayment3Pos);
      page2.drawText(emiChart4.loanAmount.toString(), LoanPayment4Pos);

      const EMIPayment1Pos = {
        x: 185,         // x-coordinate
        y: 110,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const EMIPayment2Pos = {
        x: 285,         // x-coordinate
        y: 110,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const EMIPayment3Pos = {
        x: 385,         // x-coordinate
        y: 110,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const EMIPayment4Pos = {
        x: 485,         // x-coordinate
        y: 110,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      page2.drawText(emiChart1.emi.toString(), EMIPayment1Pos);
      page2.drawText(emiChart2.emi.toString(), EMIPayment2Pos);
      page2.drawText(emiChart3.emi.toString(), EMIPayment3Pos);
      page2.drawText(emiChart4.emi.toString(), EMIPayment4Pos);

      const FeePayment1Pos = {
        x: 185,         // x-coordinate
        y: 95,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const FeePayment2Pos = {
        x: 285,         // x-coordinate
        y: 95,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const FeePayment3Pos = {
        x: 385,         // x-coordinate
        y: 95,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const FeePayment4Pos = {
        x: 485,         // x-coordinate
        y: 95,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      page2.drawText(emiChart1.processingFee.toString(), FeePayment1Pos);
      page2.drawText(emiChart2.processingFee.toString(), FeePayment2Pos);
      page2.drawText(emiChart3.processingFee.toString(), FeePayment3Pos);
      page2.drawText(emiChart4.processingFee.toString(), FeePayment4Pos);

      const TotalPayment1Pos = {
        x: 185,         // x-coordinate
        y: 80,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const TotalPayment2Pos = {
        x: 285,         // x-coordinate
        y: 80,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const TotalPayment3Pos = {
        x: 385,         // x-coordinate
        y: 80,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const TotalPayment4Pos = {
        x: 485,         // x-coordinate
        y: 80,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      page2.drawText(emiChart1.totalDownPayment.toString(), TotalPayment1Pos);
      page2.drawText(emiChart2.totalDownPayment.toString(), TotalPayment2Pos);
      page2.drawText(emiChart3.totalDownPayment.toString(), TotalPayment3Pos);
      page2.drawText(emiChart4.totalDownPayment.toString(), TotalPayment4Pos);

      const TotalSaving1Pos = {
        x: 185,         // x-coordinate
        y: 65,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const TotalSaving2Pos = {
        x: 285,         // x-coordinate
        y: 65,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const TotalSaving3Pos = {
        x: 385,         // x-coordinate
        y: 65,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const TotalSaving4Pos = {
        x: 485,         // x-coordinate
        y: 65,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      page2.drawText(emiChart1.monthlySaving.toString(), TotalSaving1Pos);
      page2.drawText(emiChart2.monthlySaving.toString(), TotalSaving2Pos);
      page2.drawText(emiChart3.monthlySaving.toString(), TotalSaving3Pos);
      page2.drawText(emiChart4.monthlySaving.toString(), TotalSaving4Pos);

      const LifeSaving1Pos = {
        x: 185,         // x-coordinate
        y: 50,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const LifeSaving2Pos = {
        x: 285,         // x-coordinate
        y: 50,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const LifeSaving3Pos = {
        x: 385,         // x-coordinate
        y: 50,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      const LifeSaving4Pos = {
        x: 485,         // x-coordinate
        y: 50,         // y-coordinate
        size: 9,       // font size
        font: helveticaFont1,
        color: rgb(0.129, 0.121, 0.125), // black color
      };
      page2.drawText(emiChart1.lifetimeSaving.toString(), LifeSaving1Pos);
      page2.drawText(emiChart2.lifetimeSaving.toString(), LifeSaving2Pos);
      page2.drawText(emiChart3.lifetimeSaving.toString(), LifeSaving3Pos);
      page2.drawText(emiChart4.lifetimeSaving.toString(), LifeSaving4Pos);


      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save();
      const fileName = `livsol_proposal_${leadData.lead_id}.pdf`;
      const filePath = `${pdfDir}/${fileName}`;

      // Write the PDF to a new file
      // fs.writeFileSync(filePath, pdfBytes);
      // console.log('PDF updated successfully!');

      var s3UploadFileKey = await s3Upload.s3FileUpload(pdfBytes, `proposals/${fileName}`);
      // console.log("After S3 File Upload Result Data", s3UploadRes);

      // let fileUrl = s3UploadFileUrl; // `${config.baseUrl}/proposals/${fileName}`;
      // fileUrl = fileUrl.replace('localhost','localhost:4547');
      resolve(s3UploadFileKey)

    } catch (e) {
      console.log("Error in Proposal Creation : ", e.message)
      resolve(false)
    }

  })

}

//EMI Calculator
function calculateEMI(loanAmount, tenureMonths, annualInterestRate) {
    const monthlyInterestRate = (annualInterestRate / 100) / 12;
    const n = tenureMonths;

    const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, n)) /
                (Math.pow(1 + monthlyInterestRate, n) - 1);

    return emi.toFixed(2);
}
//Saving Calculator
function calculateSavings(systemCost, downPayment, tenureMonths, annualInterestRate, monthlySaving) {
    const loanAmount = systemCost - downPayment;
    const processingPercent = "1%";
    const processingFee = loanAmount * 0.01; // 1% of Loan Amount
    const totalDownPayment = downPayment + processingFee;
    const emi = calculateEMI(loanAmount, tenureMonths, annualInterestRate);
    const baseYears = 25; // Initial full saving period
    const adjustmentFactor = 0.96; // 96% adjustment for interest, efficiency loss, etc.
    
    // Calculate effective years (25 years minus tenure in years)
    const effectiveYears = baseYears - (tenureMonths / 12);

    // Calculate lifetime saving
    const lifetimeSaving = Math.round(monthlySaving * 12 * effectiveYears * adjustmentFactor);

    return {
        tenureMonths,
        loanAmount,
        processingFee: processingFee.toFixed(2),
        totalDownPayment: totalDownPayment.toFixed(2),
        emi,
        processingPercent,
        monthlySaving,
        lifetimeSaving
    }
   
}
//ROI Calculation
function calculatePaybackPeriod(systemPrice, subsidy, monthlyElectricityCost) {
    // Calculate net system price after subsidy
    const netSystemPrice = systemPrice - subsidy;

    // Calculate annual savings
    const annualSavings = monthlyElectricityCost * 12;

    // Compute payback period in years
    const paybackPeriod = netSystemPrice / annualSavings;

    return {
        systemPrice,
        subsidy,
        netSystemPrice,
        monthlyElectricityCost,
        annualSavings,
        paybackPeriod: parseFloat(paybackPeriod.toFixed(2)) // Rounded to 2 decimal places
    };
}