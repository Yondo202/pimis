import React from 'react';
import styled from 'styled-components'
import {BsCheckAll} from 'react-icons/bs'
import {RiRegisteredLine} from 'react-icons/ri'
import {ColorRgb} from '../theme'

function User() {
    return (
        <Component3 >
            <div className="formOneParent">
                <div className="headerPar"  >Та аж ахуйн нэр болон регистерийн дугаараа оруулан бидэнд илгээнэ үү!<span className="tseg">*</span></div>
                <div className="inputPar">
                      <div className="compname">
                        <div className="flex">
                          <div className="icon"><BsCheckAll /></div>
                              <div className="form__group">
                                <div className="inpPar"> 
                                  <input type="input" className="userInp form__field" placeholder="Аж ахуйн нэр" name="compname" required />
                                  <label for="name" className="form__label">Аж ахуйн нэр</label>
                                </div>
                              </div>
                        </div>
                      </div>
                      
                      <div className="compname">
                        <div className="flex">
                          <div className="icon"><RiRegisteredLine/></div>
                            <div className="form__group">
                                <input type="input" className="userInp form__field" placeholder="Регистерийн дугаар" name="registernum" required />
                                <label for="name" className="form__label">Регистерийн дугаар</label>
                              </div>
                      </div>
                            
                    </div>
                </div>
            </div>
        </Component3>
    )
}

export default User

const Component3 = styled.div`
    font-size: 18px;
    font-family: "Roboto", "Sans-serif";
    .formOneParent{
      background-color:white;
      border-radius:8px;
      margin-bottom:16px;
      padding:24px 26px;
      .headerPar{
        padding-bottom:6px;
        font-size:1.1rem;
        border-bottom:1px solid rgba(63, 81, 181,0.5);
        color:black;
        .tseg{
          color:red;
        }
      }
      .inputPar{
         display:flex;
         flex-direction:row;
         align-items:center;
         justify-content:space-evenly;
        .compname{
            display:flex;
            flex-direction:column;
            width:42%;
            .flex{
              display:flex;
              flex-direction:row;
              align-items:flex-end;
              justify-content:center;
              .icon{
                margin-right:14px;
                svg{
                  color:rgba(${ColorRgb},0.7) !important;
                  font-size:28px;
                }
              }
              .form__group{
                position:relative;
                padding: 15px 0 0;
                margin-top: 10px;
                width: 100%;
                   .form__field{
                       font-family: inherit;
                       width: 100%;
                       border: 0;
                       border-bottom: 1px solid gray;
                       outline: 0;
                       font-size: 1.2rem;
                       color: black;
                       padding: 7px 0;
                       background: transparent;
                       transition: border-color 0.2s;
                       position: relative;
                       z-index: 1;
                       &::placeholder {
                         color: transparent;
                       }
                       &:placeholder-shown ~ .form__label {
                         font-size: 1.3rem;
                         cursor: text;
                         top: 24px;
                       }
                   }
                  
                   .form__label {
                       position: absolute;
                       top: 0;
                       display: block;
                       transition: 0.2s;
                       font-size: 1rem;
                       color: gray;
                       z-index: 0;
                     }
                     
                     .form__field{
                         &:focus {
                           ~ .form__label {
                             position: absolute;
                             top: 0;
                             display: block;
                             transition: 0.2s;
                             font-size: 0.8rem;
                             color: #11998e;
                             font-weight:400;
                           }
                           padding-bottom: 7px;
                           font-weight: 400;
                           border-width: 2px;
                           border-image: linear-gradient(to right, #11998e, #38ef7d);
                           border-image-slice: 1;
                         }
                     }
                     /* reset input */
                     .form__field{
                       &:required,&:invalid { box-shadow:none; }
                     }
               }
          }
        }

      }
    }
    @media only screen and (max-width:786px){
        .formOneParent{
            .inputPar{
            flex-direction:column;
                .compname{
                    display:flex;
                    flex-direction:column;
                    width:100%;
                  }
                  .registernum{
                    display:flex;
                    flex-direction:column;
                    width:100%;
                  }
            }
            
        }
    }
   
`