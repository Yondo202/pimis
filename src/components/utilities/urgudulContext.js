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

const initialTemp = {
    id: 3,
}

export const UrgudulStore = (props) => {
    // const [data, setData] = useState({ ...initialState, companies: [] })
    const [data, setData] = useState(initialTemp)

    return (
        <UrgudulContext.Provider value={{ data, setData }}>
            {props.children}
        </UrgudulContext.Provider>
    )
}

export default UrgudulContext

// const ctx = {
//     project_type: '',
//     compnay_name: '',
//     project_name: '',

//     //Экспортыг дэмжих төслөөс олгоно
//     project_number: '',

//     //A Urgudul gargach - Applicant
//     //A-1
//     company_name: '',
//     representative_name: '',
//     representative_position: '',
//     registered_date: '',
//     registration_number: '',
//     official_address: '',
//     telephone: '',
//     handphone: '',
//     email: '',
//     website: '',
//     company_size: '',
//     project_plan: '',

//     //A-2-1
//     clusters: [
//         {
//             company_name: '',
//             representative_name: '',
//             company_size: '',
//             support_recipient: '',
//             project_contribution: '',
//         },
//     ],

//     //A-2-2
//     directors: [
//         {
//             position: '',
//             director_name: '',
//             employed_date: '',
//             project_contribution: '',
//         },
//     ],

//     //A-3
//     applicant_overview: '',

//     //A-4
//     applicant_experience: '',

//     //B Tusliin zadargaa - Project breakdown
//     //B-1
//     project_duration: '',

//     //B-2
//     project_introduction: '',

//     //B-3
//     preperation: '',

//     //B-4
//     identified_problems: '',

//     //B-5
//     suggested_solutions: '',

//     //B-6
//     planned_activities: [
//         {
//             activity: '',
//             ////
//         },
//     ],

//     //B-7
//     project_benefits: {
//         sales_growth: '',
//         export_growth: '',
//         profit_growth: '',
//         efficiency_growth: '',
//         explanation_growth: '',
//         assumptions: '',
//     },

//     //B-8
//     project_calculations: {
//         export: {
//             year2: '',
//             year1: '',
//             year: '',
//             project_endDate: '',
//             year1_: '',
//             year2_: '',
//             year3_: '',
//         },
//         fullTime_workplace: {
//             year2: '',
//             year1: '',
//             year: '',
//             project_endDate: '',
//             year1_: '',
//             year2_: '',
//             year3_: '',
//         },
//         sales: {
//             year2: '',
//             year1: '',
//             year: '',
//             project_endDate: '',
//             year1_: '',
//             year2_: '',
//             year3_: '',
//         },
//         productivity: {
//             year2: '',
//             year1: '',
//             year: '',
//             project_endDate: '',
//             year1_: '',
//             year2_: '',
//             year3_: '',
//         },
//     },

//     //C Төсөөлж буй төсөв – Төлөвлөсөн үйл ажиллагаа бүрээр (B6 хэсгээс авав)
//     expected_budget: [
//         {
//             activity: '',
//             budget_cost: '',
//             edp_funding: '',
//             applicant_contribution: '',
//         },
//     ],

//     //D Medegdel - Notice
//     parties: [
//         {
//             compnay_name: '',
//             representative_position: '',
//             representative_name: '',
//             representative_signature: '',
//             date: '',
//         },
//     ],

//     //E Shalgah - Checklist
//     checklist: {
//         format: false,
//         dollar: false,
//         nine_months: false,
//         max_amount: false,
//         self_fund: false,
//         signed: false,
//     },
// }
