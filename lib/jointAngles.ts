import { Keypoint } from "@tensorflow-models/pose-detection"
import { calculateJointAngle, averageCord } from "./utilities"
import { BodyPart } from "./bodyPart"

export class Angles {
  constructor() {}
  neck = 0
  left_arm = 1
  right_arm = 2
  back = 3
  abodmen = 4
  internal = 5
  left_leg = 6
  right_leg = 7
}

export class JointAngle {
    private kps: Keypoint[]

    constructor(kps: Keypoint[]) {
      this.kps = kps
    }

  leftLegAngle(
    leftHip: number[],
    leftKnee: number[],
    leftAnkle: number[]
  ): number {
    return calculateJointAngle(leftHip, leftKnee, leftAnkle)
  }

  rightLegAngle(
    rightHip: number[],
    rightKnee: number[],
    rightAnkle: number[]
  ): number {
    return calculateJointAngle(rightHip, rightKnee, rightAnkle)
  }

  neckAngle(nose: number[], shoulder: number[], hip: number[]): number {
    return Math.abs(180 - calculateJointAngle(nose, shoulder, hip))
  }

  leftArmAngle(
    leftShoulder: number[],
    leftElbow: number[],
    leftWrist: number[]
  ): number {
    return calculateJointAngle(leftShoulder, leftElbow, leftWrist)
  }

  rightArmAngle(
    rightShoulder: number[],
    rightElbow: number[],
    rightWrist: number[]
  ): number {
    return calculateJointAngle(rightShoulder, rightElbow, rightWrist)
  }

  abdomenAngle(shoulder: number[], hip: number[], knee: number[]): number {
    return calculateJointAngle(shoulder, hip, knee)
  }

  backAngle(shoulder: number[], hip: number[]): number {
    const ref = [hip[0], shoulder[1]]
    return calculateJointAngle(shoulder, hip, ref)
  }

  internalAngle(
    hip: number[],
    leftAnkle: number[],
    rightAnkle: number[]
  ): number {
    return calculateJointAngle(leftAnkle, hip, rightAnkle)
  }

  bodyAngles(bp: BodyPart): number[] {
    const angles: number[] = Array(8).fill(0)
    const angleTypes: Angles = new Angles()

    angles[angleTypes.neck] = this.neckAngle(
      bp.cords[bp.nose],
      averageCord(bp.cords[bp.left_shoulder], bp.cords[bp.right_shoulder]),
      averageCord(bp.cords[bp.left_hip], bp.cords[bp.right_hip])
    )
    angles[angleTypes.left_arm] = this.leftArmAngle(
      bp.cords[bp.left_shoulder],
      bp.cords[bp.left_elbow],
      bp.cords[bp.left_wrist]
    )
    angles[angleTypes.right_arm] = this.rightArmAngle(
      bp.cords[bp.right_shoulder],
      bp.cords[bp.right_elbow],
      bp.cords[bp.right_wrist]
    )
    angles[angleTypes.abodmen] = this.abdomenAngle(
      averageCord(bp.cords[bp.left_shoulder], bp.cords[bp.right_shoulder]),
      averageCord(bp.cords[bp.left_hip], bp.cords[bp.right_hip]),
      averageCord(bp.cords[bp.left_knee], bp.cords[bp.right_knee])
    )
    angles[angleTypes.internal] = this.internalAngle(
      averageCord(bp.cords[bp.left_hip], bp.cords[bp.right_hip]),
      bp.cords[bp.left_ankle],
      bp.cords[bp.right_ankle]
    )
    angles[angleTypes.left_leg] = this.leftLegAngle(
      bp.cords[bp.left_hip],
      bp.cords[bp.left_knee],
      bp.cords[bp.left_ankle]
    )
    angles[angleTypes.right_leg] = this.rightLegAngle(
      bp.cords[bp.right_hip],
      bp.cords[bp.right_knee],
      bp.cords[bp.right_ankle]
    )

    return angles
  }
}
