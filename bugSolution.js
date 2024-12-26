// bug.js
import * as Linking from 'expo-linking';
import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const handleDeepLink = (event) => {
      console.log('Deep link received:', event.url);
    };

    Linking.addEventListener('url', handleDeepLink);

    return () => Linking.removeEventListener('url', handleDeepLink);
  }, []);
  return (
    <></>
  );
};
export default App; 

// bugSolution.js
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [deepLink, setDeepLink] = useState(null);
  useEffect(() => {
    const handleDeepLink = (event) => {
      setDeepLink(event.url);
    };
    Linking.addEventListener('url', handleDeepLink);
    const init = async () => {
        let initialUrl = await Linking.getInitialURL();
        if (initialUrl != null) setDeepLink(initialUrl)
    };
    init()
    return () => {
        Linking.removeEventListener('url', handleDeepLink);
      };
  }, []);
  useEffect(() => {
      if(deepLink) console.log('Deep link received:', deepLink);
  }, [deepLink])
  return (
    <></>
  );
};
export default App; 