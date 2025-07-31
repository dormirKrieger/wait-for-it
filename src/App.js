import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Material-UI Imports
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { keyframes } from '@emotion/react'; 



// Pulsating effect for the Love Counter
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;



// Love Counter Page
const LoveCounterPage = () => {
  const specialDate = new Date(2024, 8, 21, 10, 0, 0); 

  const calculateTimeElapsed = useCallback(() => {
    const now = new Date();
    let years = now.getFullYear() - specialDate.getFullYear();
    let months = now.getMonth() - specialDate.getMonth();
    let days = now.getDate() - specialDate.getDate();
    let hours = now.getHours() - specialDate.getHours();
    let minutes = now.getMinutes() - specialDate.getMinutes();
    let seconds = now.getSeconds() - specialDate.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes -= 1;
    }
    if (minutes < 0) {
      minutes += 60;
      hours -= 1;
    }
    if (hours < 0) {
      hours += 24;
      days -= 1;
    }
    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months -= 1;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    return {
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
    };
  }, [specialDate]);

  const [timeElapsed, setTimeElapsed] = useState(calculateTimeElapsed());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(calculateTimeElapsed());
    }, 1000); 

    return () => clearInterval(timer); 
  }, [calculateTimeElapsed]);

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2, textAlign: 'center', bgcolor: '#ffe0f0', animation: `${pulse} 2.5s infinite ease-in-out` }}>
      <Typography variant="h4" component="h2" gutterBottom color="secondary">
        💖 Our Journey Together so Far💖
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
        <img
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGJyc2gyMTNrbGhkbzFjcHM3NjJmbDlhdDdha3ZtYzh2enVqcGhoaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/kBvsdQcBKb5GpoNry7/giphy.gif" // Cute couple GIF
          alt="Cute couple celebrating"
          style={{ borderRadius: '8px', maxWidth: '80%', height: '300px' }}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/ffc0cb/000000?text=GIF+Error"; }}
        />
      </Box>
      <Typography variant="h2" component="div" sx={{ fontWeight: 'bold', color: 'primary.main', mt: 3, mb: 3 }}>
        {timeElapsed.months}
        <Typography variant="h4" component="span" sx={{ color: 'text.secondary' }}>months</Typography>
        {' '}
        {timeElapsed.days}
        <Typography variant="h4" component="span" sx={{ color: 'text.secondary' }}>days</Typography>
        {' '}
        {String(timeElapsed.hours).padStart(2, '0')}
        <Typography variant="h5" component="span" sx={{ color: 'text.secondary' }}>hours</Typography>
        {' '}
        {String(timeElapsed.minutes).padStart(2, '0')}
        <Typography variant="h5" component="span" sx={{ color: 'text.secondary' }}>minutes</Typography>
        {' '}
        {String(timeElapsed.seconds).padStart(2, '0')}
        <Typography variant="h5" component="span" sx={{ color: 'text.secondary' }}>seconds</Typography>
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Since {specialDate.getDate()}/{specialDate.getMonth()+1}/{specialDate.getFullYear()} 
      </Typography>
    </Paper>
  );
};

