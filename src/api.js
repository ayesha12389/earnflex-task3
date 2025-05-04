import axios from 'axios';

export const fetchEmployees = async () => {
  try {
    const activationRes = await fetch('/response.json');
    const activationData = await activationRes.json();
    const activationCode = activationData.activationCode;

    if (!activationCode) {
      throw new Error('Activation code not found in response.json');
    }

    // POST request instead of GET to avoid long URL
    const res = await axios.post(
      `/hiring_test/get_all_employee`,
      { activationCode } // Send activation code in request body
    );

    console.log('API response:', res.data);
    return Array.isArray(res.data) ? res.data : res.data.employees || [];
  } catch (error) {
    console.error('❌ API Error:', error.message);
    return [];
  }
};
