import React,{useState,useEffect} from 'react';
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native'
import FieldInput from '../components/InputField';
import CheckBox from 'react-native-check-box';
import DropDownPicker from 'react-native-dropdown-picker';
 
const initOptions = [{
  label: 'User Name',
  placeholder: 'name@example.com'
},
{
  label: 'Password',
  placeholder: 'Required'
},
{
  label: 'Server Address',
  placeholder: 'example.com'
},
{
  label: 'Server Path',
  placeholder: '/calendars/user/'
}]

export default function TabLayout() {
  const [open, setOpen] = useState(false);
  const [options,setOptions] = useState(initOptions);
  const [value, setValue] = useState('advanced');
  const [items, setItems] = useState([
    {label: 'Advanced', value: 'advanced'},
    {label: 'Manual', value: 'manual'}
  ]);
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [serverAddress,setServerAddress] = useState('');
  const [serverPath,setServerPath] = useState('');
  const [port,setPort] = useState('');
  const [isSSL,setIsSSL] = useState(false);

  const changeInputValue = (value,label) => {
    if(label === 'User Name') {
      setUserName(value)
    } else if(label === 'Password') {
      setPassword(value)
    } else if(label === 'Server Address') {
      setServerAddress(value)
    } else if(label === 'Server Path') {
      setServerPath(value)
    } else if(label === 'Port') {
      setPort(value)
    } 
  }

  const onSubmit = () => {
    if(userName !== '' && userName.includes('@') &&
      password !== '' && password.length >= 10 &&
      serverAddress !== '' &&
      serverPath !== '' && /^\d+$/.test(port)) {
     const json = {
      value,
      userName,
      password,
      serverAddress,
      serverPath,
      port,
      isSSL
     }
     console.log('aaaa',json)
    } else {
      console.log('Inputs are wrong')
    }
  }

  useEffect(() => {
    if(value === 'advanced') {
      setOptions(initOptions)
    } else {
      setOptions(initOptions.filter((el) => el.label !== 'Server Path'))
    }
  },[value])

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.dropDownContainer}>
          <Text>Account Type:</Text>
          <DropDownPicker
          style={styles.dropDownStyle}
          containerStyle={[styles.dropDownContainerStyle, {height: open ? 100 : 25}]}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          />
        </View>
        {options.map((element) => <FieldInput label={element.label} placeholder={element.placeholder} onChange={changeInputValue}/>)}
        { value === 'advanced' ? <View style={styles.portContainer}>
        <FieldInput label='Port' width={40} onChange={changeInputValue}/>
        <CheckBox
          style={{}}
          onClick={()=>{setIsSSL((prev => !prev))}}
          isChecked={isSSL}
          c
          />
        <Text>Use SSL</Text>
        </View> : null}
      <TouchableOpacity 
        style={styles.submitButton}
        onPress={onSubmit}
      >
        <Text style={{color:'white'}}>Submit</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingHorizontal:20
  },
  innerContainer: {gap:10, alignItems:'flex-end'},
  dropDownContainer: {flexDirection:'row',gap:8,alignItems:'center'},
  dropDownStyle: {height:25,minHeight:10,borderRadius:0,minWidth:20,width:250,alignSelf:'flex-end'},
  dropDownContainerStyle: {margin:0,width:250,backgroundColor:'#fff'},
  portContainer: {flexDirection:'row',gap:10,alignItems:'center',alignSelf:'center',paddingRight:44},
  submitButton: {backgroundColor:'blue',padding:10,alignSelf:'center'}
})