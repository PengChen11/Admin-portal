import React, {useState} from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import {Redirect} from 'react-router-dom';

// components
import PageTitle from '../../components/PageTitle';
import Widget from '../../components/Widget';

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import axiosFetch from '../../util/axiosFetch.js';

// styles
import useStyles from './styles';


export default function ArticlePost() {

  const classes = useStyles();

  const initForm = {
    title:'',
    cover_url:'',
    site_url:'',
    github_url:'',
    summary:'',
  };

  const [mdData, setMdData] = useState('');

  const [formData, setFormdata] = useState(initForm);

  const [redirect, setRedirect] = useState(false);

  const submitForm = async () => {
    if (sessionStorage.getItem('user_token')==='demo') {
      alert('Thank you for trying out this function. Now redirecting');
      setRedirect(true);
      return;
    }

    const data = {
      ...formData,
      description: mdData,
    };

    const reqConfig = {
      api: 'blog',
      url: '/projects',
      method: 'post',
      authType:'bearer',
      token: sessionStorage.getItem('user_token'),
      data,
    };

    const { response, errorObj } = await axiosFetch(reqConfig);


    if (response) {
      alert ('Project successfully saved!');
      setFormdata(initForm);
      setMdData('');
      setRedirect(true);
    }

  };


  function handleChange (e){
    e.persist();
    setFormdata({...formData,[e.target.name]: e.target.value});
  }


  if (redirect) {
    return (
      <Redirect to="/app/project/projects" />
    );
  } else {
    return (
      <>
        <PageTitle title="Post a New Project" />
        
        <Grid container spacing={4} className={classes.container}>
  
          <Grid item xs={12}>
            <Widget title="Project Details" upperTitle disableWidgetMenu >
              
              <form>
                <TextField
                  value={formData.title}
                  name="title"
                  label="Title"
                  color="secondary"
                  variant="outlined"
                  margin="normal"
                  placeholder="Project title goes here"
                  type="text"
                  className = {classes.textField}
                  onChange={handleChange}
                />
                <TextField
                  value={formData.cover_url}
                  name="cover_url"
                  label="Cover Image URL"
                  variant="outlined"
                  color="secondary"
                  margin="normal"
                  placeholder="Image URL goes here"
                  type="text"
                  className = {classes.textField}
                  onChange={handleChange}
                />
                <TextField
                  value={formData.site_url}
                  name="site_url"
                  label="Deployed Site URL"
                  variant="outlined"
                  color="secondary"
                  margin="normal"
                  placeholder="Deployed site URL goes here"
                  type="text"
                  className = {classes.textField}
                  onChange={handleChange}
                />
                <TextField
                  value={formData.github_url}
                  name="github_url"
                  label="GitHub Repo URL"
                  variant="outlined"
                  color="secondary"
                  margin="normal"
                  placeholder="GitHub Repo URL goes here"
                  type="text"
                  className = {classes.textField}
                  onChange={handleChange}
                />
                <TextField
                  value={formData.summary}
                  name="summary"
                  label="Project Summary"
                  variant="outlined"
                  color="secondary"
                  margin="normal"
                  placeholder="Project summary goes here"
                  type="text"
                  className = {classes.summaryField}
                  multiline = {true}
                  onChange={handleChange}
                />

                <h3 >Description: (in Markdown format)</h3>
                <SimpleMDE
                  value={mdData}
                  onChange={setMdData}
                  options={{
                    hideIcons: ['side-by-side', 'fullscreen' ],
                  }}
                  className= {classes.markdownField}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.formButtons}
                  onClick={submitForm} 
                >
                  Submit
                </Button>
              </form>
            </Widget>
          </Grid>
        </Grid>
  
      </>
    );
  }
}
