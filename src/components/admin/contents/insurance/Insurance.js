import React, { useEffect, useState } from 'react'
import axios from 'axiosbase'
import { motion } from "framer-motion";
import { Container, LangSwitch } from "components/misc/CustomStyle"
import { RiAddLine, RiEdit2Line } from "react-icons/ri"
import { VscError } from "react-icons/vsc"
import { RiBillLine } from "react-icons/ri"
import AddModal from "./AddModal"
import AccessToken from "context/accessToken"
import EditModal from "./EditModal"
import DeleteModal from "./DeleteModal"
import Indemnity from "./IndemnityAdd"
import { NumberComma } from "./NumberComma";
import ExportData from "./exportData/ExportData";
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}


const Insurance = () => {
    const [t, i18n] = useTranslation();
    const [ListData, setListData] = useState([]);
    const [users, setUsers] = useState([]);
    const [showAddModal, showSetAddModal] = useState(false);
    const [showEditModal, showSetEditModal] = useState(false);
    const [showDeleteModal, showSetDeleteModal] = useState(false);
    const [showIndemnity, setShowIndemnity] = useState(false);
    const [showExportData, setShowExportData] = useState(false);
    const [insuranceTypes, setInsuranceTypes] = useState([])

    const [cond, setCond] = useState(false);
    const [addCond, setAddCond] = useState(false);
    const [selected, setSelected] = useState({});

    const [widths, setWidth] = useState(getWindowDimensions());

    const [ lang, setLang ] = useState('en');

    useEffect(() => {
        axios.get(`users`, { headers: { Authorization: AccessToken() } }).then(res => {
            setUsers(res.data.data.filter(item => item.role === "user"));
        })
    }, [addCond])

    useEffect(() => {
        setLang(i18n.language);
        (async () => {
            try {
                const insTypes = await axios.get('insurances/insurance-types')
                setInsuranceTypes(insTypes.data.data)
            } catch { }
        })()

        function handleResize() {
            setWidth(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        void async function FetchData() {
            const Data = await axios.get(`insurances/insurance`);
            let final = [];
            if (Data.data.data.length !== 0) {
                Data.data.data.forEach(item => {
                    let obj = {};
                    users.forEach(elem => {
                        if (item.user_id === elem.id) {
                            obj['companyname'] = elem.companyname;
                            obj['companyregister'] = elem.companyregister;
                            final.push({ ...item, ...obj });
                        }
                    })
                    if (item.id === selected.id) {
                        setSelected(item);
                    }
                })
            }
            setListData(final);
        }();
    }, [cond, users])

    const selectRowHandle = (el) => {
        if (selected.id === el.id) {
            setSelected({});
        } else {
            setSelected(el);
        }
    }

    const EditHandle = () => {
        if (selected.id) {
            showSetEditModal(true);
        }
    }

    const DeleteHandle = () => {
        if (selected.id) {
            showSetDeleteModal(true);
        }
    }

    const HandleIndeminty = () => {
        if (selected.id) {
            setShowIndemnity(true);
        }
    }

    const ExportDataHandle = () => {
        if (selected.id) {
            setShowExportData(true);
        }
    }

    const handleChange = event => {
        setLang(event.target.value);
        i18n.changeLanguage(event.target.value);
    };

    const getInsuranceType = (id) => insuranceTypes.find(insType => insType.id === id)?.[i18n.language === 'en' ? 'description' : 'description_mon'] ?? ''

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

            {showAddModal ? <AddModal setAddCond={setAddCond} setCond={setCond} companyInfo={users} setModal={showSetAddModal} insuranceTypes={insuranceTypes} language={i18n.language} /> : null}
            {showEditModal ? <EditModal SD={selected} setAddCond={setAddCond} setCond={setCond} companyInfo={users} setModal={showSetEditModal} insuranceTypes={insuranceTypes} language={i18n.language} /> : null}
            {showDeleteModal ? <DeleteModal SD={selected} setCond={setCond} setModal={showSetDeleteModal} /> : null}
            {showIndemnity ? <Indemnity SD={selected} setCond={setCond} setModal={setShowIndemnity} /> : null}

            {showExportData ? <ExportData
                setModal={setShowExportData}
                set={true}
                // userId={selected?.user_id}
                SD={selected}
            /> : null}

            <Container scroll={true}>
                <div className="TitlePar">
                    <div className="Title">{t('title')}</div>
                    <LangSwitch>
                        {i18n.language==="en"?<div><img src="/us.png" /></div>:<div><img src="/mn.png" /></div>}
                        <select value={i18n.language} onChange={handleChange}>
                            <option value="en">English</option>
                            <option value="mn">Монгол</option>
                        </select>
                    </LangSwitch>
                </div>

                <div className="customTable T5">
                    <div className="headPar">
                        {/* <div className="title"></div> */}
                        <div onClick={() => showSetAddModal(true)} className="addBtn"><RiAddLine /><span>Нэмэх</span></div>
                        <div className={`additions ${selected.id ? `` : `opacity`}`}>
                            <div onClick={ExportDataHandle} className="addBtn"><RiAddLine /><span>Export Data</span></div>
                            <div onClick={HandleIndeminty} className="addBtn"><RiBillLine /><span>Нөхөн төлбөр</span></div>
                            <div onClick={EditHandle} className="addBtn"><RiEdit2Line /><span>Засах</span></div>
                            <div onClick={DeleteHandle} className="addBtn"><VscError /><span>Устгах</span></div>
                        </div>
                    </div>
                    <ScrollTable style={{ maxWidth: widths.width - 360, height: widths.height - 250 }}>
                        <table>
                            <tbody>
                                <tr className="tops">
                                    <td className="borderNone">Company information</td>
                                    <td></td>

                                    <td className="borderNone"></td>
                                    <td className="borderNone"></td>
                                    <td className="borderNone"></td>
                                    <td className="borderNone">Insurance policy information</td>
                                    <td className="borderNone"></td>
                                    <td className="borderNone"></td>
                                    <td className="borderNone"></td>
                                    <td className="borderNone"></td>
                                    <td></td>

                                    <td className="borderNone"></td>
                                    <td className="borderNone">Increase in export revenue</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>{t('Register number')}</th>
                                    <th>{t('Company name')}</th>
                                    <th>{t('Insurance type')}</th>
                                    <th>{t('Issued')}</th>
                                    <th>{t('Expiration')}</th>

                                    <th>{t('Sum insured')} (USD)</th>
                                    <th>{t('Sum insured')} (MNT)</th>
                                    <th>Premium (USD)</th>
                                    <th>Premium (MNT)</th>

                                    <th>{t('Indemnity')} (USD)</th>
                                    <th>{t('Indemnity')} (MNT)</th>

                                    <th>2016</th>
                                    <th>2021</th>
                                    <th>Amount</th>

                                    {/* <th >Үйлдэл</th> */}
                                </tr>
                                {ListData.map((el, ind) => {
                                    return (
                                        <tr onClick={() => selectRowHandle(el)} key={ind} className={`cusorItems ${selected.id === el.id ? `Selected` : ``}`}>
                                            <td>{el.companyregister}</td>
                                            <td>{el.companyname}</td>
                                            <td>{getInsuranceType(el.insurance_typeId)}</td>

                                            <td>{el.issued_date}</td>
                                            <td>{el.expiration_date}</td>

                                            <td className="right bold">{NumberComma(el.sum_insurance)} $</td>
                                            <td className="right">{NumberComma(el.sum_insurance_mnt)} ₮</td>

                                            <td className="right bold">{NumberComma(el.premium)} $</td>
                                            <td className="right">{NumberComma(el.premium_mnt)} ₮</td>

                                            <td className="right bold">{NumberComma(el.indemnities.reduce((curr, item) => item.amount + curr, 0))} $</td>
                                            <td className="right">{NumberComma(el.indemnities.reduce((curr, item) => item.amount_mnt + curr, 0))} ₮</td>

                                            <td className="right">{NumberComma(el.e2016)}</td>
                                            <td className="right">{NumberComma(el.e2021)}</td>
                                            <td className="right bold">{NumberComma(el.e2021 - el.e2016)} ₮</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="Ghost" />
                    </ScrollTable>
                </div>
            </Container>

        </motion.div>
    )
}

export default Insurance

const ScrollTable = styled.div`
    height:100%;
    width:100%;
    overflow:auto;
    --scrollbar-width: 8px;
    --mask-height: 32px;
    --mask-image-content: linear-gradient(
        to right,
        black,
        black var(--mask-height),
        black calc(100% - var(--mask-height)),
        transparent
    );
    --mask-size-content: calc(100% - var(--scrollbar-width)) 100%;
    --mask-image-scrollbar: linear-gradient(black, black);
    --mask-size-scrollbar: var(--scrollbar-width) 100%;
    mask-image: var(--mask-image-content), var(--mask-image-scrollbar);
    mask-size: var(--mask-size-content), var(--mask-size-scrollbar);
    mask-position: 100% 0, 0 0;
    mask-repeat: no-repeat, no-repeat;
    table{
        margin-right:100px !important;
        .tops{
            .borderNone{
                color:#000;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: visible;
                border-right-color: transparent !important;
            }
            
        }
    }
`

// export default (translate("translations")(Insurance))
// export default withTranslation()(Insurance);