import { Keypoint, SupportedModels } from "@tensorflow-models/pose-detection"
import { BodyPart as bp } from "./bodyPart"
import { getKeypointIndexByName } from "@tensorflow-models/pose-detection/dist/util"

const keypointIndexMap = getKeypointIndexByName(SupportedModels.MoveNet)

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
  const p1Array: number[] = p1
  const p2Array: number[] = p2
  const p3Array: number[] = p3

  const angleInRadians: number =
    Math.atan2(p3Array[1] - p2Array[1], p3Array[0] - p2Array[0]) -
    Math.atan2(p1Array[1] - p2Array[1], p1Array[0] - p2Array[0])

  let angleInDegrees: number = Math.abs(angleInRadians * (180.0 / Math.PI))

  if (angleInDegrees > 180.0) {
    angleInDegrees = 360 - angleInDegrees
  }

  return Math.round(angleInDegrees)
}

export function detectJoint(kps: Keypoint[], jointName: string): number[] {
  return [
    kps[keypointIndexMap[jointName]].x,
    kps[keypointIndexMap[jointName]].y,
  ]
}

export function detectJoints(kps: Keypoint[]): number[][] {
  return kps.map((k) => detectJoint(kps, k.name!))
}

export function averageCord(p1: number[], p2: number[]): number[] {
  return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2]
}
