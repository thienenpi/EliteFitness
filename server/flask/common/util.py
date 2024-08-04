import numpy as np

skeleton_parts = {
  'head': ['leftEar', 'rightEar'],
  'left_arm': ['leftShoulder', 'leftElbow'],
  'right_arm': ['rightShoulder', 'rightElbow'],
  'torso': {
      'shoulder': ['leftShoulder', 'rightShoulder'],
      'hip': ['leftHip', 'rightHip']
  },
  'left_leg': ['leftHip', 'leftKnee'],
  'right_leg': ['rightHip', 'rightKnee'],
  'knee': ['leftKnee', 'rightKnee']
}

# def function get position of keypoint by name, round to integer
def get_keypoint_position(keypoints, name):
  for idx in keypoints:
    if keypoints[idx].part == name:
      return int(keypoints[idx].position.x), int(keypoints[idx].position.y)
  return None, None

# def function get position of keypoint by names
def get_keypoints_position(keypoints, names):
  positions = []
  
  for name in names:
    x, y = get_keypoint_position(keypoints, name)
    positions.append((x, y))
  return positions

# def function get center position of keypoint by names
def get_center_position(keypoints, names):
  positions = get_keypoints_position(keypoints, names)
  x = sum([position[0] for position in positions]) / len(positions)
  y = sum([position[1] for position in positions]) / len(positions)
  return x, y

# def function to find a, b that y = ax + b
def find_line_equation(x1, y1, x2, y2):
  a = (y2 - y1) / (x2 - x1)
  b = y1 - a * x1
  return a, b

# def function to check if a point is in a line
def is_point_in_line(x, y, a, b):
  return y == a * x + b

# hàm lấy đường trung trực của 1 đoạn thẳng
def get_perpendicular_bisector(x1, y1, x2, y2):
  a, b = find_line_equation(x1, y1, x2, y2)
  x = (x1 + x2) / 2
  y = (y1 + y2) / 2
  a_perpendicular = -1 / a
  b_perpendicular = y - a_perpendicular * x
  return a_perpendicular, b_perpendicular

# hàm tính khoảng cách từ điểm đến đường thẳng
def distance_to_line(x, y, a, b):
  return abs(a * x - y + b) / (a ** 2 + 1) ** 0.5

# hàm lấy ra dữ liệu màu RGB của 1 bức ảnh, trả về shape (width, height, 3)
def get_image_data(image):
  return np.array(image)

# hàm kiểm tra xem pixel tại vị trí đó có phải màu đen không, đầu là image_data có shape (width, height, 3)
def is_black_pixel(image_data, x, y):
  return np.all(image_data[y, x] == 0)

# hàm tính khoảng cách giữa 2 điểm
def distance(x1, y1, x2, y2):
  return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5

# hàm tính chiều rộng chân trái
def get_left_leg_width(image_data, keypoints):
  x, y = get_center_position(keypoints, skeleton_parts['left_leg'])
  x_tmp = int(x)
  y_tmp = int(y)

  while not is_black_pixel(image_data, x_tmp, y_tmp):
    x_tmp = x_tmp + 1
  
  x_last = x_tmp
  x_tmp = int(x)

  while not is_black_pixel(image_data, x_tmp, y_tmp):
    x_tmp = x_tmp - 1

  x_first = x_tmp
  return x_last - x_first

# hàm tính chiều rộng chân phải
def get_right_leg_width(image_data, keypoints):
  x, y = get_center_position(keypoints, skeleton_parts['right_leg'])
  x_tmp = int(x)
  y_tmp = int(y)

  while not is_black_pixel(image_data, x_tmp, y_tmp):
    x_tmp = x_tmp + 1
  
  x_last = x_tmp
  x_tmp = int(x)

  while not is_black_pixel(image_data, x_tmp, y_tmp):
    x_tmp = x_tmp - 1

  x_first = x_tmp
  return x_last - x_first

# hàm tính chiều rộng trung bình 2 chân
def get_average_leg_width(image_data, keypoints):
  left_leg_witdh = get_left_leg_width(image_data, keypoints)
  right_leg_width = get_right_leg_width(image_data, keypoints)
  return (left_leg_witdh + right_leg_width) / 2

# hàm tính chiều rộng đầu
def get_head_width(image_data, keypoints):
  x, y = get_center_position(keypoints, skeleton_parts['head'])
  x_tmp = int(x)
  y_tmp = int(y)

  while not is_black_pixel(image_data, x_tmp, y_tmp):
    x_tmp = x_tmp + 1

  x_last = x_tmp
  x_tmp = int(x)

  while not is_black_pixel(image_data, x_tmp, y_tmp):
    x_tmp = x_tmp - 1

  x_first = x_tmp
  return x_last - x_first

