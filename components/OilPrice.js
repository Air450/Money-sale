import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome,Entypo,FontAwesome5 } from "@expo/vector-icons";
import { db } from "../App";
//import logbox for ignore warning
import { LogBox } from "react-native";
//format currency
import NumberFormat from "react-number-format";

//disable timer warning
LogBox.ignoreLogs(["Setting a timer"]);

export default function OilPrice({navigation}) {
  const [allOilData, setAllOilData] = useState([{}]);
  const [latestOilDate, setLatestOilDate] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setIsloading(true);
    db.collection("oilPrice")
      .get()
      .then((result) => result.docs)
      .then((docs) =>
        docs.map((item) => {
          const data = item.data();
          return {
            key: item.id,
            province: data.province,
            super: data.super,
            regular: data.regular,
            diesel: data.diesel,
          };
        })
      )
      .then((docs) => setAllOilData(docs));
  }, []);

  useEffect(() => {
    db.collection("latestOilPrice")
      .get()
      .then((result) => result.docs)
      .then((docs) =>
        docs.map((item) => {
          const data = item.data();
          return data.date;
        })
      )
      .then((docs) => {
        setLatestOilDate(docs);
        setIsloading(false);
      });
  }, []);

  const latestOilDateValue = latestOilDate ? latestOilDate[0] : null;
  // console.log(latestOilDateValue);

  // console.log(allOilData[0].province);

  const filterOilData = allOilData
  ? allOilData.filter((item) => {
      return item.province ? item.province.includes(searchText) : item;
    })
  : allOilData;


  // console.log(filterOilData)
  


  const renderItem = ({ item, index }) => (
    <TouchableWithoutFeedback>
      {/* Item container */}
      <View
        style={{
          backgroundColor: "#fffff016",
          marginBottom: 7,
          height: 45,
          borderRadius: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* Province part */}
        <View style={{ flex: 1.3, paddingLeft: 5 }}>
          <Text
            style={{
              color: "#1DB57C",
              fontFamily: "Defago-Bold",
              fontSize: 13,
            }}
          >
            {item.province ? item.province : "N/A"}
          </Text>
        </View>

        {/* Super price part */}
        <View style={{ flex: 1, alignItems: "center" }}>
          {item.super ? (
            <NumberFormat
              value={item.super}
              renderText={(value) => (
                <Text style={styles.currency}>{value ? value : "-"}</Text>
              )}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" ກີບ"}
            />
          ) : (
            <Text style={[styles.currency, { color: "#FFF" }]}>N/A</Text>
          )}
        </View>

        {/* Regular price part */}
        <View style={{ flex: 1, alignItems: "center" }}>
          {item.regular ? (
            <NumberFormat
              value={item.regular}
              renderText={(value) => (
                <Text style={[styles.currency, { color: "#ff4848" }]}>
                  {value ? value : "-"}
                </Text>
              )}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" ກີບ"}
            />
          ) : (
            <Text style={[styles.currency, { color: "#FFF" }]}>N/A</Text>
          )}
        </View>

        {/* Diesel price part */}
        <View style={{ flex: 1, alignItems: "center" }}>
          {item.diesel ? (
            <NumberFormat
              value={item.diesel}
              renderText={(value) => (
                <Text style={[styles.currency, { color: "#3895F2" }]}>
                  {value ? value : "-"}
                </Text>
              )}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" ກີບ"}
            />
          ) : (
            <Text style={[styles.currency, { color: "#FFF" }]}>N/A</Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}></View>
      <View style={styles.container_container}>
        {/* header section */}
        <View style={styles.header}>
            <View style={styles.header_top}>
              <View style={{flexDirection: 'row'}}>
              <FontAwesome5 name="oil-can" size={20} color={'#fff'} style={{marginRight: 5}}/>   
              <Text style={{ color: "#fff", fontFamily: "Defago-Bold" }}>
              ລາຄານ້ຳມັນ 
              </Text>
              </View>
              <TouchableOpacity onPress={()=>navigation.navigate('About')}  >
                <Entypo name="info-with-circle" size={27} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

        {/* content section */}
        <View style={styles.content}>
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

          <Text
            style={{
              fontSize: 10,
              fontFamily: "Defago-Bold",
              color: "#fff",
              marginTop: 3,
              marginLeft:5
            }}
          >
          <Ionicons name="time-outline" size={10} color="#fff" /> ອັບເດດລ່າສຸດ: {" "}
            {latestOilDateValue ? latestOilDateValue : "N/A"}
          </Text>

          <View style={styles.title_container}>
            {/* left part */}
            <View style={styles.header_left}>
              <Text style={styles.header_text}>ແຂວງ</Text>
            </View>
            {/* right part */}
            <View style={styles.header_right}>
              <View
                style={{
                  borderRadius: 3,
                  backgroundColor: "#ebc323",
                  flex: 1,
                  alignItems: "center",
                  marginRight: 3,
                  paddingHorizontal: 1,
                }}
              >
                <Text style={styles.header_text}>ແອັດຊັງພິເສດ</Text>
              </View>
              <View
                style={{
                  borderRadius: 3,
                  backgroundColor: "#E84545",
                  flex: 1,
                  alignItems: "center",
                  marginRight: 3,
                  paddingHorizontal: 1,
                }}
              >
                <Text style={styles.header_text}>ແອັດຊັງ</Text>
              </View>
              <View
                style={{
                  borderRadius: 3,
                  backgroundColor: "#3895F2",
                  flex: 1,
                  alignItems: "center",
                  paddingHorizontal: 1,
                }}
              >
                <Text style={styles.header_text}>ກາຊວນ</Text>
              </View>
            </View>
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="#1db57c" />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filterOilData}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
            />
          )}
        </View>
      </View>
    </View>
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
  title_container: {
    borderRadius: 3,
    height: 40,
    flexDirection: "row",
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
    height: 60,
    flex: 1,
    paddingHorizontal: 7,
  },
  header_left: {
    justifyContent: "center",
    paddingLeft: 5,
    flex: 1,
  },
  header_right: {
    flex: 2.2,
    paddingRight: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header_text: {
    fontFamily: "Defago-Bold",
    color: "#fff",
    fontSize: 13,
  },
  currency: {
    color: "#ffdc52",
    fontFamily: "Defago-Bold",
    fontSize: 13,
  },
});
