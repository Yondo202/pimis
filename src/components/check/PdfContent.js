import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font ,Image } from '@react-pdf/renderer';
import Gif from '../../image/edp_logo.png'

Font.register({ family: "Roboto",fonts:
    [
        { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf" },
        { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf" }
    ]
});

const styles = StyleSheet.create({
    page: {
      padding:"60px 40px",
      flexDirection: 'column',
      backgroundColor: '#fff',
      fontSize:10,
      fontFamily: "Roboto",
      position:'relative',
    },
    headTitle:{
        fontSize:11,
        textAlign:`center`,
        marginBottom:20,
        fontWeight:"medium"
    },
    tableRow:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
        border:0.5,
        borderColor:'#000',
        borderTop:'none',
    },
    borderTop:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
        border:0.5,
        borderColor:'#000',
    },
    textDesc: {
        fontSize:9,
        padding:'5px 10px',
        width:"80%",
        borderRight:0.5,
        borderColor:'#000',
    },
    textAnswer: {
        textAlign:'center',
        width:"20%",
    },
    headerStyle:{
        width:'100%',
        padding:'6px 0px' ,
        color:'#708090',
        position:'absolute',
        left:40,
        top: 0,
        borderBottom:1,
        borderColor:'#C0C0C0',
        display:`flex`,
        flexDirection:'row',
        alignItems:'center'
    },
    footerStyle:{
        width:'100%',
        color:'#708090',
        position:'absolute',
        padding:'6px 0px',
        left:40,
        bottom: 0,
        // textAlign:'center',
        borderTop:1,
        borderColor:'#C0C0C0'
    },
    headImg:{
        width:36,
        marginRight:15
    }
});

  // Create Document Component
  const MyDocument = ({wait, data}) => {

      return(
        <Document title="testtttttttttt.pdf" >
            {wait?
            <>
                <Page size="A4" style={styles.page}>
                    <View style={styles.headerStyle}>
                        <Image style={styles.headImg} src={Gif} />
                        <Text  fixed>?????????????????? ???????????? ??????????</Text>
                    </View>

                    <View style={styles.headTitle}>
                        <Text >???????????????? 1. ?????????????? ?????????????????? ???????????? ????????????</Text> 
                    </View>
                        <View style={[styles.borderTop, { backgroundColor:'#D3D3D3' }] }>
                            <Text style={[styles.textDesc, { fontWeight: 'medium', textAlign:'center' }]}>????????????????????</Text>
                            <Text style={styles.textAnswer}>??????????</Text>
                        </View>
                        {data.slice(0,3).map((el,i)=>{
                            return(
                                <>
                                    <View style={styles.tableRow}>
                                        <Text style={[styles.textDesc, {fontWeight: 'medium'}]} >{el.title}</Text> 
                                        <Text style={styles.textAnswer} >{el.value}</Text> 
                                    </View>
                                    {el.items.map(elem=>{
                                        return(
                                            <View style={styles.tableRow}>
                                                <Text style={styles.textDesc}>{elem.name}</Text> 
                                                <Text style={styles.textAnswer}>{elem.value?'????????': "????????"}</Text> 
                                            </View>
                                        )
                                     })}
                                </>
                            )
                        })}
                    <Text fixed style={[styles.footerStyle]} >1 / 2</Text>
                </Page> 
                <Page size="A4" type="portrait" style={styles.page}>
                    <View style={styles.headerStyle}>
                        <Image style={styles.headImg} src={Gif} />
                        <Text  fixed>?????????????????? ???????????? ??????????</Text>
                    </View>
                        <View style={[styles.borderTop, { backgroundColor:'#D3D3D3' }]}>
                            <Text style={[styles.textDesc, { fontWeight: 'medium', textAlign:'center' }]}>????????????????????</Text>
                            <Text style={styles.textAnswer}>??????????</Text>
                        </View>
                        {data.slice(3,5).map(el=>{
                            return(
                                <>
                                    <View style={styles.tableRow}>
                                        <Text style={[styles.textDesc, {fontWeight: 'medium'}]} >{el.title}</Text> 
                                        <Text style={styles.textAnswer} >{el.value}</Text> 
                                    </View>
                                    {el.items.map(elem=>{
                                    return(
                                        <View  style={styles.tableRow}>
                                            <Text style={styles.textDesc}>{elem.name}</Text> 
                                            <Text style={styles.textAnswer}>{elem.value?'????????': "????????"}</Text> 
                                        </View>
                                     )
                                    })}
                                </>
                            )
                        })}
                    <Text style={[styles.footerStyle]}>2 / 2</Text>
                </Page> 
           </>
           :<Page size="A4">
                <Text>Loading...</Text>
            </Page>}
        </Document>
    )
};

export default MyDocument


  