import React, { useEffect, useState } from 'react';
import MyDocument from './PdfContent';
import styled from 'styled-components';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import AccessToken from '../../context/accessToken'
import axios from 'axiosbase'

const PdfTest = () => {
  const [fontwait, setFontWait] = useState(false);
  const [wait, setWait] = useState(false);
  const [initialData, setInitialData] = useState(allData);

  useEffect(() => {
    const localId = localStorage.getItem("userId");
    void async function fetch() {
      const data = await axios.get(`criterias?userId=${localId}}`, { headers: { Authorization: AccessToken() } });
      console.log(data, " my data");
      let keys = Object.keys(data.data.data);
      if (keys.length > 1) {
        // setSuccess(data.data.data.approved);
        let filterArr = []; let value = Object.values(data.data.data);
        keys.forEach((el, i) => { let obj1 = {}; value.forEach((elem, ind) => { if (i === ind) { obj1["keys"] = el; obj1["values"] = elem; } }); filterArr.push(obj1); });
        allData.forEach(el => { el.items.forEach((elem, ind) => { filterArr.forEach(element => { if (el.group + (ind + 1) === element.keys) { elem["value"] = element.values }; }); }); });
        setInitialData(allData);
      } else { console.log("^^data alga") }
    }()
    setTimeout(() => {
      setWait(true);
    }, 1000)
    setTimeout(() => {
      setFontWait(true);
    }, 3000)
  }, []);

  return (
    <div className="container">
      <PDFstyle className="Nanana">
        <PDFViewer fileName="somename.pdf" style={{ height: '90vh', width: `100%` }} >
          <MyDocument wait={wait} data={initialData} />
        </PDFViewer>
      </PDFstyle>

      {/* {wait && <PDFDownloadLink document={<MyDocument data={fontwait} />}>
        {({ blob, url, loading, error }) => {
            if (loading) return <Loader />;
              return 'Download Invoice';
          }}
      </PDFDownloadLink>}  */}


      <PDFDownloadLink document={<MyDocument wait={fontwait} data={initialData} />} fileName="somename.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
      </PDFDownloadLink>

    </div>

  )
}
export default PdfTest;

const PDFstyle = styled.div`
  iframe{
    width: 100%;
    height: 80vh;
  }
`

const allData = [
  {
    group: "a",
    title: "ҮНДСЭН ШАЛГУУР ХАНГАЛТ",
    items: [
      { name: "100 хувь хувийн ААН мөн эсэх" },
      { name: "2 жилийн турш тогтмол үйл ажиллагаа явуулсныг батлах санхүүгийн тайлантай эсэх" },
      { name: "Уул уурхайн салбарт ажилладаггүй эсэх" },
      { name: "Ре-экспортын худалдаа эрхэлдэггүй эсэх" },
      { name: "Түүхий эд экспортлогч бус эсэх /хэрэв жилийн 100 мянган ам.доллараас дээш экспорт хийдэг бөгөөд энэ ойрын хугацаанд боловсруулсан бүтээгдэхүүний экспорт хийхээр зорьж буй бол тийм гэж дугуйлна уу" },
      { name: "*Сүүлийн хоёр жил тус бүр 50 мянгаас 50 сая ам.доллартай тэнцэх нийт борлуулалтын орлоготой ажилласан эсэх " },
      { name: "*Сүүлийн 2 жил тус бүр НДШ төлдөг бүтэн цагийн ажилчдын тоо 10-250 хооронд байсан эсэх" },
    ]
  },
  {
    group: "b",
    title: "ӨР ТӨЛБӨРИЙН ШАЛГУУР ХАНГАЛТ",
    items: [
      { name: "12 сараас дээш хугацааны нийгмийн даатгалын өргүй бөгөөд нотлох тодорхойлолттой эсэх" },
      { name: "12 сараас дээш хугацааны татварын өргүй бөгөөд нотлох тодорхойлолттой эсэх" },
      { name: "Монголбанкны муу ангиллын зээлгүй бөгөөд нотлох тодорхойлолттой эсэх" },
    ]
  },
  {
    group: "c",
    title: "АЖ АХУЙН НЭГЖИЙН ХУВЬ ЭЗЭМШИГЧ НЬ ДАРААХ УЛС ТӨРИЙН НӨЛӨӨ БҮХИЙ ЭТГЭЭДҮҮД БОЛОН ТЭДНИЙ ГЭР БҮЛИЙН ГИШҮҮНТЭЙ ХОЛБООТОЙ БАЙЖ БОЛОХГҮЙ",
    items: [
      { name: "Ерөнхийлөгчтэй холбоогүй" },
      { name: "Ерөнхий сайдтай холбоогүй" },
      { name: "УИХ-н гишүүнтэй холбоогүй" },
      { name: "Үндсэн хуулийн цэцийн гишүүдтэй холбоогүй" },
      { name: "Дээд шүүхийн шүүгчидтэй холбоогүй" },
      { name: "Улсын прокурортой холбоогүй" },
      { name: "Аймаг, нийслэлийн засаг даргатай холбоогүй" },
      { name: "Сайд, Төрийн нарийн бичгийн даргатай холбоогүй" },
      { name: "Яам, хэрэгжүүлэгч агентлагуудын захирал, дарга нартай холбоогүй" },
      { name: "Төрийн өмчит компаниудын захирал, дарга нартай холбоогүй" },
    ]
  },
  {
    group: "d",
    title: "ЭКСПОРТ ХӨГЖЛИЙН ТӨЛӨВЛӨГӨӨГӨӨ БЭЛТГЭСЭН ЭСЭХ",
    items: [
      { name: "Экспортын чиглэлээр санхүүжилт хүсч, хийхээр төлөвлөсөн ажил нь гэрээ шалгаруулалт хийгдэж, гэрээ зурагдсанаас хойш 9 сарын дотор хэрэгжиж дуусах боломжтой эсэх" },
      { name: "Экспортыг дэмжих төслөөс хүсч буй дэмжлэгтэй тэнцүү дүнгээр санхүүжилт гаргах боломжтой бөгөөд бэлэн эсэх" },
      { name: "Экспортыг дэмжих төслөөс хүсч буй дэмжлэгээр өмнө гарсан зардлыг санхүүжүүлэхгүй эсэх" },
      { name: "Экспортыг дэмжих төслөөс хүсч буй дэмжлэгээр зөвхөн зөвшөөрөгдсөн үйл ажиллагааг санхүүжүүлэх эсэх" },
    ]
  },
  {
    group: "f",
    title: "БУСАДТАЙ ТУРШЛАГА, МЭДЭЭЛЛЭЭ ХУВААЛЦАХ БОЛОМЖТОЙ ЭСЭХ",
    items: [
      { name: "Ирэх нэг жилийн хугацаанд Экспортыг дэмжих төслөөс зохион байгуулах арга хэмжээнд хамтарч, бусад экспортлогчид болон шинээр экспортлохоор зорьж буй аж ахуйн нэгжүүдийг бэлтгэх сургалт, мэдээлэл хуваалцах ажлилд өөрийн байгууллагын туршлага, мэдлэгээ хуваалцаж, идэвхитэй оролцох эсэх" },
    ]
  },
]