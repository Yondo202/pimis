import React from 'react'
import './css/emailTwo.css'

function EmailSend2() {
    const clickHandle = () =>{
        console.log('HtmlTwo', HtmlTwo)
    }
    return (
        <div>
            <div>{HtmlTwo}</div>
            <button onClick={clickHandle} className="btn btn-primary">Илгээх</button>
        </div>
    )
}

export default EmailSend2


const HtmlTwo = (
 <div class="BodyPar container-fluid">
    <div class="ContentPar">
          <div class="header bold">Санхүүгийн дэмжлэг олгох тухай мэдэгдлийн загвар</div>
          <div class="CompName">Хэнд: Example company танаа</div>

          <div>[Дугаар]: УП984685465</div>
          <div>[Огноо]: 2019/05/10</div>

          <div class="text bold">Агуулга: Гэрээ байгуулах эрх олгох тухай мэдэгдэл </div>
          <div class="text">Эрхэм хүндэт   Баасандорж  танаа</div>

          <div class="text ident">Энэхүү захиагаар танай аж ахуйн нэгжийн ирүүлсэн санхүүгийн дэмжлэгийн хүсэлтэд үнэлгээ хийгдсэн болохыг мэдэгдэж байна</div>

          <div class="ident">Санхүүгийн дэмжлэгийн багийн шинжээчид таны ирүүлсэн экспортын хөгжлийн төлөвлөгөөг Санхүүгийн дэмжлэг хэрэгжүүлэх гарын авлагад тусгасан шалгуур үзүүлэлтүүдийн дагуу үнэлсэн болохыг мэдэгдэж байна. Танай байгууллагын өргөдөл дараах шалтгаануудын улмаас шаардлага хангаагүй болохыг мэдэгдэж байна.Үүнд:</div>
         
          <div class="text ident">Дээрх шийдвэрийн хүрээнд бид хавсралтаар та бүхэнд Санхүүгийн дэмжлэг олгох гэрээг бэлтгэн хүргүүлж байгаа бөгөөд гэрээтэй танилцан, гарын үсэг зуран баталгаажуулж бидэнд буцаан ирүүлэхийг хүсье. </div>
          

          <div class="text">Гэрээнд гарын үсэг зурсан өдөр:</div>

          <div class="bold">Гэрээний үнэ: ………………………….ам.доллар</div>
          <div class="bold">Гэрээний хугацаа: …………………………</div>

          <div class="text center">Төсөлтэй холбоотой тодруулах зүйл байвал бидэнтэй холбогдоно уу. </div>

          <div class="text">Хүндэтгэсэн:  Example name  </div>
          <div class="text">Санхүүгийн дэмжлэгийн багийн зохицуулагч</div>

    </div>
</div>
)