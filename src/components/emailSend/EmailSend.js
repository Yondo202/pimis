import React, { useState } from 'react';
import axios from '../../axiosbase';
import { Email, Item, renderEmail, Box, Image } from 'react-html-email'


function EmailSend() {
    const [color, setColor] = useState("#FFFF00");
    const [Text, setText] = useState("Илгээхэд алдаа гарлаа");
    const [Scale, setScale] = useState("0");
    const clickHandle = async () => {
        await axios.post('send-pps-notice', {
            // html: Html,
            email: "yondooo61@gmail.com",
            emailBody: EmailHTML,
        }).then((res) => {
            if (res.data.success === true) {
                setColor("#32CD32");
                setText("Амжилттай илгээгдлээ");
                setScale("1");
            } else {
                setColor("#FFFF00");
                setText("Илгээхэд алдаа гарлаа");
                setScale("1");
            }
        }).catch((e) => {
            console.log(e.response, "err Response");
            if (e.response.data.success === false) {
                setColor("#FFFF00");
                setText("Илгээхэд алдаа гарлаа");
                setScale("1");
            }
        });
    };

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ marginTop: 20, width: "100%" }}>
                <div style={{ transition: `all 0.4s ease`, marginBottom: "15px", backgroundColor: color, padding: "5px 0px", transform: `scale(${Scale})` }}>{Text}</div>
                <Email title="EDP">
                    <Image style={{ width: "100%" }} src="http://www.edp.mn/Content/Images/mn-MN/head.jpg" />
                    <Item style={{ border: "1px solid rgba(0,0,0,0.2)", padding: '20px 20px', backgroundColor: "#f2f2f2" }} align="end">
                        <Box style={{ textAlign: "center", width: "100%", margin: '20px 0px', fontWeight: '500', fontSize: '14px' }} > Санхүүгийн дэмжлэг олгохоос татгалзсан мэдэгдэл</Box>
                        <Box style={{ textAlign: "end", width: "100%", marginBottom: '20px', fontSize: '12px' }}> Хэнд: Example company танаа:</Box>

                        <Box style={{ textAlign: "start", width: "100%", fontSize: '12px' }}> [Дугаар]: УП984685465</Box>
                        <Box style={{ textAlign: "start", width: "100%", fontSize: '12px' }}> [Огноо]:  2019/05/10</Box>

                        <Box style={{ textAlign: "start", width: "100%", margin: '20px 0px', fontWeight: '500', fontSize: '12px' }}>Агуулга: Санхүүгийн дэмжлэг олгохоос татгалзсан тухай</Box>
                        <Box style={{ textAlign: "start", width: "100%", margin: '10px 0px', fontSize: '12px' }}>Эрхэм хүндэт Баасандорж танаа</Box>

                        <Box style={{ textAlign: "start", width: "100%", margin: '18px 0px', textIndent: "50px", fontSize: '12px' }}>Энэхүү захиагаар танай аж ахуйн нэгжийн ирүүлсэн санхүүгийн дэмжлэгийн хүсэлтэд үнэлгээ хийгдсэн болохыг мэдэгдэж байна</Box>
                        <Box style={{ textAlign: "start", width: "100%", margin: '18px 0px', textIndent: "50px", fontSize: '12px' }}>Санхүүгийн дэмжлэгийн багийн шинжээчид таны ирүүлсэн экспортын хөгжлийн төлөвлөгөөг Санхүүгийн дэмжлэг хэрэгжүүлэх гарын авлагад тусгасан шалгуур үзүүлэлтүүдийн дагуу үнэлсэн болохыг мэдэгдэж байна. Танай байгууллагын өргөдөл дараах шалтгаануудын улмаас шаардлага хангаагүй болохыг мэдэгдэж байна.Үүнд:</Box>

                        <Box style={{ textAlign: "center", width: "100%", margin: '18px 0px', textIndent: "50px", fontSize: '12px' }}>[Санхүүгийн дэмжлэг олгохоос татгалзсан шалтгааныг бичих.]</Box>
                        <Box style={{ textAlign: "center", width: "100%", margin: '18px 0px', textIndent: "50px", fontSize: '12px' }}>Бидэнд хүсэлтээ ирүүлсэн та бүхэнд баярлалаа. Дахин бидэнд хүсэлтээ ирүүлнэ гэдэгт итгэлтэй байна.</Box>

                        <Box style={{ textAlign: "center", width: "100%", margin: '18px 0px', textIndent: "50px", fontSize: '12px' }}>Төсөлтэй холбоотой тодруулах зүйл байвал бидэнтэй холбогдоно уу.</Box>

                        <Box style={{ textAlign: "start", width: "100%", margin: '18px 0px', fontSize: '12px' }}>Хүндэтгэсэн: ...........</Box>
                        <Box style={{ textAlign: "start", width: "100%", margin: '18px 0px', fontSize: '12px' }}>Санхүүгийн дэмжлэгийн багийн зохицуулагч</Box>
                    </Item>
                </Email>
            </div>

            <button onClick={clickHandle} style={{ margin: "20px", width: "20%" }} className="btn btn-success">Илгээх</button>
        </div>
    )
}

