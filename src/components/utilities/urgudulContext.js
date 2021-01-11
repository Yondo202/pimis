
import React, { createContext, useState } from 'react'


const UrgudulContext = createContext()

const year = new Date().getFullYear()
export const years = [year, year + 1, year + 2]

export const initialState = {
    project_type: '',
    ognoo: '',
    id: '',
    changed31: false,
    changed32: false,
    changed33: false,
    changed34: false,

    //enterprise_info
    companies: [
        {
            cname: '',
            contactname: '',
            contact_position: '',
            postal_address: '',
            address_detail: '',
            phone1: '',
            phone2: '',
            phone3: '',
            handphone: '',
            c_email: '',
            social_info: '',
            legal_state: '',
            state_registerno: '',
            registerno: '',
            registered_date: '',
            empcount: '',
            workman: '',
            not_workman: '',
            pernament_empcount: '',
            temp_empcount: '',
            women_owned: '',
            business_sectorid: '',
            locationid: '',
            foreign_invested: '',
            invested_countryid: null,
            invest_percent: null,
            tax_payment: '',
            head_company: '',
        },
    ],

    //project_intro
    project_name: '',
    business_sectorid: '',
    primary_activity: '',
    ppsProducts: [],
    project_intro: '',
    start_plan: '',
    project_start: '',
    project_end: '',

    //project_budget
    totalbudget: '',

    //3.1
    applicationDetail1s: [
        {
            activity: '',
            cost: '',
            byedp: '',
            reason: '',
            sales_years: '',
            costs_included: '',
            unincluded_reason: '',
        },
    ],
    external_info: '',
    other_info: '',

    //3.2
    applicationDetail2s: {
        support: {
            amount: '',
            comment: '',
        },
        self: {
            amount: '',
            comment: '',
        },
        other: {
            amount: '',
            comment: '',
        },
    },

    //3.3
    up_sale_5y: '',
    new_hire_5y: '',
    for_product_range: '',
    for_export: '',
    applicationDetail31s: {
        net_sales: {
            [years[0]]: '',
            [years[1]]: '',
            [years[2]]: '',
        },
        domestic_sales: {
            [years[0]]: '',
            [years[1]]: '',
            [years[2]]: '',
        },
        foreign_sales: {
            [years[0]]: '',
            [years[1]]: '',
            [years[2]]: '',
        },
    },
    applicationDetail32s: [
        {
            product: '',
            percentage: '',
        },
    ],
    market_def: '',
    target_market: '',
    main_competitor: '',

    //3.4
    applicationDetail4s: {
        strength_swot: [
            { description: '' },
        ],
        weakness_swot: [
            { description: '' },
        ],
        opportunity_swot: [
            { description: '' },
        ],
        threat_swot: [
            { description: '' },
        ],
    },

    //applicant_agreement
    implementation: '',
    documentation: '',
    not_subsidiary: '',
    head_company: '',
    subsidiaries: {
        id1: '',
        id2: '',
        id3: '',
    },
    transparency: '',
    decision: '',
    name: '',
    date: '',
    signature: '',
}

export const UrgudulStore = (props) => {
    const [data, setData] = useState({ ...initialState, companies: [] })

    return (
        <UrgudulContext.Provider value={{ data, setData }}>
            {props.children}
        </UrgudulContext.Provider>
    )
}

export default UrgudulContext
