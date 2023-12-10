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
  const scaleZ = 1 / 25000
  const vector1: number[] = [
    p1[0] - p2[0],
    p1[1] - p2[1],
    (p1[2] - p2[2]) * scaleZ,
  ]

  const vector2: number[] = [
    p3[0] - p2[0],
    p3[1] - p2[1],
    (p3[2] - p2[2]) * scaleZ,
  ]

  const dotProduct: number =
    vector1[0] * vector2[0] + vector1[1] * vector2[1] + vector1[2] * vector2[2]

  const magnitude1: number = Math.sqrt(
    vector1[0] * vector1[0] + vector1[1] * vector1[1] + vector1[2] * vector1[2]
  )
  const magnitude2: number = Math.sqrt(
    vector2[0] * vector2[0] + vector2[1] * vector2[1] + vector2[2] * vector2[2]
  )

  const angleInRadians: number = Math.acos(
    dotProduct / (magnitude1 * magnitude2)
  )

  let angleInDegrees: number = angleInRadians * (180.0 / Math.PI)

  if (angleInDegrees > 180.0) {
    angleInDegrees = 360 - angleInDegrees
  }

  return Math.round(angleInDegrees)
}

export function detectJoint(kps: Keypoint[], jointName: string): number[] {
  return [
    kps[keypointIndexMap[jointName]].x,
    kps[keypointIndexMap[jointName]].y,
    kps[keypointIndexMap[jointName]].z!,
  ]
}

export function detectJoints(kps: Keypoint[]): number[][] {
  return kps.map((k) => detectJoint(kps, k.name!))
}

export function averageCord(p1: number[], p2: number[]): number[] {
  return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2, (p1[2] + p2[2]) / 2]
}
