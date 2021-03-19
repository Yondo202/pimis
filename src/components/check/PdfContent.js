import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet,Font  } from '@react-pdf/renderer';
// import Roboto from 'components/font/roboto-light-webfont.ttf'
// const font = require('components/font/roboto-light-webfont.ttf');
Font.register({ family: "Roboto", src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf" });

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4',
    //   fontFamily: "Roboto",
    },
    section: {
      display:'flex',
      flexDirection:`column`,
      margin: 10,
      padding: 10,
      flexGrow: 1,
      borderBottom:1,
      borderBottomColor:"red",
    }
  });

  // Create Document Component
  const MyDocument = ({data}) => {
      return(
        <Document >
            {data?<Page size="A4" style={styles.page}>
                {allData.map((el,i)=>{
                    return(
                        <View style={styles.section}>
                            <Text style={{ fontFamily: "Roboto",borderBottom:`10px solid rgba(0,0,0,0.5)`, color:`blue`}}>nananan +--+-+ {el.title}</Text> 
                        </View>
                    )
                })}
            </Page> :
             <Page size="A4">
                <View >
                    <Text>Loading</Text> 
                </View>
            </Page>}
          
        </Document>
    )

    // <Document >
    //   <Page size="A4" style={styles.page}>
    //     <View style={styles.section}>
    //       <Text>Section #1</Text>
    //     </View>
    //     <View style={styles.section}>
    //       <Text>Section #2</Text>
    //     </View>
    //   </Page>
    //   <Page size="A4" style={styles.page}>
    //     <View style={styles.section}>
    //       <Text>Section #1</Text>
    //     </View>
    //     <View style={styles.section}>
    //       <Text>Section #2</Text>
    //     </View>
    //   </Page>
    //   <Page size="A4" style={styles.page}>
    //     <View style={styles.section}>
    //       <Text>Section #1</Text>
    //     </View>
    //     <View style={styles.section}>
    //       <Text>Section #2</Text>
    //     </View>
    //   </Page>
    // </Document>
};

  export default MyDocument

  const allData = [
    {
       group: "a",
       title: "ҮНДСЭН ШАЛГУУР ХАНГАЛТ aaaaaaaaaaaaaaaaaaaaaa",
       items: [
           {  name: "100 хувь хувийн ААН мөн эсэх"},
           {  name: "2 жилийн турш тогтмол үйл ажиллагаа явуулсныг батлах санхүүгийн тайлантай эсэх"},
           {  name: "Уул уурхайн салбарт ажилладаггүй эсэх"},
           {  name: "Ре-экспортын худалдаа эрхэлдэггүй эсэх"},
           {  name: "Түүхий эд экспортлогч бус эсэх /хэрэв жилийн 100 мянган ам.доллараас дээш экспорт хийдэг бөгөөд энэ ойрын хугацаанд боловсруулсан бүтээгдэхүүний экспорт хийхээр зорьж буй бол тийм гэж дугуйлна уу"},
           {  name: "*Сүүлийн хоёр жил тус бүр 50 мянгаас 50 сая ам.доллартай тэнцэх нийт борлуулалтын орлоготой ажилласан эсэх "},
           {  name: "*Сүүлийн 2 жил тус бүр НДШ төлдөг бүтэн цагийн ажилчдын тоо 10-250 хооронд байсан эсэх"},
       ]
   }, 
   {
       group: "b",
       title: "ӨР ТӨЛБӨРИЙН ШАЛГУУР ХАНГАЛТ",
       items: [
           {  name: "12 сараас дээш хугацааны нийгмийн даатгалын өргүй бөгөөд нотлох тодорхойлолттой эсэх"},
           {  name: "12 сараас дээш хугацааны татварын өргүй бөгөөд нотлох тодорхойлолттой эсэх"},
           {  name: "Монголбанкны муу ангиллын зээлгүй бөгөөд нотлох тодорхойлолттой эсэх"},
       ]
   }, 
   { 
       group: "c",
       title: "АЖ АХУЙН НЭГЖИЙН ХУВЬ ЭЗЭМШИГЧ НЬ ДАРААХ УЛС ТӨРИЙН НӨЛӨӨ БҮХИЙ ЭТГЭЭДҮҮД БОЛОН ТЭДНИЙ ГЭР БҮЛИЙН ГИШҮҮНТЭЙ ХОЛБООТОЙ БАЙЖ БОЛОХГҮЙ",
       items: [
           {  name: "Ерөнхийлөгчтэй холбоогүй"},
           {  name: "Ерөнхий сайдтай холбоогүй"},
           {  name: "УИХ-н гишүүнтэй холбоогүй"},
           {  name: "Үндсэн хуулийн цэцийн гишүүдтэй холбоогүй"},
           {  name: "Дээд шүүхийн шүүгчидтэй холбоогүй"},
           {  name: "Улсын прокурортой холбоогүй"},
           {  name: "Аймаг, нийслэлийн засаг даргатай холбоогүй"},
           {  name: "Сайд, Төрийн нарийн бичгийн даргатай холбоогүй"},
           {  name: "Яам, хэрэгжүүлэгч агентлагуудын захирал, дарга нартай холбоогүй"},
           {  name: "Төрийн өмчит компаниудын захирал, дарга нартай холбоогүй"},
       ]
   }, 
   { 
       group: "d",
       title: "ЭКСПОРТ ХӨГЖЛИЙН ТӨЛӨВЛӨГӨӨГӨӨ БЭЛТГЭСЭН ЭСЭХ",
       items: [
           {  name: "Экспортын чиглэлээр санхүүжилт хүсч, хийхээр төлөвлөсөн ажил нь гэрээ шалгаруулалт хийгдэж, гэрээ зурагдсанаас хойш 9 сарын дотор хэрэгжиж дуусах боломжтой эсэх"},
           {  name: "Экспортыг дэмжих төслөөс хүсч буй дэмжлэгтэй тэнцүү дүнгээр санхүүжилт гаргах боломжтой бөгөөд бэлэн эсэх"},
           {  name: "Экспортыг дэмжих төслөөс хүсч буй дэмжлэгээр өмнө гарсан зардлыг санхүүжүүлэхгүй эсэх"},
           {  name: "Экспортыг дэмжих төслөөс хүсч буй дэмжлэгээр зөвхөн зөвшөөрөгдсөн үйл ажиллагааг санхүүжүүлэх эсэх"},
       ]
   }, 
   { 
       group: "f",
       title: "БУСАДТАЙ ТУРШЛАГА, МЭДЭЭЛЛЭЭ ХУВААЛЦАХ БОЛОМЖТОЙ ЭСЭХ",
       items: [
           {  name: "Ирэх нэг жилийн хугацаанд Экспортыг дэмжих төслөөс зохион байгуулах арга хэмжээнд хамтарч, бусад экспортлогчид болон шинээр экспортлохоор зорьж буй аж ахуйн нэгжүүдийг бэлтгэх сургалт, мэдээлэл хуваалцах ажлилд өөрийн байгууллагын туршлага, мэдлэгээ хуваалцаж, идэвхитэй оролцох эсэх"},
       ]
   }, 
  ]