
// Hàm gọi API
const callApi = async () => {
    try {
      const response = await fetch('https://points-pro.azurewebsites.net/Pool/GetDefaultPools');
      const data = await response.json();
      console.log('API Response:', data);
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

// Gọi API mỗi 5 giây
setInterval(callApi, 5000);

// Gọi lần đầu tiên ngay khi khởi động
callApi();
