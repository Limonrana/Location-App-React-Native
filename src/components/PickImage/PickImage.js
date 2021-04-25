import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Button, Image, View } from "react-native";

const PickImage = ({ image, setImage }) => {
  const handleImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        setImage(`data:image/jpg;base64,${result.base64}`);
      }
    } catch (error) {
      if (error) {
        alert("OPPS! There was a server side problem");
      }
    }
  };

  let getImage = null;
  if (image !== "") {
    getImage = (
      <Image source={{ uri: image }} style={{ width: "100%", height: 200 }} />
    );
  }
  return (
    <View>
      {getImage}
      <Button
        title="Upload Image"
        color="green"
        onPress={() => handleImage()}
      />
    </View>
  );
};

export default PickImage;
