import React, { useEffect, useState, useRef } from 'react';
import axios from "axiosbase";
import DataGrid, { Column, Selection, FilterRow, Paging, Summary, TotalItem } from 'devextreme-react/data-grid';
import { HeadComp } from "components/admin/contents/Report/components/miscs/HelperFunc"
import { Container } from "components/admin/contents/Report/components/miscs/Styles"
import 'devextreme/data/odata/store';

const dataGridRef = React.createRef();

const NersiinJagsaaltaar = () => {
    const [ myData, setMyDAta ] = useState(null);
    const [ defaultRender, setDefaultRender ] = useState(false);
    const [ width, setWidth ] = useState();

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

    const go = async ()=>{
        const req = await axios.get(`reports/handsan-baiguullaguud?calctype=byCompany`);
        setMyDAta(req.data.data);
    }

    return (
        <Container ref={ParentRef}>
            <HeadComp setMyDAta={setMyDAta} dataGridRef={dataGridRef} setDefaultRender={setDefaultRender} url="reports/handsan-baiguullaguud?calctype=byCompany"  />
            <DataGrid
                ref={dataGridRef}
                dataSource={myData}
                showBorders={true}
                // keyExpr="business_sectorId"
                columnAutoWidth={true}
                width={width?width+30:700}
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
                        displayFormat="Нийт {0}"
                    />
                </Summary>

            </DataGrid>
        </Container>
    )

}

const HeaderCell = (data) => (
    <div className="Bla2 tw-text-gray-700">
        {data.column.caption}
    </div>
)

const customizeTextConfirmed = (cellinfo) => {
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

export default NersiinJagsaaltaar;