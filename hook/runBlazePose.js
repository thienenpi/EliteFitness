const cv = require("opencv4nodejs")
const posedetection = require("@mediapipe/pose")

// Khởi tạo mô hình BlazePose
const pose = new posedetection.Pose({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
  },
})

// Hàm chạy BlazePose trên video từ camera
async function runBlazePoseOnCamera() {
  // Mở camera
  const camera = new cv.VideoCapture(0)

  // Loop để đọc và xử lý từng frame từ camera
  while (true) {
    // Đọc frame từ camera
    const frame = camera.read()

    // Chuyển đổi frame sang định dạng Uint8Array để đưa vào Mediapipe
    const frameUint8Array = new Uint8Array(frame.getData())

    // Thực hiện nhận diện và nhận được các dự đoán
    const result = await pose.estimateSinglePose(frameUint8Array, {
      flipHorizontal: false,
    })

    // Hiển thị toạ độ của các bộ phận trên cơ thể trong Console
    result.keypoints.forEach((keypoint) => {
      console.log(
        `${keypoint.part}: (${keypoint.position.x}, ${keypoint.position.y})`
      )
    })

    // Hiển thị video trong cửa sổ mới (cần cài đặt OpenCV để xem video)
    cv.imshow("Camera", frame)

    // Đợi một lát để thấy video hiển thị trước khi chuyển sang frame tiếp theo
    cv.waitKey(10)
  }
}

// Thực thi hàm với video từ camera
runBlazePoseOnCamera()
