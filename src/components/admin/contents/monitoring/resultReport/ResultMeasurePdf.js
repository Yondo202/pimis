import React, { useEffect } from 'react'
import { Document, Page, Text, View, StyleSheet, Font ,Image } from '@react-pdf/renderer';
import { styles, HeadImage } from "components/misc/PdfStyle"


const ResultMeasurePdf = ({ wait, data, years, lang, LangText }) => {
    // useEffect(()=>{
    //     GlobalFont();
    // },[])

    console.log(`data`, data)

    return (
        <Document title={LangText.title} >
            {wait?
            <>
                <PdfTemplate wait={wait} data={data.filter(item=>item.row_type==="level1").sort((a,b)=>a.row_number-b.row_number)} years={years} page="1" lang={lang} LangText={LangText} />
                <PdfTemplate wait={wait} data={data.filter(item=>item.row_type==="level2").sort((a,b)=>a.row_number-b.row_number)} years={years} page="2" lang={lang} LangText={LangText} />
            </>
           :<Page wrap={false} size="A4">
                <Text>Loading...</Text>
            </Page>}
        </Document>
    )
}

export default ResultMeasurePdf

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = yyyy + '/' + dd + '/' + mm;

const PdfTemplate = ({ data, years, page, lang, LangText }) =>{
    return( 
       
        <Page orientation="landscape" wrap size="A4" style={styles.page}>
            <View fixed style={styles.headerStyle}>
                <Text >Төслийн үр дүнг хэмжих, хянах тайлан - {page}</Text>
            </View>
            <View style={styles.headTitle}>
                <Text >МОНГОЛ УЛС</Text> 
                <Text >ЭКСПОРТЫГ ДЭМЖИХ ТӨСӨЛ</Text> 
            </View>
            <View style={styles.headTitle}>
                <Text style={{textTransform:"uppercase"}}>{LangText?.title}</Text> 
                <Text style={{fontWeight:'light'}}>ТАЙЛАНТ ХУГАЦАА: 2017/01/01 - {today}</Text> 
            </View>
            <View style={styles.tableParent}>
                <View style={[styles.tableRow, styles.tableHead, {borderBottom:'none'}]}>
                        <View style={[styles.tableCol, {width:'2%',borderColor:"#fff"}]}>
                            <Text ></Text> 
                        </View>
                        <View style={[styles.tableCol, {width:'20%',borderColor:"#fff"}]}>
                            <Text></Text> 
                        </View>
                        <View style={styles.tableCol}>
                            <Text></Text> 
                        </View>
                        {years.map((el,ind)=>{
                        return(
                            <React.Fragment key={ind}>
                                <View style={[styles.tableCol, {width:'10.4%', borderBottom:0.5}, ind===years.length - 1?{borderRightColor:'#fff'}:{} ]}><Text break>{el.year}</Text></View>
                            </React.Fragment>
                        )
                        })}
                </View>
                <View style={[styles.tableRow, styles.tableHead]}>
                        <View style={[styles.tableCol, {width:'2%', borderColor:'#fff'}]}>
                            <Text >№</Text> 
                        </View>
                        <View style={[styles.tableCol, {width:'20%', borderColor:'#fff'}]}>
                            <Text>{LangText?.Indicator}</Text> 
                        </View>
                        <View style={styles.tableCol}>
                        <Text>{LangText?.Measurement}</Text> 
                        </View>
                        {years.map((el,ind)=>{
                        return(
                            <React.Fragment key={ind}>
                                <View style={styles.tableCol}><Text break>{LangText?.Cumalative}</Text></View>
                                <View style={[styles.tableCol, ind===years.length - 1?{borderColor:'#fff'}:{borderColor:'#000'}]}><Text break>{LangText?.Current}</Text></View>
                            </React.Fragment>
                        )
                        })}
                </View>
                {data.map((el,ind)=>{
                    return(
                        <View style={[styles.tableRow, ind===data.length - 1?{borderColor:'#fff'}:{borderColor:'#000'}]} key={ind}>
                            <View style={[styles.tableCol, ,{width:'2%'}]}><Text>{el.row_number}</Text></View>
                            <View style={[styles.tableCol,{width:'20%', textAlign:'left'}]}><Text break >{el[`description_${lang}`]}</Text></View>
                            <View style={styles.tableCol}>
                            <Text>
                                {el.measure==="Хувь"?`${LangText?.percent}`:``}
                                {el.measure==="Тоо"?`${LangText?.number}`:``} 
                                {el.measure==="Дүн (USD)"?`${LangText?.amount}`:``} 
                             </Text>
                             </View>
                            {years.map((elem,index)=>{
                                return(
                                    <React.Fragment key={index}>
                                        <View style={styles.tableCol}><Text>{el[`cum${elem.year}`]!==null?el[`cum${elem.year}`]:'-'} {el.measure==="Хувь"&&el[`cum${elem.year}`]?` %`:``}</Text></View>
                                        <View style={[styles.tableCol, index===years.length - 1?{borderColor:'#fff'}:{borderColor:'#000'}]}><Text>{el[`cur${elem.year}`]}</Text></View>
                                    </React.Fragment>
                                )
                            })}
                        </View>
                    )
                })}
            </View>
            
            <View style={styles.InfoParent}>
                <View style={styles.InfoRow}>
                    <Text style={styles.InfoCol}>Танилцсан</Text>
                    <Image style={[styles.SigImageStyle, styles.InfoCol]} src={sig} />
                    <Text style={styles.InfoCol}>Д.Батмөнх /Төслийн зохицуулагч/</Text>
                </View>

                <View style={styles.InfoRow}>
                    <Text style={styles.InfoCol}>Бэлтгэсэн</Text>
                    <Image style={[styles.SigImageStyle, styles.InfoCol]} src={sig} />
                    <Text  style={styles.InfoCol}>Д.Цэнгүүн /Захиргааны туслах ажилтан/</Text>
                </View>
            </View>
        </Page> 
    
    )
}

const sig = 'data:image/png;base64,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'