import React from 'react'
import { Link } from "react-router-dom";
import DocumentTitle from 'containers/document/DocumentTitle';
import { edplanFront } from "axiosbase"

function ActiveComp({ userId, data }) {
    DocumentTitle("EDP");

    const projectId = data?.project?.id

    return (
        <div style={{ paddingTop: 20 }} className="row">
            <div className="col-md-2 col-sm-2 itemsCol">
                <div className="itemsPar">
                    <div className="mains">
                        <Link to={!userId ? `/check/user` : `/check/${userId}`} className={data?.criteria !== 0 ? data?.criteria === 2 ? `itemsActive` : `items items` : `items`}>1. Шалгуур хангалтыг тулгах хуудас</Link>
                        {/* <div className="line line2" ></div> */}
                        <div className="line" />
                        <Link to={!userId ? `/request/user` : `/request/${userId}`}
                            className={!data?.esm ? `items` : data?.esm === "A" ? `items itemsNotApproved` : data?.esm === "B" ? `itemsActive` : data?.esm === "C" || data?.esm === "F" ? `itemsActive` : `items itemsNotWait`}>2. Байгаль орчны үнэлгээний асуумж </Link>
                        <div className="line" />
                        <Link to={userId ? `/letter-of-interest?userId=${userId}` : '/letter-of-interest'} className={data?.letterOfInterst === true ? `itemsActive` : `items`} >3. Сонирхол илэрхийлэх албан тоот</Link>
                        <div className="line" />
                        <Link to={userId ? `/urgudul-preview/${projectId}` : '/urgudul/1'} className={data?.project && data?.project.confirmed === 1 ? `itemsActive` : `items`} >4. Өргөдлийн маягт </Link>
                        <div className="line" />
                        <Link to={userId ? `/attachments/evidence-1/${userId}` : '/attachments/evidence-1'} className={data?.evidence1 === true ? `itemsActive` : `items`} >5. Нотлох бичиг баримтууд I</Link>
                    </div>
                    {/* <div className="lineFull" ></div>
                    <Link to={props.prew ? `/urgudul-preview/${props?.data?.project?.id}` : '/urgudul/1'} className={props?.data?.project && props?.data?.project.confirmed === 1 ? `resultActive` : `resultDesable`} >4. Өргөдлийн маягт </Link> */}
                </div>
            </div>

            <div className="col-md-2 col-sm-2 itemsCol">
                <div className="itemsPar">
                    <div className="mains">
                        <a href={userId ? `/` : `${edplanFront}/${data?.userId}`} rel="noreferrer" target={userId ? "_self" : "_blank"} className={data?.edpPlan === true ? `itemsActive arrHelp arrHelpActive` : `items arrHelp`}><div className="helpArr"></div> 1.Экспорт хөгжлийн төлөвлөгөө</a>
                        <div className="line"></div>
                        <Link to={userId ? `/attachments/evidence-2/${userId}` : '/attachments/evidence-2'} className={data?.evidence2 === true ? `itemsActive` : `items`}>
                            2.Нотлох бичиг баримтууд II
                        </Link>
                    </div>
                    {/* <div className="lineFull" ></div> */}
                    {/* <Link to={props.prew ? `/attachments/${props.prew}` : '/attachments'} className={props?.data?.evidence === true ? `resultActive` : `resultDesable`} >2.Нотлох бичиг баримтууд </Link> */}
                </div>
            </div>

            <div className="col-md-2 col-sm-2 itemsCol">
                <div className="itemsPar">
                    <div className="mains">
                        <Link to={userId ? `/5a/${projectId}` : ''} className={data?.firstEvalution.value === 0 ? `items arrHelp` : data?.firstEvalution.value === 1 ? `items itemsNotApproved arrHelp` : `itemsActive arrHelp`}>
                            <div className="helpArr" />
                            1. Анхан шатны үнэлгээ
                        </Link>
                        <div className="line" />
                        <Link to={userId ? `/5b/${projectId}` : ''} className={data?.evaluation5b.value === 0 ? 'items' : data?.evaluation5b.value === 1 ? 'itemsNotApproved items' : 'itemsActive items'}>
                            <div className="helpArr"></div>
                            2. Бичиг баримтын бүрдүүлбэрийг шалгах хуудас
                        </Link>
                        <div className="line" />
                        <Link to={userId ? `/5c/${projectId}` : ''} className={data?.evaluation5c.value === 0 ? 'items' : data?.evaluation5c.value === 1 ? 'itemsNotApproved items' : 'itemsActive items'}>
                            3. Шинжилгээний тайлан
                        </Link>
                    </div>
                    {/* <div className="lineFull" ></div>
                    <Link to={props.prew ? `/5c/${props?.data?.project?.id}` : '/5c'} className={props?.data?.evaluation5c ? `items resultActive` : `items resultDesable`}>3. Бизнес шинжээчийн шинжилгээний тайлан </Link> */}
                </div>
            </div>

            <div className="col-md-2 col-sm-2 itemsCol">
                <div className="itemsPar">
                    <div className="mains">
                        {/* <Link to={pathname} className={props?.data?.lastEvalution.value === 0 ? `items arrHelp` : props?.data?.lastEvalution.value === 1 ? `itemsActive` : `itemsActive`} ><div className="helpArr"></div> 1. Ашиг сонирхлын зөрчилгүйг мэдэгдэх хуудас</Link> */}
                        <div className={data?.lastEvalution.value === 0 ? `items arrHelp` : data?.lastEvalution.value === 1 ? `itemsActive` : `itemsActive`} ><div className="helpArr"></div> 1. Ашиг сонирхлын зөрчилгүйг мэдэгдэх хуудас</div>
                        <div className="line" />
                        <Link to={userId ? `/maindecision/${projectId}` : ``} className={data?.lastEvalution.value === 0 ? `items` : data?.lastEvalution.value === 1 ? `resultWaiting` : `itemsActive`} >2.Үнэлгээний хорооны шийдвэрийн хуудас</Link>
                    </div>
                    {/* <div className="lineFull" ></div>
                    <Link to={props.prew ? `/maindecision/${props?.data?.project?.id}` : ``} className={props?.data?.lastEvalution.value === 0 ? `resultDesable` : props?.data?.lastEvalution.value === 1 ? `resultWaiting` : `resultActive`} >2.Үнэлгээний хорооны шийдвэрийн хуудас</Link> */}
                </div>
            </div>

            <div className="col-md-2 col-sm-2 itemsCol">
                <div className="itemsPar">
                    <div className="mains">
                        <Link to={`/make-contract?projectId=${projectId}`}>
                            <div className="items arrHelp"><div className="helpArr"></div>1. Түншлэлийн гэрээ байгуулах</div>
                        </Link>
                        <div className="line"></div>
                        <Link to={`/contract-reports?projectId=${projectId}`}>
                            <div className="items">2. Түншлэлийн гэрээний гүйцэтгэлийн тайлан</div>
                        </Link>
                        <div className="line"></div>
                        <Link to={userId ? `/attachments/performance/${userId}` : '/attachments/performance'}>
                            <div className="items">3. Гүйцэтгэлийг нотлох баримтууд (гэрээ, гэрээний дүгнэлт, хийгдсэн ажлуудын тайлан)</div>
                        </Link>
                    </div>
                    {/* <div className="lineFull" ></div>
                    <div className="resultDesable">3. Гүйцэтгэлийг нотлох баримтууд (гэрээ, гэрээний дүгнэлт, хийгдсэн ажлуудын тайлан)</div> */}
                </div>
            </div>

            <div style={{ borderRight: `none` }} className="col-md-2 col-sm-2 itemsCol itemsColA">
                <div className="itemsPar">
                    <div className="mains">
                        <Link to={userId ? `/attachments/financial/${userId}` : '/attachments/financial'}>
                            <div className="items arrHelp"><div className="helpArr"></div>4. Хийгдсэн ажлуудын санхүүгийн баримтууд</div>
                        </Link>
                        <div className="line" ></div>
                        <Link to={userId ? `/attachments/invoice/${userId}` : '/attachments/invoice'}>
                            <div className="items">5. Санхүүгийн дэмжлэгийн төлбөрийн нэхэмжлэх</div>
                        </Link>
                        {/* <div className="line"></div> */}
                        {/* <Link to="/work-performance">
                            <div className="items">6. Ажлын гүйцэтгэл хүлээн авах маягт</div>
                        </Link>
                        <div className="line"></div> */}
                        {/* <Link to="/control-report">
                            <div className="items">7. Хамгааллын үйл  ажиллагааны хяналтын тайлан</div>
                        </Link>
                        <div className="line"></div> */}
                        {/* <div className="items">8. Гүйцэтгэлийн үнэгээ (ажлын чанар, гэрээний биелэлт, оролцоо)</div> */}
                    </div>
                    {/* <div className="lineFull" ></div>
                    <div className="resultDesable">6. Гүйцэтгэлийн үнэгээ (ажлын чанар, гэрээний биелэлт, оролцоо)</div> */}
                </div>
            </div>
        </div>
    )
}

export default ActiveComp
