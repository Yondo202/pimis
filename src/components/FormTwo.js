import React from 'react';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(1, 1, 0, 0),
    },
  }));


function FromTwo(props) {
    const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === 'best') {
      setHelperText('You got it!');
      setError(false);
    } else if (value === 'worst') {
      setHelperText('Та хандах эрхгүй байна');
      setError(true);
    } else {
      setHelperText('Та бүртгэлтэй бизнес төрөлөө сонгоно уу..');
      setError(true);
    }
    console.log(value);
  };
    return (
        <Component style={{transform:`scale(${props.SoloStyle})`}}>
            <div className="formTwoParent">

            <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" error={error} className={classes.formControl}>
                <FormLabel component="legend">Та монгол улсад бүртгэлтэй аль төрлийн бизнес эрхэлдэг вэ?</FormLabel>
                <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
                  <FormControlLabel value="best" control={<Radio />} label="ХХК, ХК, ГХО-тай" />
                  <FormControlLabel value="best2" control={<Radio />} label="ТӨК" />
                  <FormControlLabel value="best3" control={<Radio />} label="Судалгаа, шинжилгээний хүрээлэн, Их, Дээд Сургууль, академик байгууллага" />
                  <FormControlLabel value="best4" control={<Radio />} label="Хоршоолол, нөхөрлөл" />
                  <FormControlLabel value="worst" control={<Radio />} label="Монгол улсад бүртгэлгүй" />
                </RadioGroup>
                    {/* <h1>{helperText}</h1> */}
                <FormHelperText>{helperText}</FormHelperText>
                <Button type="submit" variant="outlined" color="primary" className={classes.button}>Шалгах </Button>
            </FormControl>
            </form>
            </div>
        </Component>
    )
}

export default FromTwo

const Component = styled.div`
    transition: all 0.5s ease-out;
    .formTwoParent{
        background-color:white;
        border-radius:8px;
        .MuiFormLabel-root{
        padding-bottom:5px;
        font-size:1.2rem;
        border-bottom:1px solid #3f51b5;
        }
    }
        
`