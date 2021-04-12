import React, { useEffect, useState, useRef } from 'react';
import { ReportTop } from "components/theme";
import styled from "styled-components";
import { IoIosArrowRoundForward } from "react-icons/io";
import { BiFilterAlt } from "react-icons/bi";
import { MdNotInterested } from "react-icons/md";
import axios from "axiosbase";
import DataGrid, { Column, Selection, FilterRow, Paging, Summary, TotalItem } from 'devextreme-react/data-grid';
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
import { font } from "../../Font"

const dataGridRef = React.createRef();

const NersiinJagsaaltaar = () => {
    const [ myData, setMyDAta ] = useState(null);
    const [ defaultRender, setDefaultRender ] = useState(false);
    const [ from, setFrom ] = useState({ class: "", value: null } );
    const [ to, setTo ] = useState({ class: "", value: null } );
    const [width, setWidth] = useState();

    useEffect(()=>{
        go();
    },[defaultRender]);

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
        const req = await axios.get(`reports/handsan-baiguullaguud?calctype=byCompany`);
        setMyDAta(req.data.data); setFrom({ value:null }); setTo({value:null});
    }

    const changeDate = pickDay => { let pickedDay = DayFormat(pickDay); setFrom( {class: "", value:pickedDay} ) }
    const changeDateTo = pickDay => { let pickedDay = DayFormat(pickDay); setTo({class: "", value:pickedDay} ); }
    const FilterDateHandle = () =>{
            if(!from.value){ setFrom({class: "red"}); }else if(!to.value){   setTo({class: "red" });  }
            else{ setTo({class: "", value:to.value} ); setFrom({class: "", value:from.value} ); filter();  }
    }
    const filter = async () =>{
       const req = await axios.get(`reports/handsan-baiguullaguud?calctype=byCompany&startDate=${from.value}&endDate=${to.value}`);  setMyDAta(req.data.data);
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
                    // keyExpr="business_sectorId"
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
                    {/* <Column alignment='center' dataField="business_sectorId" caption="ID" /> */}
                    <Column alignment='left' headerCellRender={HeaderCell} dataField="companyname" caption="Байгууллагын нэр" />
                    <Column alignment='left'  headerCellRender={HeaderCell} dataField="shalguur" caption="Шалгуур" />
                    <Column alignment='center' headerCellRender={HeaderCell} dataField="tulgah_huudas" caption="Тулгах хуудас" customizeText={customizeTextConfirmed} />
                    <Column width={300}  headerCellRender={HeaderCell} dataField="bdescription_mon" caption="Салбар" />
                    <Column alignment='center'  headerCellRender={HeaderCell} dataField="esm" caption="Ангилал" />
             

                    <Summary>
                        <TotalItem
                            column="companyname"
                            summaryType="count" 
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

const HeaderCell = (data) => (
    <div className="Bla2 tw-text-gray-700">
        {data.column.caption}
    </div>
)
const customizeTextConfirmed = (cellinfo) => {

    console.log(`cellinfo`, cellinfo);
    switch (cellinfo.value) {
        case 0:
            return 'Бөглөөгүй'
        case 1:
            return 'Тэнцээгүй'
        case 2:
            return 'Тэнцсэн'
        default:
            break
    }
}

const HeaderStyle = styled.div`
    font-weight:500;
`


export default NersiinJagsaaltaar;


const Container = styled.div`
    max-width:1222px;
    width:100%;
    .Bla2{
        font-weight:600 !important;
    }
    .ChartParent{
        margin-top:15px;
        width:100%;
        background-color:white;
        text-align:center;
        padding:30px 10px;
    }
    .dx-visibility-change-handler{
        &:last-child{
            box-shadow:1px 1px 10px -6px;
        }
        .dx-datagrid{
            
                td{
                    /* text-align: left !important; */
                    border-right:1px solid #ababab;
                    &:last-child{
                        border-right:none;
                    }
                }
            .dx-datagrid-total-footer{
                td{
                    border-right:none;
                }
            }
        }
    }
`

  function onPointClick(e) {
    e.target.select();
  }

const test = [
    { bdescription_mon: "Зам, Барилга", count: 24 ,business_sectorId:47 , success: 14, reject:10 },
    { bdescription_mon: "Уул уурхай", count: 43 ,business_sectorId:1, success: 10, reject:33 },
    { bdescription_mon: "Хөдөө аж ахуй", count: 31 ,business_sectorId:2, success: 21, reject:10 },
    { bdescription_mon: "Технилоги", count: 25 ,business_sectorId:5, success: 15, reject:10 },
    { bdescription_mon: "Барилга", count: 27 ,business_sectorId:6, success: 10, reject:17 },
 ]


