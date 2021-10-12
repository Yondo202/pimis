import React, { useEffect, useState, useRef } from 'react';
import { Chart, Series, CommonSeriesSettings, Label, Format, Legend } from 'devextreme-react/chart';
import axios from "axiosbase";
import DataGrid, { Column, Selection, FilterRow, Paging, Summary, TotalItem , Export} from 'devextreme-react/data-grid';
import { HeadComp } from "components/admin/contents/Report/components/miscs/HelperFunc"
import { Container } from "components/admin/contents/Report/components/miscs/Styles"

const dataGridRef = React.createRef();

const SectorsOne = () => {
    const [ myData, setMyDAta ] = useState(null);
    const [ defaultRender, setDefaultRender ] = useState(false);
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

    const go = async ()=>{
        const req = await axios.get(`reports/handsan-baiguullaguud?calctype=bySector`);
        setMyDAta(req.data.data);
    }


    return (
        <Container ref={ParentRef}>
                <HeadComp setMyDAta={setMyDAta} dataGridRef={dataGridRef} setDefaultRender={setDefaultRender} url="reports/handsan-baiguullaguud?calctype=bySector"  />

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
                    <Column headerCellRender={HeaderCell} alignment='center' dataField="count" caption="Нийт тоо" />
                    <Column headerCellRender={HeaderCell} width={300} dataField="bdescription_mon" caption="Салбарын нэрс" />
                    <Column headerCellRender={HeaderCell} alignment='center' dataField="shalguur_hangasan" caption="Шалгуур хангасан" />
                    <Column headerCellRender={HeaderCell} alignment='center' dataField="shalguur_hangaagui" caption="Шалгуур хангаагүй" />
                    <Column headerCellRender={HeaderCell} alignment='center' dataField="bo_asuumjbogloogui" caption="БО - ны асуумж бөглөөгүй" />

                    <Summary>
                        <TotalItem
                            column="count"
                            summaryType="count" 
                            displayFormat="Нийт {0}"
                        />
                    </Summary>
                </DataGrid>


                <div className="ChartParent">
                    <Chart id="chart"
                        title="Нийт салбарын стастик"
                        dataSource={myData}
                        onPointClick={onPointClick}
                        onLegendClick={onLegendClick}
                    >
                        <CommonSeriesSettings
                            argumentField="bdescription_mon"
                            type="bar"
                            hoverMode="allArgumentPoints"
                            selectionMode="allArgumentPoints"
                        >
                            <Label visible={true}>
                                <Format type="fixedPoint" precision={0} />
                            </Label>
                        </CommonSeriesSettings>

                        <Series
                            // argumentField="count"
                            valueField="count"
                            name="Нийт"
                        />
                        <Series
                            valueField={"shalguur_hangaagui"}
                            name="Тэнцээгүй"
                        />
                        <Series
                            valueField="shalguur_hangasan"
                            name="Тэнцсэн"
                        />
                        <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
                        <Export enabled={true} />
                    </Chart>
                </div>
        </Container>
    )
}

function onLegendClick({ target: series }) {
    if(series.isVisible()) {
      series.hide();
    } else {
      series.show();
    }
  }
  
const HeaderCell = (data) => (
    <div className="tw-text-gray-700">
        {data.column.caption}
    </div>
)

export default SectorsOne;

function onPointClick(e) {
    e.target.select();
}