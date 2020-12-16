import React from 'react';
import axios from '../../axiosbase';
import './css/emailOne.css';


function EmailSend() {
    const clickHandle = () =>{
        console.log(HtmlFull, "html One");
        // console.log(typeof true, "type of");

    //     axios.post('test/test',  {
    //         html: Html,
    //        }
    //           ).then((res)=>{
    //             console.log(res, "login res");
    //           }).catch((e)=>{
    //             console.log(e.response, "err Response");  
    //           });
    //   }
    }

    return (
        <div>
            <div>{HtmlOne}</div>
            <button onClick={clickHandle} className="btn btn-primary">Илгээх</button>
        </div>
    )
}

export default EmailSend



const HtmlOne =(
    <div class="BodyPar">
        <div class="ContentPar">
            <div class="header bold">Санхүүгийн дэмжлэг олгохоос татгалзсан мэдэгдэл</div>
            <div class="CompName">Хэнд: Example company танаа</div>

            <div>[Дугаар]: УП984685465</div>
            <div>[Огноо]: 2019/05/10</div>

            <div class="text bold">Агуулга: Санхүүгийн дэмжлэг олгохоос татгалзсан тухай </div>
            <div class="text">Эрхэм хүндэт   Баасандорж  танаа</div>

            <div class="text ident">Энэхүү захиагаар танай аж ахуйн нэгжийн ирүүлсэн санхүүгийн дэмжлэгийн хүсэлтэд үнэлгээ хийгдсэн болохыг мэдэгдэж байна</div>

            <div class="ident">Санхүүгийн дэмжлэгийн багийн шинжээчид таны ирүүлсэн экспортын хөгжлийн төлөвлөгөөг Санхүүгийн дэмжлэг хэрэгжүүлэх гарын авлагад тусгасан шалгуур үзүүлэлтүүдийн дагуу үнэлсэн болохыг мэдэгдэж байна. Танай байгууллагын өргөдөл дараах шалтгаануудын улмаас шаардлага хангаагүй болохыг мэдэгдэж байна.Үүнд:</div>
            <div class="center">[Санхүүгийн дэмжлэг олгохоос татгалзсан шалтгааныг бичих.]</div>
            <div class="text center">Бидэнд хүсэлтээ ирүүлсэн та бүхэнд баярлалаа. Дахин бидэнд хүсэлтээ ирүүлнэ гэдэгт итгэлтэй байна.  </div>

            <div class="text center">Төсөлтэй холбоотой тодруулах зүйл байвал бидэнтэй холбогдоно уу. </div>

            <div class="text">Хүндэтгэсэн:  Example name  </div>
            <div class="text">Санхүүгийн дэмжлэгийн багийн зохицуулагч</div>

        </div>
    </div>
)






const HtmlFull = `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>EDP</title>
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;1,300&display=swap" rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
        </head>
        <style>
            body{
                font-family: 'Roboto', sans-serif;
                font-size: 15px;
            }
            .BodyPar{
                display:flex;
                justify-content: center;
            }
            .BodyPar .ContentPar{
                margin-top: 30px;
                border: 1px solid rgba(0,0,0,0.4);
                width:40%;
                padding: 30px 60px;
            }
            .BodyPar .ContentPar .bold{
                font-weight: 500;
            }
            .BodyPar .ContentPar .header{
                text-align: center;
                margin-bottom: 50px;
            }
            .BodyPar .ContentPar .CompName{
                text-align: end;
                margin: 30px 0px;
            }
            .BodyPar .ContentPar .text{
                text-align: start;
                margin: 40px 0px;
                color: rgba(0,0,0,0.9);
            }
            .BodyPar .ContentPar .center{
                text-align: center;
                margin: 40px 0px;
            }
            .BodyPar .ContentPar .ident{
                text-indent: 50px;
            }
            @media (max-width: 1600px){
                .BodyPar .ContentPar{
                width:50%;
                padding: 30px 50px;
                font-size: 13px;
            }}
            @media (max-width: 900px){
                .BodyPar .ContentPar{
                width:80%;
                padding: 30px 30px;
                font-size: 13px;
            }}
            @media (max-width: 768px){
                .BodyPar .ContentPar{
                width:100%;
                padding: 30px 15px;
                font-size: 13px;
            }
            }
        </style>

        <body>
            <div class="BodyPar">
                <div class="ContentPar">
                        <div class="header bold">Санхүүгийн дэмжлэг олгохоос татгалзсан мэдэгдэл</div>
                        <div class="CompName">Хэнд: Example company танаа</div>

                        <div>[Дугаар]: УП984685465</div>
                        <div>[Огноо]: 2019/05/10</div>

                        <div class="text bold">Агуулга: Санхүүгийн дэмжлэг олгохоос татгалзсан тухай </div>
                        <div class="text">Эрхэм хүндэт   Баасандорж  танаа</div>

                        <div class="text ident">Энэхүү захиагаар танай аж ахуйн нэгжийн ирүүлсэн санхүүгийн дэмжлэгийн хүсэлтэд үнэлгээ хийгдсэн болохыг мэдэгдэж байна</div>

                        <div class="ident">Санхүүгийн дэмжлэгийн багийн шинжээчид таны ирүүлсэн экспортын хөгжлийн төлөвлөгөөг Санхүүгийн дэмжлэг хэрэгжүүлэх гарын авлагад тусгасан шалгуур үзүүлэлтүүдийн дагуу үнэлсэн болохыг мэдэгдэж байна. Танай байгууллагын өргөдөл дараах шалтгаануудын улмаас шаардлага хангаагүй болохыг мэдэгдэж байна.Үүнд:</div>
                        <div class="center">[Санхүүгийн дэмжлэг олгохоос татгалзсан шалтгааныг бичих.]</div>
                        <div class="text center">Бидэнд хүсэлтээ ирүүлсэн та бүхэнд баярлалаа. Дахин бидэнд хүсэлтээ ирүүлнэ гэдэгт итгэлтэй байна.  </div>

                        <div class="text center">Төсөлтэй холбоотой тодруулах зүйл байвал бидэнтэй холбогдоно уу. </div>

                        <div class="text">Хүндэтгэсэн:  Example name  </div>
                        <div class="text">Санхүүгийн дэмжлэгийн багийн зохицуулагч</div>

                </div>
            </div>
        </body>
        </html>
`

