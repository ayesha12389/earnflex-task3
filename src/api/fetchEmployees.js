// import axios from 'axios';

// export const fetchEmployees = async () => {
//   try {
//     const activation = await axios.get('https://api.findofficers.com/hiring_test/get_activation_code');
//     const activationCode = activation.data.activationCode;

//     const response = await axios.get(`https://api.findofficers.com/hiring_test/get_all_employee?activationCode=${activationCode}`);
//     return response.data.employees;
//   } catch (error) {
//     console.error('Error fetching employees:', error);
//     return [];
//   }
// };