# hàm tính chiều rộng thắt lưng
def get_waist_width(image_data, keypoints):
  _, y_h = get_center_position(keypoints, skeleton_parts['torso']['hip'])
  _, y_n = get_keypoint_position(keypoints, 'nose')
  x_cs, y_cs = get_center_position(keypoints, skeleton_parts['torso']['shoulder'])

  y_w = int(2 * y_h / 3 + 1 * (y_n + y_cs) / 6)
  x_cw = int(x_cs)

  while not is_black_pixel(image_data, x_cw, y_w):
    x_cw = x_cw + 1

  x_last = x_cw
  x_cw = int(x_cs)

  while not is_black_pixel(image_data, x_cw, y_w):
    x_cw = x_cw - 1

  x_first = x_cw
  return x_last - x_first

# hàm tính chiều rộng hông
def get_hip_width(image_data, keypoints):
  x, y = get_center_position(keypoints, skeleton_parts['torso']['hip'])
  x_tmp = int(x)
  y_tmp = int(y)

  while not is_black_pixel(image_data, x_tmp, y_tmp):
    x_tmp = x_tmp + 1

  x_last = x_tmp
  x_tmp = int(x)

  while not is_black_pixel(image_data, x_tmp, y_tmp):
    x_tmp = x_tmp - 1

  x_first = x_tmp
  return x_last - x_first

# hàm đếm số pixel
def count_pixel(image_data, x1, y1, x2, y2):
  count = 0

  # kiểm tra toạ độ là số nguyên
  x1 = int(x1)
  y1 = int(y1)
  x2 = int(x2)
  y2 = int(y2)

  for x in range(x1, x2):
    for y in range(y1, y2):
      if not is_black_pixel(image_data, x, y):
        count += 1
  return count

# hàm tính diện tích hình thang khi biết 4 đỉnh
def trapezoid_area(a, b, h):
  return (a + b) * h / 2

# hàm tính diện tích torso
def get_torso_area(image_data, keypoints, waist_width, hip_width):
  _, y_h = get_center_position(keypoints, skeleton_parts['torso']['hip'])
  _, y_n = get_keypoint_position(keypoints, 'nose')
  _, y_cs = get_center_position(keypoints, skeleton_parts['torso']['shoulder'])

  y_w = int(2 * y_h / 3 + 1 * (y_n + y_cs) / 6)

  num_pixel = count_pixel(image_data, 0, y_w, image_data.shape[1], y_h)
  h = y_h - y_w

  return num_pixel / trapezoid_area(waist_width, hip_width, h)

# hàm lấy tỉ lệ waist width to thigh width
def get_waist_to_thigh_ratio(waist_width, thigh_width):
  return waist_width / thigh_width

# hàm lấy tỉ lệ waist width to hip width
def get_waist_to_hip_ratio(waist_width, hip_width):
  return waist_width / hip_width

# hàm lấy tỉ lệ waist width to head width
def get_waist_to_head_ratio(waist_width, head_width):
  return waist_width / head_width

# hàm lấy tỉ lệ hip width to head width
def get_hip_to_head_ratio(hip_width, head_width):
  return hip_width / head_width

# hàm tính chiều rộng tổng hợp
def get_overall_width(image_data, keypoints):
  head_width = get_head_width(image_data, keypoints)
  waist_width = get_waist_width(image_data, keypoints)
  hip_width = get_hip_width(image_data, keypoints)
  thigh_width = get_average_leg_width(image_data, keypoints)

  return head_width, waist_width, hip_width, thigh_width

# hàm tính tỉ lệ tổng hợp
def get_overall_ratio(image_data, keypoints):
  head_width, waist_width, hip_width, thigh_width = get_overall_width(image_data, keypoints)

  if head_width == 0 or waist_width == 0 or hip_width == 0 or thigh_width == 0:
    return 0, 0, 0, 0, 0
  
  WTR = get_waist_to_thigh_ratio(waist_width, thigh_width)
  WHpR = get_waist_to_hip_ratio(waist_width, hip_width)
  WHdR = get_waist_to_head_ratio(waist_width, head_width)
  HpHdR = get_hip_to_head_ratio(hip_width, head_width)
  Area = get_torso_area(image_data, keypoints, waist_width, hip_width)

  return WTR, WHpR, WHdR, HpHdR, Area