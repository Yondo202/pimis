import React from 'react'
import { Link } from "react-router-dom";
import { edplanFront } from "axiosbase"

function InitialComp(props) {
    return (
        <div style={{ marginTop: 25 }} className="row">
            <div className="col-md-2 col-sm-2 itemsCol">
                <div className="itemsPar">
                    <div className="mains">
                        <Link to={`/check/user`} className="items">1. Шалгуур хангалтыг тулгах хуудас </Link>
                        <div className="line line2" ></div>
                        <Link to={!props.prew ? `/request/user` : `/request/${props.prew}`} className="items">2. Байгаль орчны үнэлгээний асуумж </Link>
                        <div className="line line2" ></div>
                        <Link to="/letter-of-interest" className="items">3. Сонирхол илэрхийлэх албан тоот</Link>
                    </div>
                    <div className="lineFull lineFull2"></div>
                    <Link to="/urgudul/1" className="resultDesable">4. Өргөдлийн маягт </Link>
                </div>
            </div>

            <div className="col-md-2 col-sm-2 itemsCol">
                <div className="itemsPar">
                    <div className="mains">
                        <a href={`${edplanFront}/${props.data?.userId}`} rel="noreferrer" target="_blank" className="items arrHelp"><div className="helpArr"></div> 1.Экспорт хөгжлийн төлөвлөгөө</a>
                    </div>
                    <div className="lineFull" ></div>
                    <Link to="/attachments" className="resultDesable">2.Нотлох бичиг баримтууд </Link>
                </div>
            </div>

            <div className="col-md-2 col-sm-2 itemsCol">
                <div className="itemsPar">
                    <div className="mains">
                        <Link to="/" className="items"><div className="helpArr"></div>1. Анхан шатны үнэлгээ</Link>
                        <div className="line" ></div>
                        <Link to="/" className="items"><div className="helpArr"></div>2. Баримтжуулах бүрдүүлбэрийн шалгах хуудас</Link>
                    </div>
                    <div className="lineFull" ></div>
                    <Link to="/" className="items resultDesable">3. Бизнес шинжээчийн шинжилгээний тайлан </Link>
                </div>
            </div>

            <div className="col-md-2 col-sm-2 itemsCol">
                <div className="itemsPar">
                    <div className="mains">
                        <Link to="/" className="items"><div className="helpArr"></div>1. Ашиг сонирхлын зөрчилгүйг мэдэгдэх хуудас</Link>
                    </div>
                    <div className="lineFull" ></div>
                    <div className="resultDesable">2. Сонгон шалгаруулалтын багийн хурлын шийдвэрийн хуудас</div>
                </div>
            </div>
            <div className="col-md-2 col-sm-2 itemsCol">
                <div className="itemsPar">
                    <div className="mains">
                        <div className="items arrHelp"><div className="helpArr"></div>1. Түншлэлийн гэрээ байгуулах </div>
                        <div className="line" ></div>
                        <Link to="/" className="items"><div className="helpArr"></div>2. Түншлэлийн гэрээний гүйцэтгэлийн тайлан</Link>
                    </div>
                    <div className="lineFull"></div>
                    <div className="resultDesable">3. Гүйцэтгэлийг нотлох баримтууд (гэрээ, гэрээний дүгнэлт, хийгдсэн ажлуудын тайлан)</div>
                </div>
            </div>
            <div style={{ borderRight: `none` }} className="col-md-2 col-sm-2 itemsCol itemsColA">
                <div className="itemsPar">
                    <div className="mains">
                        <div className="items arrHelp"><div className="helpArr"></div>4. Хийгдсэн ажлуудын санхүүгийн баримтууд</div>
                        <div className="line"></div>
                        <div className="items">5. Санхүүгийн дэмжлэг буюу буцаан олголтын хүсэлт</div>
                        <div className="line"></div>
                        <div className="items">6. Ажлын гүйцэтгэл хүлээн авах маягт</div>
                    </div>
                    <div className="lineFull" ></div>
                    <div className="resultDesable">6. Гүйцэтгэлийн үнэгээ (ажлын чанар, гэрээний биелэлт, оролцоо)</div>
                </div>
            </div>
        </div>
    )
}

export default InitialComp
