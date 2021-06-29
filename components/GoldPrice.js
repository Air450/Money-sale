import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesome,Entypo,MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from "../App";
//import logbox for ignore warning
import { LogBox } from "react-native";
//format currency
import NumberFormat from "react-number-format";

export default function GoldPrice({navigation}) {
  const [allGoldData, setAllGoldData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    db.collection("goldPrice")
      .get()
      .then((result) => result.docs)
      .then((docs) =>
        docs.map((item) => {
          const data = item.data();
          return {
            key: item.id,
            type: data.type,
            origin: data.origin,
            buy: data.buy,
            sell: data.sell,
          };
        })
      )
      .then((docs) => {
        setAllGoldData(docs);
        setIsloading(false);
      });
  }, []);

  // console.log(allGoldData);

  const typeNinetySix = allGoldData
    ? allGoldData.filter((item) => {
        return item.type === "96.5%";
      })
    : null;

  const typeNinetyNine = allGoldData
    ? allGoldData.filter((item) => {
        return item.type === "99.5%";
      })
    : null;

  const renderItem = ({ item, index }) => (
    <TouchableWithoutFeedback key={item.key}>
      <View
        style={{
          height: 40,
          backgroundColor: "#626262",
          marginBottom: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 7,
          borderRadius: 5,
        }}
      >
        {/* origin  */}
        <Text style={styles.text}>{item.origin ? item.origin : "-"}</Text>
        {/* buy price */}
        {item.buy ? (
          <NumberFormat
            value={item.buy}
            renderText={(value) => (
              <Text style={[styles.text, { textAlign: "center" }]}>
                {value ? value : "-"}
              </Text>
            )}
            displayType={"text"}
            thousandSeparator={true}
          />
        ) : (
          <Text style={[styles.text, { textAlign: "center" }]}>-</Text>
        )}

        {/* sell price */}
        {item.sell ? (
          <NumberFormat
            value={item.sell}
            renderText={(value) => (
              <Text style={[styles.text, { textAlign: "right" }]}>
                {value ? value : "-"}
              </Text>
            )}
            displayType={"text"}
            thousandSeparator={true}
          />
        ) : (
          <Text style={[styles.text, { textAlign: "right" }]}>-</Text>
        )}
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
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons name="gold"
                size={20}
                color={"#fff"}
                style={{ marginRight: 5 }}
              />
              <Text style={{ color: "#fff", fontFamily: "Defago-Bold" }}>
                ລາຄາຄຳ
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("About")}>
              <Entypo name="info-with-circle" size={27} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        {/* heading section */}
        <View style={styles.heading}>
          <Text style={styles.heading_text}>ທອງຄຳ 96.5%</Text>
          <Text style={styles.heading_text}>ຮັບຊື້(ບາດ)</Text>
          <Text style={styles.heading_text}>ຂາຍອອກ(ບາດ)</Text>
        </View>

        {/* content section */}
        <View style={styles.content_container}>
          <View style={styles.content}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#1db57c" style={{marginTop: 20}}/>
            ) : (
              <FlatList
                data={typeNinetySix}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>
          <View style={[styles.heading, { marginTop: 0 }]}>
            <Text style={styles.heading_text}>ທອງຄຳ 99.5%</Text>
            <Text style={styles.heading_text}>ຮັບຊື້(ບາດ)</Text>
            <Text style={styles.heading_text}>ຂາຍອອກ(ບາດ)</Text>
          </View>
          <View style={styles.content}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#1db57c" style={{marginTop: 20}}/>
            ) : (
              <FlatList
                data={typeNinetyNine}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>
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
  heading: {
    borderRadius: 3,
    height: 40,
    margin: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 7,
  },
  content_container: {
    flex: 1,
  },
  heading_text: {
    fontFamily: "Defago-Bold",
    color: "#1db57c",
  },
  text: {
    flex: 1,
    justifyContent: "center",
    fontFamily: "Defago-Bold",
    color: "#fff",
    fontSize: 13,
  },
});
