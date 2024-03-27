import React, {useState, useEffect} from 'react';
import {ScrollView, Image, Text, TextInput, View} from 'react-native';
import Header from '@components/common/Header/Header';
import Button from '@components/common/Button/Button';
import styles from './Referral.Styles';
import IMAGES from '@assets/images';
import CustomPopUp from '@components/common/PopUp/CustomPopUp';
import {
  useLazyReferralListQuery,
  useAddReferralMutation,
} from '@redux/services/authService';
import {useSelector} from 'react-redux';

const Referral = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState(false);
  const [referrals, setReferrals] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const id = useSelector(state => state.auth.user?.result?._id);
  console.log('ID===>', id);
  const [addReferral] = useAddReferralMutation();

  const params = {
    user_mandate: id,
    name,
    email,
    phone,
  };

  const handleSubmitPress = async () => {
    console.log('DATA', params);
    try {
      const response = await addReferral(params).unwrap();
      console.log('RESPONSE===>', response);
      if (response.status) {
        console.log('Referral Successfull===>', response.message);
        fetchReferrals();
        setName('');
        setEmail('');
        setPhone('');
        setModalVisible(false);
      } else {
        console.log('Error', response.message);
      }
    } catch (error) {
      console.error('Error adding referral:', error);
      console.log('Error', 'Failed to add referral');
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const [data] = useLazyReferralListQuery();

  const fetchReferrals = async () => {
    try {
      const response = await data(id);
      console.log('REPONSE.DATA===>', response);
      const referral = response.data.result;
      setReferrals(referral);
    } catch (err) {
      console.log('Error fetching referrals:', err);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <Header drawer={false} back={true} />
      <ScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.heading}>
            Refer someone whom you think can be part of CAN
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              placeholderTextColor="#000000"
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#000000"
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Phone"
              placeholderTextColor="#000000"
              onChangeText={text => setPhone(text)}
            />
          </View>
          <Button buttonName="Submit" onPress={handleSubmitPress} />
          <CustomPopUp
            noTitle={title}
            visible={modalVisible}
            onPress={handleCloseModal}
            buttonText="Continue"
            text="Thanks for taking interest in participating in our referral program. We would love to help you:)"
          />
          <Text style={styles.referralText}> My Referrals</Text>
          <View style={styles.referralContainer}>
            {referrals.map((item, index) => (
              <View key={index} style={styles.referralItem}>
                <View style={styles.referralRow}>
                  <Text style={styles.name}>{item.name}</Text>
                  <View style={styles.iconRow}>
                    <Image source={IMAGES.calendar} />
                    <Text style={styles.referralData}>
                      {formatDate(item.updatedAt)}
                    </Text>
                  </View>
                </View>
                <View style={styles.referralRow}>
                  <View style={styles.iconRow}>
                    <Image source={IMAGES.email} />
                    <Text style={styles.referralData}>{item.email}</Text>
                  </View>
                  <View style={styles.iconRow}>
                    <Image source={IMAGES.call} />
                    <Text style={styles.referralData}>{item.phone}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Referral;
