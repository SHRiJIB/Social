import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    alignItems: "center",
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
  cirpContainer: {
    display: "flex",
    width: "60vw",
    height: "80vh",
    justifyContent: "center",
    alignItems: "center",
  },
}));
