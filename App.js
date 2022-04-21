import React, { useState, useCallback } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground,
  TextInput,
  ActivityIndicator 
} from 'react-native';

import axios from 'axios';

export default function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const api = {
    key: '1a16d5c1e5b729817825e0e84d4fd220',
    baseUrl: 'http://api.openweathermap.org/data/2.5/',
  };

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput("");
    axios({
      method: 'get',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
    .then(res => {
      console.log(res.data);
      setData(res.data);
    })
    .catch(err => {
      console.dir(err);
    })
    .finally(() => {
      setLoading(false);
    });
  },[api.key, input]);

  return (
    <View style={styles.container}>
      
      <ImageBackground source={require('./assets/Background.png')} 
      resizeMode="cover"
      style={styles.image}>
        <View>
          <TextInput 
          placeholder="Enter the city name and return ... "
          onChangeText={text=>setInput(text)}
          value={input}
          placeholderTextColor={'#000'}
          style={styles.TextInput}
          onSubmitEditing={fetchDataHandler}
          />
        </View>
        {loading && (
        <View>
          <ActivityIndicator size={'large'} color={'#000'}/>
          </View>
        )}

        {data &&
        <View style={styles.infoView}>
        <Text style={styles.cityCountryText}>
          {`${data?.name}, ${data?.sys?.country}`}
          </Text>
          <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
          <Text style={styles.tempText}>{`${Math.round(
            data?.main?.temp
            )}°C`}</Text>
            <Text style={styles.minMaxText}>{`Lowest ${Math.round(
              data?.main?.temp_min
              )}°C / Highest ${Math.round(
                data?.main?.temp_max
                )}°C`}</Text>
          <Text style={styles.feelsLike}>
            {`Feels like ${Math.round(
              data?.main?.feels_like
              )}°C`}
          </Text>
          </View>}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    flex:1,
    flexDirection:'column',
  },
  TextInput:{
    borderBottomWidth:3,
    padding:5,
    paddingVertical:20,
    marginVertical:100,
    marginHorizontal:10,
    backgroundColor:'#fff',
    fontSize:19,
    borderRadius:11,
    borderBottomColor:'#E25D5D',
},
infoView:{
  alignItems:'center',
},
cityCountryText:{
color:'#fff',
fontSize:40,
fontWeight:'bold',
},
dateText:{
  color:'#fff',
  fontSize:20,
  marginVertical:10,
},
tempText:{
  color:'#fff',
  fontSize:60,
  fontWeight:'bold',
},
minMaxText:{
  color:'#fff',
  fontSize:20,
  marginVertical:10,
},
feelsLike:{
  color:'#fff',
  fontSize:16,
  marginVertical:10,
}

});
