import React, { useEffect, useState, useRef } from 'react'
import { Container } from "components/admin/contents/Report/components/miscs/Styles"
import { HeadComp } from "components/admin/contents/Report/components/miscs/HelperFunc"
import DataGrid, { Column, Selection, FilterRow, Paging, Summary, TotalItem } from 'devextreme-react/data-grid';
import axios from "axiosbase";

const dataGridRef = React.createRef();

const TotalApproach = () => {
    const [ defaultRender, setDefaultRender ] = useState(false);
    const [ myData, setMyDAta ] = useState(null);
    const [ width, setWidth ] = useState();

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

    const go = async ()=>{
        const req = await axios.get(`reports/shalguur-hangasan?calctype=byCompany`);
        setMyDAta(req.data.data); 
    }
 
    return (
        <Container ref={ParentRef}>
            <HeadComp setMyDAta={setMyDAta} dataGridRef={dataGridRef} setDefaultRender={setDefaultRender} url="reports/shalguur-hangasan?calctype=byCompany"  />
                    
            <DataGrid
                ref={dataGridRef}
                dataSource={myData}
                showBorders={true}
                keyExpr="companyname"
                // onExporting={onExportingFunc}
                AutoWidth={true}
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
                <Column width={90} alignment='center' dataField="esm" caption="Ангилал" />
                <Column width={300} dataField="companyname" caption="Компаны нэр"/>
                <Column width={300} dataField="bdescription_mon" caption="Салбарын нэрс" />
                <Column width={300} dataField="companyregister" caption="Регистр" />

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

export default TotalApproach;