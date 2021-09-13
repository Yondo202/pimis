import { Document, Page, Text, View, StyleSheet, Font ,Image } from '@react-pdf/renderer';
import Gif from "image/edp_logo.png"
import Font1 from "components/misc/ReportFont/TimesRoman.ttf"
// import Font2 from "components/misc/ReportFont/TimesBold.ttf"

export const GlobalFont = Font.register({ family: "times new roman",
    fonts:
    [
        { format: "truetype", src: Font1 },
        // { format: "truetype", src: Font2 }
    ]
});

export const HeadImage  = Gif

const smSize = '8';
const bigSize = '9.5';

export const styles = StyleSheet.create({
    page: {
      color:"#000",
      padding:"50px 35px",
      flexDirection: 'column',
      backgroundColor: '#fff',
      fontSize:smSize,
      fontFamily: "times new roman",
      position:'relative',
    },
    headTitle:{
        display:'flex',
        textAlign:`center`,
        marginBottom:17,
        // fontWeight:"bold",
        fontSize:bigSize,
        flexDirection:"column",
    },
    headerStyle:{
        color:"#000",
        width:'100%',
        padding:'6px 0px' ,
        position:'absolute',
        left:40,
        top: 10,
        display:`flex`,
        flexDirection:'row',
        justifyContent:"flex-end"
    },
    tableParent:{
        display:'flex',
        width:'100%',
        borderColor:'#000',
        border: 0.5,
        flexDirection:'column',
    },
    tableHead:{
        backgroundColor:"#f2f3f7"
    },
    tableRow:{
        display:'flex',
        width:'100%',
        // borderColor:'#000',
        borderBottom: 0.5,
        flexDirection:'row',
    },
    tableCol:{
        // maxWidth:'200px',
        textAlign:'center',
        width:'5.2%',
        // border:'#000',
        padding:'4px 3px',
        borderRight:0.5
    },
    InfoParent:{
        display:'flex',
        flexDirection:'column',
        paddingTop:26
    },
    InfoRow:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:15
    },
    InfoCol:{
        paddingLeft:60,
    },
    SigImageStyle:{
        width:100,
        height:'auto',
        maxHeight:100,
        objectFit:'contain'
    }
   
});