// --- Special Question Page ---
const SpecialQuestionPage = () => {
  const [question, setQuestion] = useState("I love you but do you love me?");
  
  const [noButtonPosition, setNoButtonPosition] = useState({ top: '50%', left: 'calc(50% + 100px)' });
  const [noClicks, setNoClicks] = useState(0);
  const [result, setResult] = useState(null); 

  const buttonContainerRef = React.useRef(null); 

  const handleYesClick = () => {
    setResult('yes');

  };

  const handleNoHover = () => { 
    if (result === 'yes' || !buttonContainerRef.current) return;

    setNoClicks(prev => prev + 1); 

    const containerRect = buttonContainerRef.current.getBoundingClientRect();
    const buttonWidth = 120; 
    const buttonHeight = 60; 

    
    const maxLeft = containerRect.width - buttonWidth;
    const maxTop = containerRect.height - buttonHeight;

    
    const newX = Math.random() * maxLeft;
    const newY = Math.random() * maxTop;

    
    setNoButtonPosition({
      left: `${(newX / containerRect.width) * 100}%`,
      top: `${(newY / containerRect.height) * 100}%`
    });

    const message = [    "Are you sure?",
    "Really sure?? 🤨",
    "Are you positive? 😤",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...🙁",
    "I will be very sad...☹️",
    "I will be very very very sad...😞",
    "Ok fine, I will stop asking...😔",
    "Just kidding, say yes please!🤗"]
    
    if (noClicks>=0) {
      setQuestion(message[noClicks % message.length]); 
    }
  };

  if (result === 'yes') {
    return (
      <Paper elevation={3} sx={{ textAlign: 'center', bgcolor: '#e8f5e9' }}>
        <Typography variant="h4" component="h2" gutterBottom color="primary">
          YOU SAID YES!  You love meeeeeeeeee 🥺
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2, width: '100%' }}>
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExamVzeXgxdGxueGFoc3B0aTZ0OWN3dTZwY3pwbWExMDNydm54ZWNmZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/hY8zxeuFn4tjRw0SXf/giphy.gif"
            alt="Happy celebration"
            style={{ borderRadius: '8px', maxWidth: '80%', height: '80%' }}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/d4edda/000000?text=GIF+Error"; }}
          />
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{maxHeight:'1000px', p: 4, mb: 4, borderRadius: 2, textAlign: 'center', bgcolor: '#fff3e0' }}>
      <Typography variant="h4" component="h2" gutterBottom color="primary">
        {question}
      </Typography>
      <Box
        ref={buttonContainerRef} 
        sx={{
          position: 'relative', 
          width: '100%', 
          maxWidth: 1000, 
          height: 180, 
          margin: 'auto', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 4,
          mb: 4,
          mx:0, 
          overflow: 'hidden', 
          
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={handleYesClick}
          sx={{
            minWidth: 100,
            borderRadius: 3,
            fontWeight: 'bold',
            fontSize: '1.2rem',
            position: 'absolute',
            top: '38%', 
            left: 'calc(50% - 100px)',
            zIndex:'10' 
          }}
        >
          YES!
        </Button>
        {}
          <Button
            variant="outlined"
            color="error"
            onMouseEnter={handleNoHover} 
            onClick={handleNoHover} 
            sx={{
              minWidth: 100,
              borderRadius: 3,
              fontWeight: 'bold',
              fontSize: '1.2rem',
              position: 'absolute',
              top: noButtonPosition.top, 
              left: noButtonPosition.left, 
              transform: 'translate(-50%, -50%)', 
              transition: 'top 0.2s linear, left 0.2s linear',
              zIndex:'5' 
            }}
          >
            NO
          </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
        <img
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHNpbnBmcjB6NzZ2ZWd5dmJoaHZkNG83dGRnOXIxYm92eHhhc3hjYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/pz9FgNQ3hUmaHdeyWP/giphy.gif" // Cute begging GIF
          alt="Cute sad expression"
          style={{ borderRadius: '8px', maxWidth: '100%', height: 'auto', maxHeight: '150px' }}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/ffebd8/000000?text=GIF+Error"; }}
        />
      </Box>
    </Paper>
  );
};

// --- Gift Page ---
const gifArray = [
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTZybjBqbXcwdXg3aXAyNGJwMjN5YWtuYmo1ZGFqM3ZqOXp2NDFhcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/hkSg1UB7qtviqxk1Aw/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTg1emQ1OGYwa2I4NHR0MGZ3dzI2cmkza3FqYTgwZ2Myc3Y4cnVkaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/1Ag2PehjBUCbq7VWTC/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmRuZmp0OW1uM2lvNjUwZjZ4Z2ZscWFnNXI5MW42MHdxdTcwaG90YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/DvdGVqHWhWwAa9ZLXB/giphy.gif",
];

const GiftPage = () => {

  
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const num = randomInt(0, gifArray.length);

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2, textAlign: 'center', bgcolor: '#e0f7fa' }}>
      <Typography variant="h4" component="h2" gutterBottom color="primary">
        A Gift For You! 🎁
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
        <img
          src={gifArray[num]}
          alt="Gift GIF"
          style={{ borderRadius: '8px', maxWidth: '100%', height: 'auto', maxHeight: '300px' }}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/eee/000?text=GIF+Error"; }}
        />
      </Box>
    </Paper>
  );
};

// --- Main App Component ---
function App() {
  return (
    <Router>
      <Box sx={{
          flexGrow: 1,
          background: 'linear-gradient(to bottom right, #ffe0f0, #e0f7fa, #fffde7)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <AppBar position="static" sx={{ mb: 4, width: '100%', bgcolor: '#ff69b4' }}>
          <Toolbar sx={{ justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Button color="inherit" component={Link} to="/">Love Counter</Button>
            <Button color="inherit" component={Link} to="/special-question">Special Question</Button>
            <Button color="inherit" component={Link} to="/gift">Gift</Button>
          </Toolbar>
        </AppBar>

        <Container  sx={{ flexGrow: 1, pt: 2, pb: 4, maxWidth: '1000px' }}>
          <Routes>
            <Route path="/" element={<LoveCounterPage />} />
            <Route path="/special-question" element={<SpecialQuestionPage />} />
            <Route path="/gift" element={<GiftPage />} />
            {/* Optional: Add a 404 page */}
            <Route path="*" element={
              <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2, backgroundColor: '#ffebee', color: '#c62828', textAlign: 'center' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Oh no! Page Not Found! 💔
                </Typography>
                <Typography variant="body1" paragraph>
                  It looks like you've wandered off the path of love. Let's get you back!
                </Typography>
                <Button variant="contained" color="secondary" component={Link} to="/">
                  Take Me Home
                </Button>
              </Paper>
            } />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
