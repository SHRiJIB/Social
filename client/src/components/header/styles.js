import { deepPurple } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "15px",
  },
  appBar: {
    backgroundColor: "whitesmoke",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "black",
    "&:link": {
      textDecoration: "none",
    },
  },

  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },
}));
