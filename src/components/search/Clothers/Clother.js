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
function Style(props) {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const [value, setValue] = React.useState("");
  const classes = useStyles();
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={props.prop__title} />
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

              {props.prop__options.map((op, id) => {
                return (
                  <ListItem button className={classes.nested}>
                    <FormControlLabel
                      value={op.value}
                      control={<Radio />}
                      label={op.value}
                    />
                  </ListItem>
                );
              })}
            </RadioGroup>
          </FormControl>
        </List>
      </Collapse>
    </div>
  );
}
export default function Age() {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
  // const [age, setAge] = React.useState(15);
  // const handleClick = () => {
  //   setOpen(!open);
  // };
  // const [value, setValue] = React.useState("");

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Your favorite shirt
        </ListSubheader>
      }
      className={classes.root}
    >
      <Style
        prop__title="Trademark"
        prop__options={[
          {
            value: "Versace",
            label: "Versace",
          },
          {
            value: "Christian Dior",
            label: "Christian Dior",
          },
          {
            value: "Hermès",
            label: "Hermès",
          },
          {
            value: "Burberry",
            label: "Burberry",
          },
          {
            value: "Midas",
            label: "Midas",
          },
        ]}
      />
      <Style
        prop__title="Size"
        prop__options={[
          {
            value: "S",
            label: "S",
          },
          {
            value: "M",
            label: "M",
          },
          {
            value: "L",
            label: "L",
          },
          {
            value: "XL",
            label: "XL",
          },
          {
            value: "XXL",
            label: "XXL",
          },
        ]}
      />
      <Style
        prop__title="Type"
        prop__options={[
          {
            value: "T-shirt",
            label: "T-shirt",
          },
          {
            value: "Hoodie",
            label: "Hoodie",
          },
          {
            value: "Sweat shirt",
            label: "Sweat shirt",
          },
          {
            value: "Tank top",
            label: "Tank top",
          },
          {
            value: "Dress Shirt",
            label: "Dress Shirt",
          },
          {
            value: "Overshirt",
            label: "Overshirt",
          },
          {
            value: "Sport",
            label: "Sport",
          },
          {
            value: "Office Shirt",
            label: "Office Shirt",
          },
        ]}
      />
    </List>
  );
}
