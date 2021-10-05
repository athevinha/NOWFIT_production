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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HeightIcon from "@material-ui/icons/Height";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import AssessmentIcon from '@material-ui/icons/Assessment';
import OpacityIcon from '@material-ui/icons/Opacity';
// import ArticleIcon from '@material-ui/icons/Article';
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
function Filter(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // const [age, setAge] = React.useState(15);
  const handleClick = () => {
    setOpen(!open);
  };
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    props.prop__value(event.target.value, props.prop__title.toLowerCase())
  };

  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <ListItem button onClick={handleClick}>
        <ListItemIcon>{props.prop__icon}</ListItemIcon>
        <ListItemText primary={props.prop__title}/>
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
              {props.prop__content.map((check, id) => {
                return (
                  <ListItem button className={classes.nested} key={id}>
                    <FormControlLabel
                      value={check.value }
                      control={<Radio />}
                      label={props.prop__color== true ? (<div>{check.label}<OpacityIcon style={{color:check.value}}/></div>):check.value  }
                    />
                  </ListItem>
                );
              })}
            </RadioGroup>
          </FormControl>
        </List>
      </Collapse>
    </List>
  );
}
export default function FilterComponent(props) {
  const classes = useStyles();
  const [filters,setFilters] = React.useState({
    age:"",
    type:"",
    trademark:"",
    size:"",
    color:"",

  })
  const Filtering = (value,label) => {
    let Nfilters = filters;
    Nfilters[label.toLowerCase()] = value;
    setFilters(Nfilters)
    props.prop__filtering(Nfilters,label,value)
  };
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <Filter
        prop__icon={<AccountCircleIcon/>}
        prop__value={Filtering}
        prop__title="Age"
        prop__content={[
          {
            label: "10 - 15",
            value: "13",
          },
          {
            label: "15 - 20",
            value: "18",
          },
          {
            label: "20 - 25",
            value: "23",
          },
          {
            label: "25 - 30",
            value: "28",
          },
          {
            label: "30 - 35",
            value: "33",
          },
          {
            label: "35 - 40",
            value: "38",
          },
          {
            label: "40 - 45",
            value: "43",
          },
          {
            label: "45 - 50",
            value: "48",
          },
          {
            label: "50 - 55",
            value: "53",
          },
          {
            label: "55 - 60",
            value: "58",
          },
          {
            label: "60 - 65",
            value: "63",
          },
        ]}
      />
    
      <Filter
        prop__icon={<AssessmentIcon/>}
        prop__value={Filtering}
        prop__title="Trademark"
        prop__content={[
          {
            label: "Nike",
            value: "Nike",
          },
          {
            label: "Gucci",
            value: "Gucci",
          },
          {
            label: "Midas",
            value: "Midas",
          },
          {
            label: "Vercase",
            value: "Vercase",
          },
          {
            label: "Louis vuitton",
            value: "Louis vuitton",
          },
          {
            label: "Hermès",
            value: "Hermès",
          },
          {
            label: "Prada",
            value: "Prada",
          },
          {
            label: "Chanel",
            value: "Chanel",
          },
        ]}
      />
        <Filter
        prop__icon={<CallSplitIcon/>}
        prop__title="Type"
        prop__value={Filtering}
        prop__content={[
          {
            label: "Clothers",
            value: "Clothers",
          },
          {
            label: "T-Shirt",
            value: "T-Shirt",
          },
          {
            label: "Shoes",
            value: "Shoes",
          },
          {
            label: "Hoodie",
            value: "Hoodie",
          },
          {
            label: "Dress",
            value: "Dress",
          },
        ]}
      />
      <Filter
        prop__icon={<HeightIcon/>}
        prop__value={Filtering}
        prop__title="Size"
        prop__content={[
          {
            label: "XXS",
            value: "XXS",
          },
          {
            label: "XS",
            value: "XS",
          },
          {
            label: "S",
            value: "S",
          },
          {
            label: "M",
            value: "M",
          },
          {
            label: "L",
            value: "L",
          },
          {
            label: "XL",
            value: "XL",
          },
          {
            label: "XXL",
            value: "XXL",
          },
          {
            label: "XXXl",
            value: "XXXL",
          },
        ]}
      />
      <Filter
        prop__icon={<FormatColorFillIcon/>}
        prop__value={Filtering}
        prop__title="Color"
        prop__color= {true}
        prop__content={[
          {
            label: "Red",
            value: "Red",
          },
          {
            label: "Blue",
            value: "Blue",
          },
          {
            label: "Green",
            value: "Green",
          },
          {
            label: "Black",
            value: "Black",
          },
          {
            label: "Gray",
            value: "Gray",
          },
          {
            label: "Orange",
            value: "Orange",
          },
          {
            label: "Purple",
            value: "Purple",
          },
          {
            label: "White",
            value: "White",
          },
        ]}
      />
    </List>
  );
}
