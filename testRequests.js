import axios from 'axios';


const userId = 1;
const requestCount = 10000;
const apiUrl = 'http://localhost:3000/api/users/down';


const sendRequest = async (userId) => {
  try {
    const response = await axios.post(apiUrl, { userId });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response ? error.response.data : error.message };
  }
};

const runTest = async () => {
  const requests = [];
  const results = { success: 0, failure: 0 };

  
  for (let i = 0; i < requestCount; i++) {
    requests.push(sendRequest(userId));
  }

  const responses = await Promise.all(requests);

 
  responses.forEach((response, index) => {
    if (response.success) {
      results.success++;
      console.log(`Request ${index + 1}: Success - New Balance: ${response.data.balance}`);
    } else {
      results.failure++;
      console.log(`Request ${index + 1}: Failure - Reason: ${response.error}`);
    }
  });

  
  console.log(`\nTest completed.`);
  console.log(`Successful requests: ${results.success}`);
  console.log(`Failed requests: ${results.failure}`);

  
  try {
    const finalBalanceResponse = await axios.get(`http://localhost:3000/api/users/${userId}`);
    console.log(`Final balance: ${finalBalanceResponse.data.balance}`);
  } catch (error) {
    console.error('Error fetching final balance:', error.message);
  }
};

runTest();