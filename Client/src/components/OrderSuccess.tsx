import React from "react";

const OrderSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Đơn hàng của bạn đã được đặt thành công!
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Đơn hàng của bạn đã
          được xử lý và sẽ sớm được giao đến địa chỉ của bạn.
        </p>
      
        <div className="flex justify-center">
          <a
            href="/"
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700"
          >
            Quay lại trang chủ
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
