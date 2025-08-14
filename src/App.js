import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Confetti from 'react-confetti-boom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { keyframes } from '@emotion/react'; 

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-10 * 200px)); } /* 10 images * (180px width + 20px padding) */
`;



// Fade-in and rise-up animation for the content box
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Zoom-in animation for Happy Birthday text
const zoomIn = keyframes`
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;





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

// ---- Girlfriends Day Page ----
const GirlfriendsDayPage = () => {
  const images = [
    'https://res.cloudinary.com/dlczdpxiv/image/upload/v1754048238/img1_jxwydu.jpg',
    'https://res.cloudinary.com/dlczdpxiv/image/upload/v1754048238/img2_ixc5ar.jpg',
    'https://res.cloudinary.com/dlczdpxiv/image/upload/v1754049350/img3_sdsxzn.jpg',
    'https://res.cloudinary.com/dlczdpxiv/image/upload/v1754048238/img4_fgrbwg.jpg',
    'https://res.cloudinary.com/dlczdpxiv/image/upload/v1754048238/img5_xzaitr.jpg',
    'https://res.cloudinary.com/dlczdpxiv/image/upload/v1754048239/img6_dej7cg.jpg',
    'https://res.cloudinary.com/dlczdpxiv/image/upload/v1754049351/img7_o5kxch.jpg',
    'https://res.cloudinary.com/dlczdpxiv/image/upload/v1754049351/img8_lphmor.jpg',
    'https://res.cloudinary.com/dlczdpxiv/image/upload/v1754048239/img9_fd8yap.jpg',
    'https://res.cloudinary.com/dlczdpxiv/image/upload/v1754049350/img10_fhu5qq.jpg'
  ];

  const messages = [
    "Your love for the dairies is unmatched!😂\nAnd I promise to get you all of them!😚", //1
    "Tofu + You (+ Me) = Perfect Combo!😜❤️", //2
    "Such sookun! Kitte cute hote tum!!!!🥺🥺",//3
    "Thank you for giving me this opportunity to wish you for Girlfriend's Day!!💝💝💖💖\nI loooveeeee youuu dheeerrrr saraaa!!!!❤️❤️",//4
    "Tum sed hote toh muje bhi sed hi lagta.😔\nI will always keep you smiling!🥺",//5
    "Looking at this makes me hongry!😋😋 \n Nom Nom Kar lu?😏😏😏",//6
    "Before my time but still my favoriteest photu.🥰😘",//7
    "I was sed that day but tum jagdish khilate and din banate.🥺\nYou are the bestest!🥺🥺",//8
    "Ice cream price more🤪, you are priceless.🤗",//9
    "That smile!😻😻 Damn, you are gorgeous.😽😽",//10
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (isAnimating) {
      const stopDelay = Math.random() * 4000 + 4000;
      const stopTimer = setTimeout(() => {
        setIsAnimating(false);
        const randomIndex = Math.floor(Math.random() * images.length);
        setActiveIndex(randomIndex);
        setTimeout(() => {
          setShowContent(true);
        }, 500);
      }, stopDelay);

      return () => clearTimeout(stopTimer);
    }
  }, [isAnimating, images.length]);

  const handleRestart = () => {
    setActiveIndex(null);
    setShowContent(false);
    setIsAnimating(true);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2, textAlign: 'center', bgcolor: '#fff3e0' }}>
      <Typography variant="h4" component="h2" gutterBottom color="primary">
        My dear Chintuda,
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Let's see where the reel lands on!
      </Typography>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 1000,
          // Reverting to the original height and `overflow: hidden`
          height: 250, 
          border: '4px solid #333',
          borderRadius: 2,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          mb: 4,
          mx: 'auto',
          bgcolor: '#000',
          
          // Film sprocket holes (top and bottom)
          '&:before, &:after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            height: '10px',
            background: 'repeating-radial-gradient(circle, #fff 0px, #fff 2px, transparent 2px, transparent 18px)',
            backgroundSize: '20px 10px',
            zIndex: 2,
            opacity: 0.8,
          },
          '&:before': { top: '0' },
          '&:after': { bottom: '0' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            animation: isAnimating ? `${scroll} 5s linear infinite` : 'none',
            transition: 'transform 0.5s ease-out',
            transform: isAnimating ? 'none' : `translateX(calc(-${activeIndex} * 180px + 360px))`
          }}
        >
          {images.concat(images).map((img, index) => (
            <Box
              key={index}
              component="img"
              src={img}
              alt={`Memory Photo ${index + 1}`}
              onContextMenu={e => e.preventDefault()}
              sx={{
                width: 150,
                height: 150,
                objectFit: 'cover',
                border: '8px solid #f5f5f5',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                mx: 1.5,
                opacity: activeIndex !== null && index !== activeIndex % images.length ? 0.4 : 1,
                
                transform: activeIndex !== null && index === activeIndex % images.length ? 'scale(1.5)' : 'none',
                position: 'relative',
                zIndex: activeIndex !== null && index === activeIndex % images.length ? 10 : 1,
                transition: 'all 0.5s ease-out',
              }}
            />
          ))}
        </Box>
      </Box>

      {showContent && activeIndex !== null && (
        <Box
          sx={{
            mt: 4,
            animation: `${fadeInUp} 0.5s ease-out forwards`,
            opacity: 0,
            width: '100%',
            maxWidth: 400,
            mx: 'auto'
          }}
        >
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom color="primary">
              Happy Girlfriends Day! 💖
            </Typography>
            <Typography variant="body1">
              {messages[activeIndex % messages.length]}
            </Typography>
          </Paper>
        </Box>
      )}

      {showContent && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRestart}
          sx={{ mt: 4, px: 4, py: 1.5, fontWeight: 'bold' }}
        >
          Reroll the Reel!
        </Button>
      )}
    </Paper>
  );
};

