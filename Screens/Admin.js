import React, {useState} from 'react';
import {View, Text, Image, TextInput, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const Admin = () => {
  const [Img, setImg] = useState(null);
  const [Vid, setVid] = useState(null);
  const [Percentage, setPercentage] = useState(0);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');

  const UploadImg = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    }).then(async image => {
      console.log(image);

      let imgName = image.path.substring(image.path.lastIndexOf('/') + 1);
      //   console.log(imgName);

      let ext = imgName.split('.').pop();
      let name = imgName.split('.')[0];
      console.log(ext, name);

      let newname = name + Date.now() + '.' + ext;

      const reference = storage().ref('images/' + newname);

      try {
        const task = reference.putFile(image.path);
        task.on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
          setPercentage(
            Math.round(
              (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
            ),
          );
        });

        task.then(async () => {
          const url = await storage()
            .ref('images/' + newname)
            .getDownloadURL();
          console.log(url);
          setImg(url);

          alert('Image uploaded to the bucket!');
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const UploadVid = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    }).then(async image => {
      console.log(image);

      let imgName = image.path.substring(image.path.lastIndexOf('/') + 1);
      //   console.log(imgName);

      let ext = imgName.split('.').pop();
      let name = imgName.split('.')[0];
      console.log(ext, name);

      let newname = name + Date.now() + '.' + ext;

      const reference = storage().ref('videos/' + newname);

      try {
        const task = reference.putFile(image.path);
        task.on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
          setPercentage(
            Math.round(
              (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
            ),
          );
        });

        task.then(async () => {
          const url = await storage()
            .ref('videos/' + newname)
            .getDownloadURL();
          console.log(url);
          setVid(url);

          alert('Video uploaded to the bucket!');
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const UploadData = async () => {
    console.log(title);
    console.log(category);
    console.log(year);
    console.log(description);
    console.log(type);
    if (!title || !category || !year || !description || !type) {
      return Snackbar.show({
        text: 'Please Enter All Details',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    const id = uuid.v4();
    firestore()
      .collection('MoviesData')
      .add({
        id: id,
        title: title,
        category: category,
        year: year,
        description: description,
        type: type,
        image: Img,
        video: Vid,
      })
      .then(() => {
        console.log('Post Added !');
        setImg(null)
      setVid(null)
      setTitle(null)
      setCategory(null)
      setYear(null)
      setDescription(null)
      setType(null)

      })
      .catch(error => {
        console.log(error);
      });
      
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Text
        style={{
          color: 'tomato',
          alignSelf: 'center',
          fontSize: 25,
          fontWeight: 'bold',
        }}>
        Admin Panel
      </Text>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => UploadImg()} style={styles.btn}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            Upload Image
          </Text>
        </TouchableOpacity>
        {Percentage != 0 ? (
          <Text style={{alignSelf: 'center', color: 'white'}}>
            {Percentage} % Uploaded
          </Text>
        ) : null}
        <TouchableOpacity onPress={() => UploadVid()} style={styles.btn}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            Upload Video
          </Text>
        </TouchableOpacity>
        <View style={{width: '100%'}}>
          <TextInput
            placeholder="Title"
            style={styles.textinput}
            placeholderTextColor="#fff"
            onChangeText={title => setTitle(title)}
            value={title}
          />
          <TextInput
            placeholder="Category, Like- Action/Comedy"
            style={styles.textinput}
            placeholderTextColor="#fff"
            onChangeText={category => setCategory(category)}
            value={category}
          />
          <TextInput
            placeholder="Year of Release"
            style={styles.textinput}
            placeholderTextColor="#fff"
            keyboardType="number-pad"
            onChangeText={year => setYear(year)}
            value={year}
          />
          <TextInput
            placeholder="Description"
            multiline={true}
            numberOfLines={2}
            style={[styles.textinput, {height: 100}]}
            placeholderTextColor="#fff"
            onChangeText={desc => setDescription(desc)}
            value={description}
          />
          <TextInput
            placeholder="Type"
            style={styles.textinput}
            placeholderTextColor="#fff"
            onChangeText={type => setType(type)}
            value={type}
          />
        </View>

        <TouchableOpacity
          style={[styles.btn, {backgroundColor: 'teal', width: 200}]}
          onPress={() => UploadData()}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            Add Record
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Admin;
const styles = StyleSheet.create({
  textinput: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    height: 40,
    borderWidth: 2,
    borderColor: 'white',
    color: 'white',
    paddingLeft: 20,
    borderRadius: 8,
  },
  btn: {
    height: 30,
    width: 150,
    backgroundColor: 'tomato',
    margin: 15,
    borderRadius: 5,
  },
});
