import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/Theme/colors";

const { width } = Dimensions.get("window");
const imageSize = width - 60;

export const styles = StyleSheet.create({
  modalContent: {
    width: width - 34,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignSelf: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  closeButtonAbsolute: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 2,
    zIndex: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 16,
    backgroundColor: "#f9f9f9",
    alignSelf: "center",
  },

  noImage: {
    width: imageSize,
    height: imageSize,
    borderRadius: 16,
    backgroundColor: "#eee",
    alignSelf: "center",
    marginBottom: 10,
  },

  name: {
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
    marginTop: 8,
  },

  code: {
    fontSize: 13,
    color: colors.primary,
    textAlign: "center",
    marginTop: 2,
  },

  imageCount: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#e4e4e4",
    width: "85%",
    marginVertical: 12,
  },

  description: {
    fontSize: 15,
    color: "#444",
    textAlign: "center",
    paddingHorizontal: 12,
    lineHeight: 22,
  },

  buttonsInline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 20,
    width: "100%",
  },

  uploadBtn: {
    flex: 1,
    backgroundColor: colors.headerBg,
    paddingVertical: 10,
    borderRadius: 30,
    marginRight: 10,
    elevation: 2,
  },

  editBtn: {
    flex: 1,
    backgroundColor: colors.headerBg,
    paddingVertical: 10,
    borderRadius: 30,
    marginLeft: 10,
    elevation: 2,
  },

  uploadBtnText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },

  editBtnText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },

  loadingIndicator: {
    paddingVertical: 60,
  },

  errorText: {
    marginTop: 40,
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },

  fullImageWrapper: {
    width: "100%",
  },
  fullImage: {
    width: "100%",
  },
});
