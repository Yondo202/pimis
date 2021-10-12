import React, { useState } from 'react';
import DayPickerInput from "react-day-picker/DayPickerInput";
import axios from "axiosbase";
import { ReportTop } from "components/theme";
import Button from 'devextreme-react/button';
import { IoIosArrowRoundForward } from "react-icons/io";
import { BiFilterAlt } from "react-icons/bi";
import { MdNotInterested } from "react-icons/md";
import { DayFormat } from "../miscs/DayFormat";
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { font } from "../miscs/Font";
// import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid } from 'devextreme/excel_exporter';
import saveAs from 'file-saver';
import ExcelJS from 'exceljs';
import 'react-day-picker/lib/style.css';
import 'jspdf-autotable';
import MomentLocaleUtils from 'react-day-picker/moment';

export const HeadComp = ({ setMyDAta, dataGridRef, setDefaultRender, url }) => {
    const [ from, setFrom ] = useState({ class: "", value: null } );
    const [ to, setTo ] = useState({ class: "", value: null } );

    const exportGrid =()=> {
        const doc = new jsPDF('p', 'px', 'letter');
        doc.addFileToVFS('PTSans-Regular-normal.ttf', font);
        doc.addFont('PTSans-Regular-normal.ttf', 'PTSans-Regular', 'normal');
        doc.setFont("PTSans-Regular");

        const dataGrid = dataGridRef.current.instance;

        exportDataGridToPdf({
          jsPDFDocument: doc,
          component: dataGrid,
          autoTableOptions: { styles: { font: 'PTSans-Regular' }}
        }).then(() => {
          doc.save('Customers.pdf');
        });
    }

    const changeDate = pickDay => { let pickedDay = DayFormat(pickDay); setFrom({ class: "", value:pickedDay}); }
    const changeDateTo = pickDay => { let pickedDay = DayFormat(pickDay); setTo({ class: "", value:pickedDay}); }

    const FilterDateHandle = () =>{
        if(!from.value){ setFrom({class: "red"}); }else if(!to.value){   setTo({class: "red" });  }
        else{ setTo({class: "", value:to.value} ); setFrom({class: "", value:from.value} ); filter(); }
    }

    const filter = async () => {
        const req = await axios.get(`${url}&startDate=${from.value}&endDate=${to.value}`); 
        setMyDAta(req.data.data);
    }
    const RemoveHandle = () =>{
        setTo({ class: "", value:null});
        setFrom({ class: "", value:null});
        setDefaultRender(prev=>!prev);
    }

    return (
        <ReportTop className="Topsector">
            <div className="datePicker">
                <div className={`from ${from.class}`}>
                    <DayPickerInput placeholder={"Эхлэх"} onDayChange={changeDate} value={from.value}  dayPickerProps={{ locale: 'mn', localeUtils: MomentLocaleUtils, todayButton: 'Өнөөдөр'}} />
                </div>
                  <IoIosArrowRoundForward />
                <div className={`to ${to.class}`}>
                    <DayPickerInput placeholder={"Дуусах"} onDayChange={changeDateTo} value={to.value} dayPickerProps={{ locale: 'mn', localeUtils: MomentLocaleUtils, todayButton: 'Өнөөдөр'}} />
                </div>
                <div onClick={FilterDateHandle} className="FilterDateBtn"> <BiFilterAlt /> </div>
                {from.value&&to.value?<div onClick={RemoveHandle} className="FilterDateBtn reject"> <MdNotInterested /> </div>:""}
            </div>
            <div className="PdfExcelBtns">
                <Button id='exportButton' icon='exportpdf' text='PDF - татах' onClick={exportGrid}   />
                <Button text="EXCEL - хөрвүүлэх"  icon="xlsxfile"  onClick={()=>onExportingFunc(dataGridRef.current)}  />
            </div>
        </ReportTop>
    )

    function onExportingFunc(e) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Салбараар ангилах');
        exportDataGrid({
          component: e.instance,
          worksheet: worksheet,
          topLeftCell: { row: 4, column: 1 }
        }).then((cellRange) => {
          // header
          const headerRow = worksheet.getRow(2);
          headerRow.height = 26;
          worksheet.mergeCells(2, 1, 2, 8);
     
          headerRow.getCell(1).value = '2-р шатанд тэнцсэн болон хандсан байгууллагууд';
          headerRow.getCell(1).font = { name: 'Segoe UI Light', size: 22 };
          headerRow.getCell(1).alignment = { horizontal: 'center' };
    
          // footer
          const footerRowIndex = cellRange.to.row + 2;
          const footerRow = worksheet.getRow(footerRowIndex);
          worksheet.mergeCells(footerRowIndex, 1, footerRowIndex, 8);
    
          footerRow.getCell(1).value = 'www.EDP.mn';
          footerRow.getCell(1).font = { color: { argb: 'BFBFBF' }, italic: true };
          footerRow.getCell(1).alignment = { horizontal: 'right' };
        }).then(() => {
          workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Салбараар ангилах.xlsx');
          });
        });
        e.cancel = true;
    }
}
