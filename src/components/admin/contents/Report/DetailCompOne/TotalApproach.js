import React, { useEffect, useState } from 'react'
import myFontRoboto from "components/fonts/Roboto-Regular.ttf"
import styled from "styled-components"
import axios from "axiosbase"
import DataGrid, { Column, Selection, FilterRow, Paging, Summary, TotalItem , Export} from 'devextreme-react/data-grid';
import Button from 'devextreme-react/button';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid } from 'devextreme/excel_exporter';
import 'devextreme/data/odata/store';
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';
// import DayPicker from 'react-day-picker';
import DayPickerInput from "react-day-picker/DayPickerInput";
import 'react-day-picker/lib/style.css';

const dataGridRef = React.createRef();

const TotalApproach = () => {
    const [ myData, setMyDAta ] = useState(null);

    useEffect(()=>{
        go();
    },[])

    const exportGrid =()=> {
        const doc = new jsPDF('p', 'px', 'letter');
        // const myFontRoboto = "https://allfont.net/allfont.css?fonts=pt-sans"
        doc.setFont(myFontRoboto);
        const dataGrid = dataGridRef.current.instance;
        exportDataGridToPdf({
          jsPDFDocument: doc,
          component: dataGrid
        }).then(() => {
          doc.save('Customers.pdf');
        });
    }

    const go = async ()=>{
        const req = await axios.get(`reports/shalguur-hangasan?calctype=byCompany`);
        // localhost:3000/api/reports/shalguur-hangasan?calctype=byCompany&startDate=2021-01-01&endDate=2021-04-01
        setMyDAta(req.data.data);
    }

    return (
        <Container>

        <DayPickerInput placeholder={"2021/ 1 / 03"}  dayPickerProps={{todayButton: 'Today'}} />
        
            <Button
                id='exportButton'
                icon='exportpdf'
                text='Export to PDF'
                onClick={exportGrid}
                />
            <Button
                text="Export multiple grids"
                icon="xlsxfile"
                onClick={()=>onExportingFunc(dataGridRef.current)}
            />
                        
                <DataGrid
                    ref={dataGridRef}
                    dataSource={myData}
                    showBorders={true}
                    keyExpr="userId"
                    // onExporting={onExportingFunc}
                    AutoWidth={true}
                    width={1200}
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
                        />
                        <TotalItem
                            column="count"
                            summaryType="sum"
                            valueFormat="currency"
                         />
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
    .dx-visibility-change-handler{
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
                    /* text-align: left !important; */
                    border-right:none;
                }
            }
           
        }
    }
`