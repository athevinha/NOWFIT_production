import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Age() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // const [age, setAge] = React.useState(15);
  const handleClick = () => {
    setOpen(!open);
  };
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Your age
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Tuổi" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={value}
              onChange={handleChange}
            >
              <ListItem button className={classes.nested}>
                <FormControlLabel value="" control={<Radio />} label="All" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <FormControlLabel
                  value="13"
                  control={<Radio />}
                  label="10 - 15"
                />
              </ListItem>
              <ListItem button className={classes.nested}>
                <FormControlLabel
                  value="18"
                  control={<Radio />}
                  label="15 - 20"
                />
              </ListItem>
              <ListItem button className={classes.nested}>
                <FormControlLabel
                  value="23"
                  control={<Radio />}
                  label="20 - 25"
                />
              </ListItem>
              <ListItem button className={classes.nested}>
                <FormControlLabel
                  value="33"
                  control={<Radio />}
                  label="30 - 35"
                />
              </ListItem>
              <ListItem button className={classes.nested}>
                <FormControlLabel
                  value="38"
                  control={<Radio />}
                  label="35 - 40"
                />
              </ListItem>
              <ListItem button className={classes.nested}>
                <FormControlLabel
                  value="43"
                  control={<Radio />}
                  label="40 - 45"
                />
              </ListItem>
              <ListItem button className={classes.nested}>
                <FormControlLabel
                  value="48"
                  control={<Radio />}
                  label="45 - 50"
                />
              </ListItem>
            </RadioGroup>
          </FormControl>
        </List>
      </Collapse>
    </List>
  );
}
