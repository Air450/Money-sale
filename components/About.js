import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
const icon = require('../assets/ic_launcher.png');

export default function About() {
    return (
        <View style={styles.container}>
                <Image source={icon} style={{width: 100, height: 100}} resizeMode='contain'/>
                <Text style={[styles.title_text,{color: '#1db57c'}]}>Money Sale</Text>
                <Text style={[styles.paragraph_text,{color: '#ffffff'}]}>   ເປັນແອັບທີ່ຮວບຮວມຂໍ້ມູນຕ່າງໆບໍ່ວ່າຈະເປັນດ້ານການເງິນ ລວມໄປເຖີງຂໍ້ມູການແຜ່ລະບາດຂອງພະຍາດໂຄວິດ-19 ເພື່ອໃຫ້ຮູ້ທັນເຫດການສະພາບ ເສດຖະກິດບ້ານເມືອງ, ຄວາມຜັນພວນຂອງການຄ້າໂລກ ແລະ ໃນລາວ.</Text>
                <Text style={[styles.paragraph_text,{color: '#ffffff'}]}>    ເພື່ອຈະໄດ້ກຽມພ້ອມຮັບມື ຫຼື ມີການວ່າງແຜນຕ່າງໆໃນການດຳເນີນທຸລະກິດຂອງເຮົາ ເພື່ອໃຫ້ຊອດຄ່ອງ ກັບການດຳລົງຊິວີດ  ເພືອເຮົາຈະສາມາດປັບຕົວໃຫ້ເຂົ້າ ກັບສະຖານະການເວລານັ້ນໄດ້.</Text>
                <Text style={[styles.title_text,{color: '#1db57c'}]}>ສະມາຊິກໃນທີມ</Text>
               <View>
               <Text style={[styles.paragraph_text,{color: '#ffffff'}]}>ທ.ແອ ລໍບົວວັນ | ຫ້ອງ 2CW2</Text>
                <Text style={[styles.paragraph_text,{color: '#ffffff'}]}>ທ.ກໍລະກົດ ເພັດຊະວົງ | ຫ້ອງ 2CW2</Text>
                <Text style={[styles.paragraph_text,{color: '#ffffff'}]}>ທ.ຄອນສະຫວັນ ແສງເລກ | ຫ້ອງ 2CW2</Text>
               </View>
                
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 40,
      paddingTop: 20,
      flex: 1,
      backgroundColor: '#2D2D2D',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    title_text: {
      marginVertical: 5,
      fontFamily: 'Defago-Bold',
      fontSize: 16,
      color: '#fff'
    },
    paragraph_text: {
      fontFamily: 'Defago',
      fontSize: 15,
      color: '#fff'
    }
  });
  
