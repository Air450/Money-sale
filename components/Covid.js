import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableNativeFeedback,
  Keyboard,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import {MaterialCommunityIcons,Ionicons,Entypo, FontAwesome,FontAwesome5 } from "@expo/vector-icons";
import NumberFormat from "react-number-format";
//import country code
import { CountryCode } from "./CountryCode";

const placeholder = require('../assets/placeholder.jpg')


export default function Covid({navigation}) {

  const [covidData, setCovidData] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiCovidData, setApiCovidData] = useState("");
 
  

  // useEffect(()=>{
  //   setIsLoading(true);

  //   fetch('https://api.covid19api.com/summary')
  //   .then((res)=> res.json())
  //   .then(data => {
  //     setCovidData(data);
  //     setIsLoading(false);
  //   })
  //   .catch((err)=> {
  //     console.log(err);
  //     setIsLoading(false);
  //   })
  // },[])
  
  // const getDate = covidData.Countries ? covidData.Countries.map((item)=> {
  //   let year = item.Date.slice(0,4);
  //   let month = item.Date.slice(5,7);
  //   let day = item.Date.slice(8,10);
  //   return `${day}/${month}/${year}`;
  // }) : null;



    var date = new Date().getDate()-2;
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    const getDate = year+'-'+month+'-'+date;
    const laFormatDate = date+'-'+month+'-'+year;
    
    // console.log(laFormatDate)//format: dd-mm-yyyy;

    
   
    useEffect(()=> {
      setIsLoading(true);
      fetch(`https://api.covid19tracking.narrativa.com/api/${getDate}`)
      .then(response => response.json())
      .then(data => {
        setApiCovidData(data);
        setIsLoading(false);
      }).catch((err)=> console.log(err));
    },[])

    const findObjKey =  apiCovidData ? Object.keys(apiCovidData.dates) : null;
    // console.log(findObjKey) ;
    

    const AllCountry = apiCovidData ? Object.values(apiCovidData.dates[`${findObjKey[0]}`].countries).map((country)=> {
      return country;
    }) : null;


    const AllWorld = apiCovidData ? Object.values(apiCovidData.total).map((total)=> {
      return total;
    }) : null;


    // console.log("All World",AllWorld);

    const filterApiCountry = apiCovidData
    ? AllCountry.filter((item) => {
        return item.name.includes(searchText);
      })
    : AllCountry;

    // console.log(filterApiCountry);



  // renderItem Mockup
  const renderItem = ({ item, index }) => (
    <TouchableWithoutFeedback key={index}>
      <View
        style={{

          borderBottomColor: "#1Db57C",
          borderBottomWidth: 1,
          height: 70,
          flexDirection: "row",
        }}
      >
        {/* left part */}
        <View
          style={{
            // backgroundColor: "#fffff847",
            flex: 1.6,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingLeft: 5,
          }}
        >
          {/* flag image */}
         <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
         <View style={{ width: 40, height: 38}}>
           <Image
              source={placeholder}
              style={{ position: 'absolute', top: 0, left: 2, width: "90%", height: "100%", borderRadius: 7 }}
              resizeMode="contain"
            />
            <Image
              source={{
                            uri: `https://www.countryflags.io/${CountryCode[item.name]}/flat/64.png`
                        }}
              style={{ width: "100%", height: "100%", borderRadius: 7 }}
              resizeMode="stretch"
            />

           


          </View>
          <Text numberOfLines={2} ellipsizeMode='tail' style={{paddingLeft: 1,color: '#fff',fontFamily: 'Defago-Bold',textAlign: 'left',fontSize: 9}}>{item.name}</Text>
         </View>

          {/* infected */}
          <View style={{justifyContent: 'space-between', alignItems: 'center', flex: 1.2, }}>
          {/* Confirm case */}
          <NumberFormat
              value={item.today_confirmed}
              renderText={(value) => (
                <Text style={{color: '#fff',fontFamily: 'Defago-Bold',fontSize: 12}}>{value}</Text>
              )}
              displayType={"text"}
              thousandSeparator={true}
            />

           {/* New Confirm case */}

           <NumberFormat
              value={item.today_new_confirmed}
              renderText={(value) => (
                <Text  style={{color: '#ffba26',fontFamily: 'Defago',fontSize: 12}}>+{value}</Text>
              )}
              displayType={"text"}
              thousandSeparator={true}
            />
             
          </View>

          {/* recovered */}
          <View style={{justifyContent: 'space-between', alignItems: 'center', flex: 1.2, }}>
         {/* Total Recovered */}

          <NumberFormat
              value={item.today_recovered}
              renderText={(value) => (
                <Text style={{color: '#fff',fontFamily: 'Defago-Bold',fontSize: 12}}>{value}</Text>
              )}
              displayType={"text"}
              thousandSeparator={true}
            />

            {/* New Recovered */}

            <NumberFormat
              value={item.today_new_recovered}
              renderText={(value) => (
                <Text  style={{color: '#1DB67C',fontFamily: 'Defago',fontSize: 12}}>+{value}</Text>
              )}
              displayType={"text"}
              thousandSeparator={true}
            />
          </View>

          {/* death */}
          <View style={{justifyContent: 'space-between', alignItems: 'center', flex: 1.2, }}>
              {/* Total death */}
              <NumberFormat
                  value={item.today_deaths}
                  renderText={(value) => (
                    <Text style={{color: '#fff',fontFamily: 'Defago-Bold',fontSize: 12}}>{value}</Text>
                  )}
                  displayType={"text"}
                  thousandSeparator={true}
                />
             
              {/* New death */}
              <NumberFormat
                  value={item.today_new_deaths}
                  renderText={(value) => (
                    <Text  style={{color: '#ff2626',fontFamily: 'Defago',fontSize: 12}}>+{value}</Text>
                  )}
                  displayType={"text"}
                  thousandSeparator={true}
                />
         
          </View>

         </View>
      </View>
    </TouchableWithoutFeedback>
  );



  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.statusBar}></View>
        <View style={styles.container_container}>
        <View style={styles.header}>
            <View style={styles.header_top}>
              <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons name="virus" size={20} color={'#fff'} style={{marginRight: 5}}/>   
              <Text style={{ color: "#fff", fontFamily: "Defago-Bold" }}>
              ສະພາບການໂຄວິດ-19
              </Text>
              </View>
              <TouchableOpacity onPress={()=>navigation.navigate('About')}  >
                <Entypo name="info-with-circle" size={27} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/**************** Content Section ***********************/}

        {/* text input search box section */}
        <View style={styles.textInput}>
                  <FontAwesome
                          name="search"
                          size={17}
                          color="#fff"
                          style={{marginLeft: 5,alignSelf: 'center' }}
                        />
                        <TextInput
                          style={{
                            alignSelf: 'center',
                            flex: 1,
                            fontSize: 15,
                            paddingLeft: 5,
                            color: "#fff",
                            fontFamily: "Defago",
                          }}
                          value={searchText}
                          onChangeText={(value) => setSearchText(value)}
                          selectionColor="#6b6b6b"
                          placeholder="ຄົ້ນຫາ"
                          placeholderTextColor="#ffffffcc"
                          maxLength={25}
                        />
                    </View>


          <Text style={{ marginLeft: 7,fontSize: 10,color: "#fff",fontFamily: "Defago-Bold"}}>
            <Ionicons name="time-outline" size={10} color="#fff" /> ອັບເດດລ່າສຸດ: {laFormatDate ? laFormatDate : 'N/A'}   
          </Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 10, alignContent: 'center'}}>
          {/* Global Infected */}
            <View style={{marginHorizontal: 10,flex: 1,backgroundColor: '#f8c314', borderRadius: 5, padding: 5, justifyContent: 'center'}}>
              <Text style={{color: "#000",fontFamily: 'Defago-Bold', fontSize: 13, textAlign: 'center'}}>ຜູ້ຕິດເຊື້ອທົ່ວໂລກ</Text>

              {/*********************** Total infected ***********************/}
              <NumberFormat
                  value={apiCovidData? AllWorld[6] : 0}
                  renderText={(value) => (
                    <Text style={styles.global_text}>{value}</Text>
                  )}
                  displayType={"text"}
                  thousandSeparator={true}
                />
            
              {/*********************** New infected ***********************/}

              <NumberFormat
                  value={apiCovidData ? AllWorld[8] : 0}
                  renderText={(value) => (
                    <Text style={styles.global_text}>+{value}</Text>
                  )}
                  displayType={"text"}
                  thousandSeparator={true}
                />
            
            </View>
            <View style={{marginHorizontal: 10,flex: 1,backgroundColor: '#1db57c',borderRadius: 5, padding: 5, justifyContent: 'center'}}>
              <Text style={{color: "#000",fontFamily: 'Defago-Bold', fontSize: 13, textAlign: 'center'}} >ຫາຍດີ</Text>
              {/* Total recovered */}
             <NumberFormat
                  value={apiCovidData ? AllWorld[13] : 0}
                  renderText={(value) => (
                    <Text style={styles.global_text}>{value}</Text>
                  )}
                  displayType={"text"}
                  thousandSeparator={true}
                />
            
              {/* New recovered */}

              <NumberFormat
                  value={apiCovidData ? AllWorld[11]: 0}
                  renderText={(value) => (
                    <Text style={styles.global_text}>+{value}</Text>
                  )}
                  displayType={"text"}
                  thousandSeparator={true}
                />
            </View>
            <View style={{marginHorizontal: 10,flex: 1,backgroundColor: '#ff301d',borderRadius: 5, padding: 5, justifyContent: 'center'}}>
              <Text style={{color: "#000",fontFamily: 'Defago-Bold', fontSize: 13, textAlign: 'center'}}>ເສຍຊີວິດ</Text>
             {/* Total death */}
             <NumberFormat
                  value={apiCovidData ? AllWorld[7] : 0}
                  renderText={(value) => (
                    <Text style={styles.global_text}>{value}</Text>
                  )}
                  displayType={"text"}
                  thousandSeparator={true}
                />
            
              {/* New death */}

              <NumberFormat
                  value={apiCovidData ? AllWorld[9]: 0}
                  renderText={(value) => (
                    <Text style={styles.global_text}>+{value}</Text>
                  )}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </View>

          </View>

          <View style={styles.header_bottom}>
              <Text style={{ color: "#fff",textAlign: 'left',flex: 1,fontFamily: "Defago-Bold" }}>
                ປະເທດ
              </Text>
              <Text style={{ color: "#fff",textAlign: 'center',borderLeftWidth: 1, borderLeftColor: '#fff',flex: 1.2,fontFamily: "Defago-Bold" }}>
                ຜູ້ຕິດເຊື້ອ
              </Text>
              <Text style={{ color: "#fff",textAlign: 'center',borderLeftWidth: 1, borderLeftColor: '#fff',flex: 1.2,fontFamily: "Defago-Bold" }}>
                ຫາຍດີ
              </Text>
              <Text style={{ color: "#fff",textAlign: 'right',borderLeftWidth: 1, borderLeftColor: '#fff',flex: 1.2,fontFamily: "Defago-Bold" }}>
                ເສຍຊີວິດ
              </Text>
            </View>

          {/* content section */}
          <View style={styles.content}>
                  {isLoading ?  <ActivityIndicator size="large" color="#1db57c" style={{marginTop: 20}} />
                    : <FlatList data={apiCovidData && filterApiCountry ?  filterApiCountry : 0} renderItem={renderItem} showsVerticalScrollIndicator={false} keyExtractor={(item,index)=> index} />}
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  container_container: {
    flex: 1,
    backgroundColor: "#2D2D2D",
    alignItems: "stretch",
    justifyContent: "center",
  },
  statusBar: {
    backgroundColor: "#1DB57C",
    height: 25,
    width: "100%",
  },
  header: {
    paddingHorizontal: 5,
    backgroundColor: "#1DB57C",
    height: 60,
  },
  header_top: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 7,
  },
  header_bottom: {
    marginHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    paddingHorizontal: 5,
    backgroundColor: '#1db57c',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    backgroundColor: "#2e2e2e28",
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 8,
    height: 40,
    margin: 5,
    marginTop:10,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    paddingHorizontal: 7,
  },
  global_text: {fontFamily: 'Defago-Bold', fontSize: 13, textAlign: 'center'}
});
