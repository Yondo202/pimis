import styled from "styled-components"

export const Container = styled.div`
    max-width:1222px;
    width:100%;
    .Bla2{
        font-weight:600 !important;
    }
    .ChartParent{
        margin-top:15px;
        width:100%;
        background-color:white;
        text-align:center;
        padding:30px 10px;
    }
    .dx-visibility-change-handler{
        &:last-child{
            box-shadow:1px 1px 10px -6px;
        }
        .dx-datagrid{
            
                td{
                    /* text-align: left !important; */
                    border-right:1px solid #ababab;
                    &:last-child{
                        border-right:none;
                    }
                }
            .dx-datagrid-total-footer{
                td{
                    border-right:none;
                }
            }
        }
    }
`