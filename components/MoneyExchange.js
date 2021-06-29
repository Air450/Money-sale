import React, {useEffect, useState} from "react";
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
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { FontAwesome,Entypo } from "@expo/vector-icons";
//format currency
import NumberFormat from "react-number-format";


export default function MoneyExchange({navigation,route}) {
  const [currencyDetails, setCurrencyDetails] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsloading] = useState(false);

  useEffect(()=>{
    setIsloading(true);
    fetch('https://v6.exchangerate-api.com/v6/2e40287b73ef802c52bf51f6/latest/LAK')
    .then((res)=> res.json())
    .then(data => {
      setCurrencyDetails(data);
      setIsloading(false);
    }).catch((err)=> {
      console.log(err);
      setIsloading(false);
    })
  },[])


  const CVRate = currencyDetails ? currencyDetails['conversion_rates'] : null;
  const CVRateValue = CVRate ? Object.entries(CVRate) : null;


  const Country = CVRateValue ? CVRateValue.map((value, index)=> {
    let currency = value[0].slice(0,2).toLowerCase();
    return [...value,currency]
  }) : null;


  const filterCountry = Country
    ? Country.filter((item) => {
        return item[0] ? item[0].includes(searchText.toUpperCase()) : item[0];
      })
  : Country;

  // console.log(filterCountry);
  // console.log("Start",Countrykey)

  // console.log("Conversion Rate = ",CVRate);

  const renderItem = ({ item, index }) => (
    <TouchableWithoutFeedback key={item.key}>
      <View
        style={{
          backgroundColor: "#fffff016",
          marginBottom: 7,
          height: 65,
          borderRadius: 5,
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
          <View style={{ width: 70, height: 70}}>
            <Image
              source={{
                            uri: `https://www.countryflags.io/${item[2]}/flat/64.png`
                        }}
              style={{ width: "100%", height: "100%", borderRadius: 5 }}
              resizeMode="stretch"
            />
          </View>

          {/* currency and example */}
          <View style={{justifyContent: 'space-evenly', alignItems: 'flex-start', alignSelf: 'stretch', flex: 1,  paddingLeft: 5,paddingVertical:4}}>
              {/* Country title */}
              <Text style={styles.countryTitle}>{item[0]}</Text>

              {/* Currency title */}
                        {item[1] ? (
                      <NumberFormat
                        value={Math.round((10000*item[1]) * 100) / 100}
                        renderText={(value) => (
                          <Text style={styles.currencyTitle}>{value ? `10,000 LAK = ${value}`  : "N/A"}</Text>
                        )}
                        displayType={"text"}
                        
                        thousandSeparator={true}
                        suffix={` ${item[0]}`}
                      />
                    ) : (
                      <Text style={styles.currencyTitle}>N/A</Text>
                    )} 
          
          </View>
        </View>
        {/* Right part */}
        {/* Rate */}
        <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 5}}>
          <Text style={styles.rateTitle}>{item[1]}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.statusBar}></View>
        <View style={styles.container_container}>
          {/* header section */}
          <View style={styles.header}>
            <View style={styles.header_top}>
              <View style={{flexDirection: 'row'}}>
              <FontAwesome name="money" size={24} color={'#fff'} style={{marginRight: 5}}/>   
              <Text style={{ color: "#fff", fontFamily: "Defago-Bold" }}>
              ອັດຕາແລກປ່ຽນເງິນ 
              </Text>
              </View>
              <TouchableOpacity onPress={()=>navigation.navigate('About')}  >
                <Entypo name="info-with-circle" size={27} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* content section */}
          <View style={styles.content}>
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

              <View style={styles.header_bottom}>
                  <Text style={{ color: "#fff", fontFamily: "Defago-Bold" }}>
                    ປະເທດ-ສະກຸນເງິນ
                  </Text>
                  <Text style={{ color: "#fff", fontFamily: "Defago-Bold" }}>
                    Rate
                  </Text>
              </View>
                  
                  {/* List */}
                  { isLoading ? 
                    <ActivityIndicator size="large" color="#1db57c" style={{marginTop: 20}}/>
                  :
                  <FlatList data={filterCountry} renderItem={renderItem} showsVerticalScrollIndicator={false} keyExtractor={(item,index)=>  index} />
                  }


          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}


// export default function MoneyExchange() {

//   return (
//     <View style={styles.container}><Text>Fuck</Text></View>
//   )

//  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2D2D2D",
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
    paddingHorizontal: 7,
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
    paddingHorizontal: 7,
    marginTop: 10,
    marginBottom: 7,
    marginTop: 5,
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
  countryTitle: {color: '#fff',fontFamily: 'Defago-Bold',fontSize: 14},
  currencyTitle: {color: '#fff',fontFamily: 'Defago-Bold',fontSize: 12},
  rateTitle: {color: '#1DB57C',fontFamily: 'Defago-Bold',fontSize: 15}
});
