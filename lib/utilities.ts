import { Keypoint, SupportedModels } from "@tensorflow-models/pose-detection"
import { BodyPart as bp } from "./bodyPart"
import { getKeypointIndexByName } from "@tensorflow-models/pose-detection/dist/util"

const keypointIndexMap = getKeypointIndexByName(SupportedModels.BlazePose)

export function calculateVelocity(
  prevAngles: number[],
  currAngles: number[],
  duration: number
): number[] {
  var gradient: number[] = []

  for (var i = 0; i < prevAngles.length; i++) {
    var deltaAngle = currAngles[i] - prevAngles[i]
    gradient.push(deltaAngle / duration)
  }

  return gradient
}

export function calculateJointAngle(
  p1: number[],
  p2: number[],
  p3: number[]
): number {
  // Chuyển đổi các tham số đầu vào thành các mảng số
  const p1Array: number[] = p1
  const p2Array: number[] = p2
  const p3Array: number[] = p3

  // Tính toán vector chênh lệch giữa p1 và p2
  const vector1: number[] = [
    p1Array[0] - p2Array[0],
    p1Array[1] - p2Array[1],
    p1Array[2] / 1000 - p2Array[2] / 1000,
  ]

  // Tính toán vector chênh lệch giữa p3 và p2
  const vector2: number[] = [
    p3Array[0] - p2Array[0],
    p3Array[1] - p2Array[1],
    p3Array[2] / 1000 - p2Array[2] / 1000,
  ]
  console.log('vector1', vector1)
  console.log('vector2', vector2)

  // Tính toán góc giữa hai vector sử dụng sản phẩm chấm
  const dotProduct: number =
    vector1[0] * vector2[0] + vector1[1] * vector2[1] + vector1[2] * vector2[2]

  // Tính toán độ dài của vector1 và vector2
  const magnitude1: number = Math.sqrt(
    vector1[0] * vector1[0] + vector1[1] * vector1[1] + vector1[2] * vector1[2]
  )
  const magnitude2: number = Math.sqrt(
    vector2[0] * vector2[0] + vector2[1] * vector2[1] + vector2[2] * vector2[2]
  )

//   console.log(dotProduct / (magnitude1 * magnitude2))
  // Tính toán góc giữa hai vector trong radian
  const angleInRadians: number = Math.acos(
    dotProduct / (magnitude1 * magnitude2)
  )
//   console.log('angleInRadians', angleInRadians)

  // Chuyển đổi góc từ radian sang độ
  let angleInDegrees: number = (angleInRadians * (180.0 / Math.PI))

  // Trả về góc tính được (được làm tròn đến số nguyên)
  return (angleInDegrees)
}

export function detectJoint(kps: Keypoint[], jointName: string): number[] {
  return [
    kps[keypointIndexMap[jointName]].x,
    kps[keypointIndexMap[jointName]].y,
    kps[keypointIndexMap[jointName]].z!
  ]
}

export function detectJoints(kps: Keypoint[]): number[][] {
  return kps.map((k) => detectJoint(kps, k.name!))
}

export function averageCord(p1: number[], p2: number[]): number[] {
  return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2, (p1[2] + p2[2]) / 2]
}
