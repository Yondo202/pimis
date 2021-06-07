import React from 'react'
import { Link } from "react-router-dom";
import DocumentTitle from 'containers/document/DocumentTitle';
import { edplanFront } from "axiosbase"

function ActiveComp(props) {
    DocumentTitle("EDP");

    console.log(`propss`, props.data?.userId);
    return (
        <div style={{ paddingTop: 20 }} className="row">
            <div className="col-md-2 col-sm-2 itemsCol">
                <div className="itemsPar">
                    <div className="mains">
                        <Link to={!props.prew ? `/check/user` : `/check/${props.prew}`} className={props.data.criteria !== 0 ? props.data.criteria === 1 ? `items itemsNotApproved` : `itemsActive` : `items`}>1. Шалгуур хангалтыг тулгах хуудас</Link>
                        {/* <div className="line line2" ></div> */}
                        <div className="line" ></div>
                        <Link to={!props.prew ? `/request/user` : `/request/${props.prew}`}
                            className={!props.data.esm ? `items` : props.data.esm === "A" ? `items itemsNotApproved` : props.data.esm === "B" ? `itemsActive` : props.data.esm === "C" || props.data.esm === "F" ? `itemsActive` : `items itemsNotWait`}>2. Байгаль орчны үнэлгээний асуумж </Link>
                        <div className="line" ></div>
                        <Link to={props.prew ? `/letter-of-interest?userId=${props.prew}` : '/letter-of-interest'} className={props.data.letterOfInterst === true ? `itemsActive` : `items`} >3. Сонирхол илэрхийлэх албан тоот</Link>
                    </div>
                    <div className="lineFull" ></div>
                    <Link to={props.prew ? `/urgudul-preview/${props.data.project?.id}` : '/urgudul/1'} className={props.data.project && props.data.project.confirmed === 1 ? `resultActive` : `resultDesable`} >4. Өргөдлийн маягт </Link>
                </div>
            </div>

            <div className="col-md-2 col-sm-2 itemsCol">
                <div className="itemsPar">
                    <div className="mains">
                        <a href={`${edplanFront}/${props.data?.userId}`} rel="noreferrer" target="_blank" className={props.data.edpPlan === true ? `itemsActive arrHelp arrHelpActive` : `items arrHelp`}><div className="helpArr"></div> 1.Экспорт хөгжлийн төлөвлөгөө</a>
                    </div>
                    <div className="lineFull" ></div>
                    <Link to={props.prew ? `/attachments/${props.prew}` : '/attachments'} className={props.data.evidence === true ? `resultActive` : `resultDesable`} >2.Нотлох бичиг баримтууд </Link>
                </div>
            </div>

            <div className="col-md-2 col-sm-2 itemsCol">
                <div className="itemsPar">
                    <div className="mains">
                        <Link to={props.prew ? `/5a/${props.data.project?.id}` : '#'} className={props.data.firstEvalution.value === 0 ? `items arrHelp` : props.data.firstEvalution.value === 1 ? `items itemsNotApproved arrHelp` : `itemsActive arrHelp`}>
                            <div className="helpArr" />
                                1. Анхан шатны үнэлгээ
                            </Link>
                        <div className="line" />
                        <Link to={props.prew ? `/5b/${props.data.project?.id}` : '/5b'} className={props.data.evaluation5b ? `itemsActive` : `items`}><div className="helpArr"></div> 2. Баримтжуулах бүрдүүлбэрийн шалгах хуудас </Link>
                    </div>
                    <div className="lineFull" ></div>
                    <Link to={props.prew ? `/5c/${props.data.project?.id}` : '/5c'} className={props.data.evaluation5c ? `items resultActive` : `items resultDesable`}>3. Бизнес шинжээчийн шинжилгээний тайлан </Link>
                </div>
            </div>

            <div className="col-md-2 col-sm-2 itemsCol">
                <div className="itemsPar">
                    <div className="mains">
                        <Link to="#" className={props.data.lastEvalution.value === 0 ? `items arrHelp` : props.data.lastEvalution.value === 1 ? `itemsActive` : `itemsActive`} ><div className="helpArr"></div> 1. Ашиг сонирхлын зөрчилгүйг мэдэгдэх хуудас</Link>
                    </div>
                    <div className="lineFull" ></div>
                    <Link to={props.prew ? `/maindecision/${props.data.project?.id}` : `#`} className={props.data.lastEvalution.value === 0 ? `resultDesable` : props.data.lastEvalution.value === 1 ? `resultWaiting` : `resultActive`} >2.Үнэлгээний хорооны шийдвэрийн хуудас</Link>
                </div>
            </div>

            <div className="col-md-2 col-sm-2 itemsCol">
                <div className="itemsPar">
                    <div className="mains">
                        <div className="items arrHelp"><div className="helpArr"></div>1. Түншлэлийн гэрээ байгуулах </div>
                        <div className="line" ></div>
                        <Link to="#" className="items "><div className="helpArr"></div> 2. Түншлэлийн гэрээний гүйцэтгэлийн тайлан  </Link>
                    </div>
                    <div className="lineFull" ></div>
                    <div className="resultDesable">3. Гүйцэтгэлийг нотлох баримтууд (гэрээ, гэрээний дүгнэлт, хийгдсэн ажлуудын тайлан)</div>
                </div>
            </div>

            <div style={{ borderRight: `none` }} className="col-md-2 col-sm-2 itemsCol itemsColA">
                <div className="itemsPar">
                    <div className="mains">
                        <div className="items arrHelp"><div className="helpArr"></div>4. Хийгдсэн ажлуудын санхүүгийн баримтууд</div>
                        <div className="line" ></div>
                        <div className="items">5. Санхүүгийн дэмжлэг буюу буцаан олголтын хүсэлт</div>
                        <div className="line" ></div>
                        <div className="items">6. Ажлын гүйцэтгэл хүлээн авах маягт</div>
                    </div>
                    <div className="lineFull" ></div>
                    <div className="resultDesable">6. Гүйцэтгэлийн үнэгээ (ажлын чанар, гэрээний биелэлт, оролцоо)</div>
                </div>
            </div>
        </div>
    )
}

export default ActiveComp