export default EmailSend


const EmailHTML = renderEmail(
    <Email title="EDP">
        <Image style={{ width: "100%" }} src="http://www.edp.mn/Content/Images/mn-MN/head.jpg" />
        <Item style={{ border: "1px solid rgba(0,0,0,0.2)", padding: '20px 20px', backgroundColor: "#f2f2f2" }} align="end">
            <Box style={{ textAlign: "center", width: "100%", margin: '20px 0px', fontWeight: '500', fontSize: '14px' }} > Санхүүгийн дэмжлэг олгохоос татгалзсан мэдэгдэл</Box>
            <Box style={{ textAlign: "end", width: "100%", marginBottom: '20px', fontSize: '12px' }}> Хэнд: Example company танаа:</Box>

            <Box style={{ textAlign: "start", width: "100%", fontSize: '12px' }}> [Дугаар]: УП984685465</Box>
            <Box style={{ textAlign: "start", width: "100%", fontSize: '12px' }}> [Огноо]:  2019/05/10</Box>

            <Box style={{ textAlign: "start", width: "100%", margin: '20px 0px', fontWeight: '500', fontSize: '12px' }}>Агуулга: Санхүүгийн дэмжлэг олгохоос татгалзсан тухай</Box>
            <Box style={{ textAlign: "start", width: "100%", margin: '10px 0px', fontSize: '12px' }}>Эрхэм хүндэт Баасандорж танаа</Box>

            <Box style={{ textAlign: "start", width: "100%", margin: '18px 0px', textIndent: "50px", fontSize: '12px' }}>Энэхүү захиагаар танай аж ахуйн нэгжийн ирүүлсэн санхүүгийн дэмжлэгийн хүсэлтэд үнэлгээ хийгдсэн болохыг мэдэгдэж байна</Box>
            <Box style={{ textAlign: "start", width: "100%", margin: '18px 0px', textIndent: "50px", fontSize: '12px' }}>Санхүүгийн дэмжлэгийн багийн шинжээчид таны ирүүлсэн экспортын хөгжлийн төлөвлөгөөг Санхүүгийн дэмжлэг хэрэгжүүлэх гарын авлагад тусгасан шалгуур үзүүлэлтүүдийн дагуу үнэлсэн болохыг мэдэгдэж байна. Танай байгууллагын өргөдөл дараах шалтгаануудын улмаас шаардлага хангаагүй болохыг мэдэгдэж байна.Үүнд:</Box>

            <Box style={{ textAlign: "center", width: "100%", margin: '18px 0px', textIndent: "50px", fontSize: '12px' }}>[Санхүүгийн дэмжлэг олгохоос татгалзсан шалтгааныг бичих.]</Box>
            <Box style={{ textAlign: "center", width: "100%", margin: '18px 0px', textIndent: "50px", fontSize: '12px' }}>Бидэнд хүсэлтээ ирүүлсэн та бүхэнд баярлалаа. Дахин бидэнд хүсэлтээ ирүүлнэ гэдэгт итгэлтэй байна.</Box>

            <Box style={{ textAlign: "center", width: "100%", margin: '18px 0px', textIndent: "50px", fontSize: '12px' }}>Төсөлтэй холбоотой тодруулах зүйл байвал бидэнтэй холбогдоно уу.</Box>

            <Box style={{ textAlign: "start", width: "100%", margin: '18px 0px', fontSize: '12px' }}>Хүндэтгэсэн: ...........</Box>
            <Box style={{ textAlign: "start", width: "100%", margin: '18px 0px', fontSize: '12px' }}>Санхүүгийн дэмжлэгийн багийн зохицуулагч</Box>
        </Item>
    </Email>
)




