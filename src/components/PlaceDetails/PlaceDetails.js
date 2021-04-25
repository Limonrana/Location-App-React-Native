import React from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
  btnGroup: {
    padding: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalBtnRemove: {
    backgroundColor: "red",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 40,
    paddingRight: 40,
  },
  modalBtnClose: {
    backgroundColor: "black",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 40,
    paddingRight: 40,
  },
});

const PlaceDetails = ({ place, handleHideModal, handleDeteteItem }) => (
  <Modal>
    <View>
      <Image
        source={{ uri: place.image }}
        style={{ width: "100%", height: 300 }}
      />
      <Text style={{ margin: 15, textAlign: "center", fontSize: 40 }}>
        {place.value}
      </Text>
      <View style={styles.btnGroup}>
        <TouchableOpacity
          onPress={() => {
            handleDeteteItem(place.id);
          }}
          style={styles.modalBtnRemove}
        >
          <View style={styles.btnIcon}>
            <Icon name="trash" size={35} color="white" />
            <Text style={{ color: "white", fontSize: 22, marginLeft: 10 }}>
              Detete
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleHideModal()}
          style={styles.modalBtnClose}
        >
          <View style={styles.btnIcon}>
            <Icon name="times-circle" size={35} color="white" />
            <Text style={{ color: "white", fontSize: 22, marginLeft: 10 }}>
              Close
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default PlaceDetails;