// --- Birthday Page ---
const BirthdayPage = () => {
  const BIRTHDAY_MONTH = 8; // August (0-indexed)
  const BIRTHDAY_DAY = 18; // 15th
  const Year = 2025; 
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  const currentYear = today.getFullYear();

  // Check if today is the birthday or later in the year
  const isBirthdayTodayOrAfter =
    (currentMonth > BIRTHDAY_MONTH) ||
    (currentMonth === BIRTHDAY_MONTH && currentDay >= BIRTHDAY_DAY && currentYear >= Year); // Adjust year as needed

  // State to control confetti visibility
  const [showConfetti, setShowConfetti] = useState(false);
  

  useEffect(() => {
    if (isBirthdayTodayOrAfter) {
      setShowConfetti(true); 
    } else {
      setShowConfetti(false);
    }
  }, [isBirthdayTodayOrAfter]);


  const BeforeBirthdayContent = () => {
    const messages = [
      "Wait for the day! 😉",
      "Hello? Not yet! ⏳",
      "Almost there... but not quite! 😜",
      "The suspense is building!",
      "Patience, my love! ❤️"
    ];
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentMessageIndex(prev => (prev + 1) % messages.length);
      }, 3000); // Change message every 3 seconds
      return () => clearInterval(interval);
    }, [messages.length]);

    return (
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2, textAlign: 'center', bgcolor: '#ffebee' }}>
        <Typography variant="h4" component="h2" gutterBottom color="text.secondary">
          {messages[currentMessageIndex]}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
          <img
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2VvdjRlNDJqNzJ4a3djaHloeTkyYm11MzM0ZGQ5NnNqbTZkbm9peSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1PkoXrG4iZ2hy/giphy.gif"
            alt="Waiting patiently"
            style={{ borderRadius: '8px', maxWidth: '100%', height: '', maxHeight: '300px' }}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/cccccc/000000?text=Waiting"; }}
          />
        </Box>
        <Typography variant="body1" color="text.disabled" sx={{ mt: 2 }}>
          Your special day is coming soon!
        </Typography>
      </Paper>
    );
  };

  const SpecialBirthdayContent = () => { 
              return (
                <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
                  <Box sx={{ position: 'relative', overflow: 'hidden', width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography
                      variant="h3"
                      component="h2"
                      sx={{
                        fontWeight: 'bold',
                        color: '#ff69b4', // Pink color
                        animation: `${zoomIn} 1.5s ease-out forwards`,
                        zIndex: 1,
                        position: 'absolute',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                      }}
                    >
                      Happy Birthday!
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
                    <img
                      src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3R0c3F1c283Z2V0YmZ0N3J4Y2R6a29lZ2N0a25naG91bXN3eWx3eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lqSDU8O3y4E6YJ1TzX/giphy.gif"
                      alt="Happy Birthday Celebration"
                      style={{ borderRadius: '8px', maxWidth: '100%', height: 'auto', maxHeight: '150px' }}
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/d4edda/000000?text=Birthday+GIF"; }}
                    />
                  </Box>
                  <Typography variant="h5" component="p" color="text.secondary" sx={{ mt: 2 }}>
                    Wishing you the happiest birthday ever, my love! ❤️
                  </Typography>
                </Paper>
              );
            };

            const options = {
            mode: 'boom',
            deg: 270,
            particleCount: 30,
            effectCount: 1,
            effectInterval: 3000,
            shapeSize: 12,
            spreadDeg: 100,

            colors: ['#ff577f', '#ff884b', '#ffd384', '#fff9b0'],

          };


  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {showConfetti && (
        <>
          <Confetti
            mode={'boom'}
            particleCount={1000}
            shapeSize={12}
            colors={['#8B0000', '#FF4500', '#FFD700', '#006400', '#4B0082']}
            {...(options.mode === 'boom' && {
              deg: 240,
              effectCount: options.effectCount,
              effectInterval: options.effectInterval,
              spreadDeg: 45,
              x: 1,
              y: 1,})}
          />
          <Confetti
            mode={'boom'}
            particleCount={1000}
            shapeSize={12}
            colors={['#8B0000', '#FF4500', '#FFD700', '#006400', '#4B0082']}
            {...(options.mode === 'boom' && {
              deg: 300,
              effectCount: options.effectCount,
              effectInterval: options.effectInterval,
              spreadDeg: 45,
              x: 0,
              y: 1,
              
            })}
          />
          <Confetti
            mode={'boom'}
            particleCount={2000}
            shapeSize={12}
            colors={['#8B0000', '#FF4500', '#FFD700', '#006400', '#4B0082']}
            {...(options.mode === 'boom' && {
              deg: 270,
              effectCount: options.effectCount,
              effectInterval: options.effectInterval,
              spreadDeg: options.spreadDeg,
              x: 0.5,
              y: 1,
              
            })}
          />
          <Confetti
            mode={'boom'}
            particleCount={1000}
            shapeSize={12}
            colors={['#8B0000', '#FF4500', '#FFD700', '#006400', '#4B0082']}
            {...(options.mode === 'boom' && {
              deg: 165,
              effectCount: options.effectCount,
              effectInterval: options.effectInterval,
              spreadDeg: options.spreadDeg,
              x: 1,
              y: 0,
            launchSpeed: 0.5,})}
          />
          <Confetti
            mode={'boom'}
            particleCount={1000}
            shapeSize={12}
            colors={['#8B0000', '#FF4500', '#FFD700', '#006400', '#4B0082']}
            {...(options.mode === 'boom' && {
              deg: 25,
              effectCount: options.effectCount,
              effectInterval: options.effectInterval,
              spreadDeg: options.spreadDeg,
              x: 0,
              y: 0,
            launchSpeed: 0.5,
            })}
          />
          
        </>
      )}
            
      {isBirthdayTodayOrAfter ? <SpecialBirthdayContent /> : <BeforeBirthdayContent />}
    </Box>
  );
};








// --- Main App Component ---
function App() {
  useEffect(() => {
    document.title = "Bhole Chature"; // Change tab name
  }, []);
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
            <Button color="inherit" component={Link} to="/girlfriends-day"><i>El dia de novia</i></Button>
            <Button color="inherit" component={Link} to="/birthday">Geburtstag'25</Button> 
          </Toolbar>
        </AppBar>

        <Container  sx={{ flexGrow: 1, pt: 2, pb: 4, maxWidth: '1000px' }}>
          <Routes>
            <Route path="/" element={<LoveCounterPage />} />
            <Route path="/special-question" element={<SpecialQuestionPage />} />
            <Route path="/girlfriends-day" element={<GirlfriendsDayPage />} />
            <Route path="/gift" element={<GiftPage />} />
            <Route path="/birthday" element={<BirthdayPage />} />
            
            
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
