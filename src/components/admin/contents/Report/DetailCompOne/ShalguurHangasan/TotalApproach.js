import React, { useEffect, useState, useRef } from 'react'
import styled, { keyframes } from "styled-components"
import { ReportTop } from "components/theme"
import axios from "axiosbase"
import { IoIosArrowRoundForward } from "react-icons/io"
import { BiFilterAlt } from "react-icons/bi"
import { MdNotInterested } from "react-icons/md"
import DataGrid, { Column, Selection, FilterRow, Paging, Summary, TotalItem , Export} from 'devextreme-react/data-grid';
import Button from 'devextreme-react/button';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid } from 'devextreme/excel_exporter';
import 'devextreme/data/odata/store';
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import DayPickerInput from "react-day-picker/DayPickerInput";
import 'react-day-picker/lib/style.css';
import { DayFormat } from "../../DayFormat";
import { font } from "../../Font";

const dataGridRef = React.createRef();

const TotalApproach = () => {
    const [ defaultRender, setDefaultRender ] = useState(false);
    const [ myData, setMyDAta ] = useState(null);
    const [ from, setFrom ] = useState({ class: "", value: null } );
    const [ to, setTo ] = useState({ class: "", value: null } );
    const [width, setWidth] = useState();

    useEffect(()=>{
         go();
    },[defaultRender])

    const ParentRef = useRef(null);
    useEffect(() => {
        const handleResize = () => {
            setWidth(ParentRef.current?.clientWidth);
        }
        if (width === undefined) handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [ParentRef]);

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

    const go = async ()=>{
        const req = await axios.get(`reports/shalguur-hangasan?calctype=byCompany`);
        // localhost:3000/api/reports/shalguur-hangasan?calctype=byCompany&startDate=2021-01-01&endDate=2021-04-01
        setMyDAta(req.data.data); setFrom({ value:null }); setTo({value:null});
    }

    const changeDate = pickDay => { let pickedDay = DayFormat(pickDay); setFrom( {class: "", value:pickedDay} ) }
    const changeDateTo = pickDay => { let pickedDay = DayFormat(pickDay); setTo({class: "", value:pickedDay} ); }
    const FilterDateHandle = () =>{
            if(!from.value){ setFrom({class: "red"}); }else if(!to.value){   setTo({class: "red" });  }
            else{ setTo({class: "", value:to.value} ); setFrom({class: "", value:from.value} ); filter();  }
    }
    const filter = async () =>{
       const req = await axios.get(`reports/shalguur-hangasan?calctype=byCompany&startDate=${from.value}&endDate=${to.value}`);  setMyDAta(req.data.data);
    }
 
    return (
        <Container ref={ParentRef}>

                <ReportTop className="Topsector">
                    <div className="datePicker">
                        <div className={`from ${from.class}`}>
                            <DayPickerInput  placeholder={"Эхлэх"} onDayChange={changeDate} value={from.value} dayPickerProps={{todayButton: 'Өнөөдөр'}} />
                        </div>
                        <IoIosArrowRoundForward />
                        <div className={`to ${to.class}`}>
                           <DayPickerInput placeholder={"Дуусах"} onDayChange={changeDateTo} value={to.value} dayPickerProps={{todayButton: 'Өнөөдөр'}} />
                        </div>
                        <div onClick={FilterDateHandle} className="FilterDateBtn"> <BiFilterAlt /> </div>
                         {from.value&&to.value?<div onClick={()=>setDefaultRender(prev=>!prev)} className="FilterDateBtn reject"> <MdNotInterested /> </div>:""}
                    </div>
                    <div className="PdfExcelBtns">
                        <Button id='exportButton' icon='exportpdf' text='PDF - татах' onClick={exportGrid}   />
                        <Button text="EXCEL - хөрвүүлэх"  icon="xlsxfile"  onClick={()=>onExportingFunc(dataGridRef.current)}  />
                    </div>
                </ReportTop>
                
                        
                <DataGrid
                    ref={dataGridRef}
                    dataSource={myData}
                    showBorders={true}
                    keyExpr="userId"
                    // onExporting={onExportingFunc}
                    AutoWidth={true}
                    width={"100%"}
                    columnAutoWidth={true}
                    width={width?width:700}

                >
                    <Selection
                        mode="multiple"
                        // selectAllMode={allMode}
                        showCheckBoxesMode={`none`}
                    />
                    <FilterRow visible={true} />
                    <Paging defaultPageSize={10} />
                    {/* <Export enabled={true} /> */}
                    {/* <Column dataField="orderId" caption="Order ID" width={90} /> */}
                    <Column width={90} alignment='center' dataField="userId" caption="ID" />
                    <Column width={90} alignment='center' dataField="esm" caption="Ангилал" />
                    <Column width={300} dataField="companyname" caption="Компаны нэр"/>
                    <Column width={300} dataField="bdescription_mon" caption="Салбарын нэрс" />
                    <Column width={300} dataField="companyregister" caption="Регистр" />
                    {/* <Column width={300} alignment='center' dataField="count" caption="Нийт тоо" /> */}
                    {/* <Column dataField="date" dataType="date" /> */}
                    {/* <Column dataField="amount" format="currency" width={90} /> */}

                    <Summary>
                        <TotalItem
                            column="userId"
                            summaryType="count"
                            // customizeText={"Нийт"}
                        />
                        {/* <TotalItem
                            column="count"
                            summaryType="sum"
                            valueFormat="currency"
                         /> */}
                    </Summary>
                </DataGrid>
        </Container>
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

export default TotalApproach;

const Container = styled.div`
    max-width:1222px;
    width:100%;
    .dx-visibility-change-handler, .dx-widget{
        /* box-shadow:1px 1px 10px -6px; */
        
        &:last-child{
            box-shadow:1px 1px 10px -6px;
        }
        .dx-datagrid{
            .dx-texteditor-input-container{
                input{
                    /* display:none; */
                }
            }
            td{
                /* text-align: left !important; */
                border-right:1px solid #ababab;
                &:last-child{
                    border-right:none;
                }
            }
            .dx-datagrid-total-footer{
                td{
                    /* text-align: left !important; */
                    border-right:none;
                }
            }
           
        }
    }
`