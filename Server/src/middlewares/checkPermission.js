export const checkPerimission = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Bạn không có quyền truy cập, vui lòng thử lại",
      });
    }
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Bạn không có quyền truy cập, vui lòng thử lại",
    });
  }
};
